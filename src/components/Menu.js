import React from 'react'
import {Link} from 'react-router-dom'
const Menu = (props) => (
    <nav id='menu'>
      <Link className="text-secondary" to='/'>Usuarios</Link>
      <Link  className="text-secondary"to='/tareas'>Tarea</Link>
    </nav>
)
 export default Menu;