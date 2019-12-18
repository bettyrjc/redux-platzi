import axios from 'axios';
import { ACTUALIZAR, CARGANDO, ERROR } from '../types/publicacionesTypes';
import  * as usuariosTypes from '../types/usuariosTypes';  

const {TRAER_TODOS : USUARIOS_TRAER_TODOS} =  usuariosTypes

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	const { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;
	const usuario_id = usuarios[key].id;

	dispatch({
		type: CARGANDO,
	}); 

	try{
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

		const nuevas= respuesta.data.map((publicacion)=>({
			...publicacion,
			comentarios: [],
			abierto:false
		}));
// añadir de forma dinamica
		const publicaciones_actualizadas = [
			...publicaciones,
			nuevas
		];
		dispatch({
			type: ACTUALIZAR,
			payload: publicaciones_actualizadas
		}); 
		// PARA BUSCAR ENTRE LAS PUBLICACIONES
		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key
		}
		
		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados
		});
	}catch (e) {
		console.log(e)
		dispatch({
			type: ERROR,
			payload: 'PUBLICACIONES, NO DISPONIBLES'
		}); 
	}

};

export const abrirCerrar = (publicaciones_key, com_key) => (dispatch, getState) =>{
	// console.log(publicaciones_key,com_key)
	const {publicaciones} = getState().publicacionesReducer;
	const selecciona = publicaciones[publicaciones_key][com_key];

	const actualizada = {
		...selecciona,
		abierto: !selecciona.abierto
	}

	// inmutabilidad

	const publicacion_act = [...publicaciones];
	publicacion_act[publicaciones_key]  = [
		...publicaciones[publicaciones_key]
	];
	publicacion_act[publicaciones_key][com_key] = actualizada;
	dispatch({
		type: ACTUALIZAR,
		payload: publicacion_act
	}); 

}

export const traerComentarios = (publicaciones_key, com_key) => async (dispatch, getState) => {
	// vamos a buscar nuetros comentarios y ver donde queda
	const {publicaciones} = getState().publicacionesReducer;
	const selecciona = publicaciones[publicaciones_key][com_key];

	const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selecciona.id}`)

	const actualizada = {
		...selecciona,
		comentarios: respuesta.data
	}
// inmutabilidad

	const publicacion_act = [...publicaciones];
	publicacion_act[publicaciones_key]  = [
		...publicaciones[publicaciones_key]
	];
	publicacion_act[publicaciones_key][com_key] = actualizada;

	dispatch({
		type: ACTUALIZAR,
		payload: publicacion_act
	}); 

}