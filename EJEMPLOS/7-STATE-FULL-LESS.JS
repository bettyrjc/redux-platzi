import React, {Component} from 'react';


class App extends Component {

  constructor(){
    super();
    this.state = {
      usuarios: [
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
        },
        {
          nombre: 'Rodolfo', 
          correo: 'bettyjimenez3010@gmail.com', 
          web: 'bettyjimenez.com'
        }
      ]
    }
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
