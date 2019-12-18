import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as tareasActions from '../../actions/tareasActions';
import { Link } from "react-router-dom";

import Spinner from '../general/Spinner';
import Error from '../general/Fatal';

class Tareas extends Component{
  componentDidMount(){
    if(!Object.keys(this.props.tareas).length){
      this.props.traerTodas()
    }
  }
  componentDidUpdate(){
    const {tareas, cargando, traerTodas} = this.props;
    if(!Object.keys(tareas).length && !cargando){
      traerTodas()
      // console.log(this.props)
    }
  }
  mostrarContenido = () =>{
    const {tareas, cargando, error} = this.props;

    if(cargando){
      return <Spinner/>
    }
    if(error){
      return <Error mensaje={error}/>
    }
    return Object.keys(tareas).map((usu_id)=>(
      <div key={usu_id}>
        <h2>
          {usu_id}
        </h2>
        <div className="contenedor_tarea">
          {this.ponerTareas(usu_id)}
        </div>
      </div>
    ))
  };

  ponerTareas = (usu_id) => {
    const {tareas,cambioCheck, eliminar} = this.props;
    const por_usuario = {
      ...tareas[usu_id]
    }
    return Object.keys(por_usuario).map((tar_id)=>(
     <div className="card-body" key={tar_id}>
        <input type="checkbox" 
               defaultChecked={por_usuario[tar_id].completed}
               onChange={() => cambioCheck(usu_id, tar_id)}
      />
      {
        por_usuario[tar_id].title
      }
      <button className="m_left btn btn-dark">
        <Link className="text-secondary" to={ `/tareas/guardar/${usu_id}/${tar_id}` }>Editar</Link>
      </button>
      <button className="m_left btn btn-secondary"
              onClick={()=> eliminar(tar_id)}
      >Eliminar  </button>
     </div>
    ))
  }
  render(){
    // console.log(this.props)
    return(
      <div>
        <button className="btn btn-light">
          <Link to="/tareas/guardar">Agregar</Link>
        </button>
        {this.mostrarContenido()}
      </div>
    );
  }
};

const mapStateToProps = ({tareasReducer}) =>tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas);
