import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions'
import Spinner from '../general/Spinner'

class Usuarios extends Component {

  componentDidMount(){
  
  this.props.traerTodos()
  }
  
  ponerContenido = () => {
    if(this.props.cargando){
      return <Spinner/>
    }
    return(
      <table className="tabla">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>Correo</th>
              <th>Web</th>
            </tr>
          </thead>
          <tbody>
            { this.ponerFilas()}
          </tbody>
      </table>
    )
  }
  
  ponerFilas = () => this.props.usuarios.map((usuario) => (
		<tr key= {usuario.id}>
			<td>
				{ usuario.name }
			</td>
			<td>
				{ usuario.email }
			</td>
			<td>
				{ usuario.website }
			</td>
		</tr>
	));

  render(){
    console.log(this.props.cargando)
    console.log(this.props.error)
   return (
      <div className="App">
        {this.ponerContenido()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}
export default connect(mapStateToProps, usuariosActions)(Usuarios);
