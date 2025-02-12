
import React from 'react'
import { connect } from 'react-redux';

const Tabla = (props) => {

  const ponerFilas = () => props.usuarios.map((usuario) => (
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
  
 return(
  <div>
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
          { ponerFilas()}
        </tbody>
    </table>
  </div>
 )
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}

export default connect(mapStateToProps)(Tabla)