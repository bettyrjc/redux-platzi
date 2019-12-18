import React, { Component } from 'react'
import {connect} from 'react-redux';


import Spinner from '../general/Spinner';
import Error from '../general/Fatal';
import {Redirect} from 'react-router-dom'
// import tareasReducer from '../../reducers/tareasReducer';
import * as tareasActions from '../../actions/tareasActions';

 class Guardar extends Component {
  componentDidMount(){
    const {
      match:{
        params: {
          usu_id, tar_id
        }
      },
      tareas,
      cambioTitulo,
      cambioUsuarioId,
      limpiarForma
    } = this.props;
// para que se lleve el usuario y el titulo en el input y saber que modificaremos

    if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title);
    }
    else{
      limpiarForma();
    }
  }
  cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
  };
  guardar = (event) =>{
    // alert('guardar')
    const {
			match: { params: { usu_id, tar_id } },
			tareas,
			usuario_id,
			titulo,
			agregar,
			editar
		} = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			title: titulo,
			completed: false
		};

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			};
			editar(tarea_editada);
		}
		else {
			agregar(nueva_tarea);
		}
	};
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
      
				<h1 className="text-info">Guardar Tarea</h1>
				<h3 className="input-group-text">Usuario id:</h3>
				<input
					className="form-control"
					type='number'
					value={ this.props.usuario_id }
					onChange={ this.cambioUsuarioId }
				/>
				<br /><br />
				<h3 className="input-group-text">
				Título:
				</h3>
				<input
				className="form-control"
					value={ this.props.titulo }
					onChange={ this.cambioTitulo }
				/>
				<br /><br />
				<button className="btn btn-success text-body " onClick={this.guardar} disabled= {this.deshabilitar()} >
					Guardar
				</button>
        {this.mostrarAccion()}
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;
export default connect(mapStateToProps, tareasActions)(Guardar)