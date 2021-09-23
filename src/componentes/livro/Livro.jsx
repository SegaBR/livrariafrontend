import Tabela from './Tabela';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Cadastrar from './Cadastrar';

function Livro() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });

    const atualizaAlerta = (pstatus, pmensagem) => {
        setAlerta({ status: pstatus, message: pmensagem })
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/livros" render={
                        () => <Tabela alerta={alerta} atualizaAlerta={atualizaAlerta} />
                    } />
                    <Route path="/cadastrarlivro" render={() =>
                        <Cadastrar editar={false} atualizaAlerta={atualizaAlerta} />
                    } />
                    <Route path="/editarlivro/:codigo" render={
                        props =>
                        <Cadastrar editar={true} atualizaAlerta={atualizaAlerta} 
                        pcodigo={props.match.params.codigo}/>
                    } />
                </Switch>
            </Router>
        </div>
    )

}

export default Livro;