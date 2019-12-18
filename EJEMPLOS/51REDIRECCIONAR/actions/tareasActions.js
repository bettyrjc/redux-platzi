
import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR, CAMBIO_USUARIO, CAMBIO_TITULO, AGREGADA } from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});

	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
    //  creo mi onjeto vacio de ytarea
    const tareas = {};
    //  a mi onj vacio de tarea, agg cuanto vale cada obj y de cada obj le saco el id

    respuesta.data.map((tarea_elemnto)=>(
      tareas[tarea_elemnto.userId] = {
        // y en ese objeto ponme toda las tareas que tenga es eid

        ...tareas[tarea_elemnto.userId],
        // y a cada id, le voy a oasar las tareas que tenga
        // le estoy añadiendo con esto el id de cada elemento del id numero 1.
        // ejempl el uno

        [tarea_elemnto.id]:{
          // y asi le asigno todo el elemnto
          ...tarea_elemnto
        }
      }
    ));
    
    dispatch({
			type: TRAER_TODAS,
			payload: tareas
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Algo salió mal con tareas, intente más tarde.'
		})
	}
};

// cambiar titulo y usuario

export const cambioUsuarioId = (usuario_id) => (dispatch) =>{
  dispatch({
    type: CAMBIO_USUARIO,
    payload:usuario_id
  })
}
export const cambioTitulo = (titulo) => (dispatch) =>{
  dispatch({
    type: CAMBIO_TITULO,
    payload:titulo
  })
}

export const agregar = (nueva_tarea) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});

	try {
    const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
    console.log(respuesta.data)
		dispatch({
			type: AGREGADA
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR
		});
	}
};