const Alerta = ({alerta}) => {
    var classe = ''
    if (alerta.status === 'error'){
        classe = 'alert alert-danger'
    } else {
        classe = 'alert alert-primary'
    }
    if (alerta.message.length > 0) {
        return (
            <div className={classe} role='alert'>
                {alerta.message}
            </div>
        )
    } else {
        return (
        <div>

        </div> )
    }
}

export default Alerta;