import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Editora from './componentes/editora/Editora';
import Livro from './componentes/livro/Livro';

function App() {
  return (
    <Router>
        <Menu/>
        <Switch>
            <Route exact path="/" render={Home} />
            <Route exact path="/editoras" render={ () => 
              <Editora/>
            } />
            <Route exact path="/livros" render={ () => 
              <Livro/>
            } /> 
        </Switch>
    </Router>
  );
}

export default App;
