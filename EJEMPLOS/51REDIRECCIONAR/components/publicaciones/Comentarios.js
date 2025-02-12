import React from 'react'
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Error from '../general/Fatal';

const Comentarios = (props) => {
	if (props.comErr) {
		return <Error mensaje={ props.com_error } />
	}
	if (props.comCarg && !props.comentarios.length) {
		return <Spinner />
	}

	const ponerComentarios = () => (
		props.comentarios.map((comentario) => (
			<li key={ comentario.id }>
				<b><u>{ comentario.email }</u></b>
				<br />
				{ comentario.body }
			</li>
		))
	);

	return (
		<ul>
			{ ponerComentarios() }
		</ul>
	);
};

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);