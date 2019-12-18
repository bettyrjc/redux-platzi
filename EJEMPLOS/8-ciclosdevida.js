import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      usuarios: []
    }
  }
 async componentDidMount(){

    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
    // para mostrar que tipo es nuestra respuesta y que hay dentro de ella
    // recuerda que es asincrona porque tiene algo dentro que es una promesa
    //  
    console.log('respuesta: ',respuesta)

    // inicializar nuestros usuarios que entren vacios
    this.setState({
      usuarios:[
        {
          nombre: 'BRETTY', 
          correo: 'bettyjimenez3010@gmail.com', 
          web: 'bettyjimenez.com'
        },
        {
          nombre: 'Rodolfo', 
          correo: 'bettyjimenez3010@gmail.com', 
          web: 'bettyjimenez.com'
        },
        {
          nombre: 'Rodolfo', 
          correo: 'bettyjimenez3010@gmail.com', 
          web: 'bettyjimenez.com'
        },
        {
          nombre: 'Rodolfo', 
          correo: 'bettyjimenez3010@gmail.com', 
          web: 'bettyjimenez.com'
        }
      ]
    })
  }
  ponerFilas = () => this.state.usuarios.map((usuario) => (
		<tr>
			<td>
				{ usuario.nombre }
			</td>
			<td>
				{ usuario.correo }
			</td>
			<td>
				{ usuario.web }
			</td>
		</tr>
	));

  render(){
    console.log(this.state. usuarios)
   return (
      <div className="App margen">
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

export default App;
