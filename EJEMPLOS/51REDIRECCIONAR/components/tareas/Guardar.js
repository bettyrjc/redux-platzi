import React, { Component } from 'react'
import {connect} from 'react-redux';


import Spinner from '../general/Spinner';
import Error from '../general/Fatal';
import {Redirect} from 'react-router-dom'
// import tareasReducer from '../../reducers/tareasReducer';
import * as tareasActions from '../../actions/tareasActions';

 class Guardar extends Component {

  cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
  };
  guardar = (event) =>{
    // alert('guardar')
    const {usuario_id, titulo, agregar} = this.props;
    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed:false,
    };
    agregar(nueva_tarea)
  }
  deshabilitar = ()=>{
    const {titulo, usuario_id, cargando} = this.props
    if(cargando){
      return true
    }
    if(!usuario_id || !titulo){
      return true;
    }

    return false;
  };
  mostrarAccion = () =>{
    const {error, cargando} = this.props;

    if(cargando){
      return <Spinner/>
    }
    if(error){
      return <Error mensaje={error}/>
    }
  }
  render() {
		return (
			<div>
        
        {
          (this.props.regresar) ? <Redirect to='/tareas/'/> : ''
        }
      
				<h1>Guardar Tarea</h1>
				Usuario id:
				<input
					type='number'
					value={ this.props.usuario_id }
					onChange={ this.cambioUsuarioId }
				/>
				<br /><br />
				Título:
				<input
					value={ this.props.titulo }
					onChange={ this.cambioTitulo }
				/>
				<br /><br />
				<button onClick={this.guardar} disabled= {this.deshabilitar()} >
					Guardar
				</button>
        {this.mostrarAccion()}
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;
export default connect(mapStateToProps, tareasActions)(Guardar)