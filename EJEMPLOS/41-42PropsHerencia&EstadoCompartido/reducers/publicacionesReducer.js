import { 
  ACTUALIZAR, 
  CARGANDO, 
  ERROR,
  C_ACTUALIZAR, 
  COMERR, 
  COMCARG 
} from '../types/publicacionesTypes';
const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
  error: '',
  comCarg:false,
  comErr:false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
    case ACTUALIZAR:
      return{ ...state, 
              publicaciones: action.payload,
              cargando:false,
              error: ''
            }
    case CARGANDO: 
      return{ ...state, 
              cargando:true
            };
    case ERROR: 
      return{ ...state, 
              error:action.payload, 
              com:false
            };
    case C_ACTUALIZAR:
      return{ ...state, 
              publicaciones: action.payload,
              comCarg:false,
              comErr: ''
            } ;         
    case COMCARG: 
      return{ ...state, 
        comCarg:true
      };
    case COMERR: 
      return{ ...state, 
        comErr:action.payload, 
        comCarg:false
      };
    

    default:  return state;
	};
};