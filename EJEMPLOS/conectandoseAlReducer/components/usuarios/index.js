import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Usuarios extends Component {

//  async componentDidMount(){
  //   const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
  //   // para mostrar que tipo es nuestra respuesta y que hay dentro de ella
  //   // recuerda que es asincrona porque tiene algo dentro que es una promesa
  //   // console.log('respuesta: ',respuesta.data)

  //   // inicializar nuestros usuarios que entren vacios
  //   this.setState({
  //     usuarios: respuesta.data
  //   })
  // }
  
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
    // console.log(this.props)
   return (
      <div className="App">
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
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}
export default connect(mapStateToProps,{ /*actions */})(Usuarios);
