import axios from 'axios';
import {TRAER_TODOS, CARGANDO, ERROR} from '../types/usuariosTypes'

//  el async va en el padre directo del await
export const traerTodos= ( ) => async (dispatch)=> {
  dispatch({
    type: CARGANDO
  })
  try{
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
    dispatch({
      type: TRAER_TODOS,
      payload:respuesta.data
    })
  }
  catch (error){
    console.log('error:',error.message)
    dispatch({
      type: ERROR,
      payload: 'error coñoo'
    })
  }
}