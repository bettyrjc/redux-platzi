import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';

import Menu from './Menu'
import Usuarios from './usuarios/index'
import Publicaciones from './publicaciones/publicaciones';
import Tareas from './tareas/Tareas';
import Guardar from './tareas/Guardar';



const App = (props) => (
    <BrowserRouter>
      <Menu/>
      <div className="margen"> 
        <Route exact path='/' component= {Usuarios} />
        <Route exact path='/tareas' component= {Tareas} />
        <Route exact path='/publicaciones/:key' component= {Publicaciones} />
        <Route exact path='/tareas/guardar' component= {Guardar} />
        <Route exact path='/tareas/guardar/:usu_id/:tar_id' component= {Guardar} />
        
      </div>
      

    </BrowserRouter>
)

export default  App;