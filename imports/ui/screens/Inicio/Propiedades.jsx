/* eslint-disable react/jsx-props-no-spreading */
import { DateTime } from 'luxon';

import _ from 'lodash';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

// material ui icons
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';

import { listadoUsuarios, cambiarPropietario } from './helperDashboard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Propiedades = ({ open, handleClose, infoNodoActual }) => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [propietario, setPropietario] = useState(null);

  const {
    fechaActualizacion, fechaCreacion, idUsuario, rutaActual, nombre,
  } = infoNodoActual;

  const cargarListadoUsuarios = () => listadoUsuarios()
    .then(setListaUsuarios)
    .catch(console.error);

  const handleChangeSelect = (newPropietario) => {
    cambiarPropietario({
      path: `${rutaActual}${nombre}`,
      uid: newPropietario.idUser,
      gid: newPropietario.idGroup,
    })
      .then(() => {
        console.log(setPropietario);

        setPropietario(newPropietario);
      })
      .catch(console.error);
  };

  useEffect(() => {
    cargarListadoUsuarios();

    return () => null;
  }, []);

  useEffect(() => {
    if (idUsuario && !_.isEmpty(listaUsuarios)) {
      const currentPropietario = _.find(listaUsuarios, { idUser: idUsuario });

      setPropietario({
        ...currentPropietario,
        label: currentPropietario.userName,
        value: idUsuario,
      });
    }
  }, [idUsuario, listaUsuarios]);

  return (

    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="confirmation-dialog-title">Propiedades y Permisos</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Propiedades</b>
            <Divider />
          </DialogContentText>

          <DialogContentText id="alert-dialog-slide-description">
            <b>Fecha creación: </b>
            {' '}
            {DateTime
              .fromJSDate(fechaCreacion)
              .setLocale('co')
              .toFormat('ff')}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Última modificación: </b>
            {' '}
            {DateTime
              .fromJSDate(fechaActualizacion)
              .setLocale('co')
              .toFormat('ff')}
          </DialogContentText>

          <DialogContentText id="alert-dialog-slide-description">
            <b>Propietario</b>
            <Divider />
          </DialogContentText>

          <DialogContentText id="alert-dialog-slide-description">
            <b>Nombre </b>

            <ReactSelect
              options={listaUsuarios}
              value={propietario}
              menuPosition="fixed"
              fullWidth
              maxMenuHeight={150}
              noOptionsMessage={() => 'No se encontraron usuarios'}
              onChange={handleChangeSelect}
            />

          </DialogContentText>

        </DialogContent>
      </Dialog>
    </>
  );
};

Propiedades.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  infoNodoActual: PropTypes.object.isRequired,
};

export default Propiedades;
