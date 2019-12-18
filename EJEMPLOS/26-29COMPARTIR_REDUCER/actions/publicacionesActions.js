import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes';

import axios from 'axios';

export const traerTodos = () => async (dispatch) => {
	dispatch({
    type: CARGANDO
  })
	try{
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
	dispatch({
		type: TRAER_TODOS,
		payload: respuesta.data
	})
	}  catch (error){
		dispatch({
      type: ERROR,
      payload: 'Hubo un error, intenta mas tarde. Te queremos<3'
    })
	}
};