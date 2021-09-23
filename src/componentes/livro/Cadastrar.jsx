import { Redirect } from 'react-router-dom';
import config from '../../Config';
import { useState, useEffect } from 'react';

function Cadastrar({ pcodigo, atualizaAlerta, editar }) {

    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", autor: "", data_lancamento: null, editora: ""
    })

    const [listaEditoras, setListaEditoras] = useState([]);

    const [redirecionar, setRedirecionar] = useState(false);

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/livros/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome,
                    autor: objeto.autor,
                    data_lancamento: objeto.data_lancamento,
                    editora: objeto.editora
                }
                const response = await fetch(config.enderecoapi + "/livros", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome,
                    autor: objeto.autor,
                    data_lancamento: objeto.data_lancamento,
                    editora: objeto.editora
                }
                const response = await fetch(config.enderecoapi + "/livros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        }
        setRedirecionar(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaEditoras = async () => {
        await fetch(`${config.enderecoapi}/editoras`)
            .then(response => response.json())
            .then(data => setListaEditoras(data))
            .catch(err => console.log('Erro: ' + err))
    }

    useEffect(() => {
        if (editar) {
            recuperar(pcodigo);
        } else {
            setObjeto({
                codigo: "", nome: "", autor: "", data_lancamento: new Date().toISOString().slice(0, 10), editora: ""
            });
        }
        recuperaEditoras();
    }, []);

    if (redirecionar === true) {
        return <Redirect to="/livros" />
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Editora</h2>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <div >
                    <div className="form-group">
                        <label htmlFor="txtCodido" className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            readOnly
                            className="form-control"
                            id="txtCodido"
                            name="codigo"
                            value={objeto.codigo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtNome"
                            name="nome"
                            value={objeto.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtAutor" className="form-label">
                            Autor
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtAutor"
                            name="autor"
                            value={objeto.autor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtData" className="form-label">
                            Data de lançamento
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="txtData"
                            name="data_lancamento"
                            value={objeto.data_lancamento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectEditora" className="form-label">
                            Editora
                        </label>
                        <select
                            required
                            className="form-control"
                            id="selectselectEditoraPerson"
                            value={objeto.editora}
                            name="editora"
                            onChange={handleChange}>
                            <option disable="true" value="">(Selecione a editora)</option>
                            {listaEditoras.map((editora) => (
                                <option key={editora.codigo} value={editora.codigo}>
                                    {editora.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" >
                    Salvar  <i className="bi bi-save"></i>
                </button>

            </form>
        </div>
    )

}

export default Cadastrar;
