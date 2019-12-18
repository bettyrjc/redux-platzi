import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Error from '../general/Fatal';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;



class Publicaciones extends Component {
	async componentDidMount() {
		const {
			usuariosTraerTodos,
			publicacionesTraerPorUsuario,
			match:{
				params:{
								key
							}
			}
		} = this.props
		// no se cambia this.props.usuariosReducer porque este es el estado y el estado puede cambiar
		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}
		if(this.props.usuariosReducer.error){
			return;
		}
		// si ya ese usuario tiene un usaurio key
		if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
			publicacionesTraerPorUsuario(key);
		}
	}
	 ponerUsuarios = ()=>{
		 const {usuariosReducer,match:{	params:{key	}}} = this.props
		//  aqui si se saca el reducer porque habra cambios  en el render, y ahi si se puede actualizar
		 
		if (usuariosReducer.error){
			return <Error mensaje={usuariosReducer.error}/>
		}	
		// !usuariosReducer.usuarios.length esto es para que este cargando mientras esta buscando usuarios
		// y que no arroje un error fatal en el error
		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando){
			 return <Spinner/>
		 }
		 const nombre = usuariosReducer.usuarios[key].name
		 return(
			<h1>
			Publicaciones de {nombre}
		</h1>
		 )			
	 }
	 ponerPublicaciones = () =>{
		 const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } }
		 } = this.props

		 if(!usuarios.length ) return;
		 if (usuariosReducer.error) return;


		 if (publicacionesReducer.cargando) {
			 return <Spinner/>
		 }
		 if (publicacionesReducer.error) {
			return <Error mensaje={publicacionesReducer.error}/>
		}
//  en dado caso que se este cargando usuarios para ue no haga un error
		if (!publicaciones.length) return;
		if (!('publicaciones.key' in usuarios[key])) return;
// voy a sacar de ese usuario key porque ya valide de quje todo erstee bien 
		const { publicaciones_key } = usuarios[key] 

		return publicaciones[publicaciones_key].map((publicacion) =>(
			<div>
				<h2>{publicacion.title}</h2>
				<h3> {publicacion.body} </h3>
			</div>
		))

	 }
	render() {
		console.log(this.props);
		return (
			<div>		
				{this.ponerUsuarios()}
				{this.ponerPublicaciones()}
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuario
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);