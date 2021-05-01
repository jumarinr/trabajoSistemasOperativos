/* eslint-disable react/jsx-props-no-spreading */
import { DateTime } from 'luxon';

import React from 'react';
import PropTypes from 'prop-types';

// material ui icons
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Propiedades = ({ open, handleClose, infoNodoActual }) => {
  const { fechaActualizacion, fechaCreacion, tamano } = infoNodoActual;
  return (

    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="confirmation-dialog-title">Propiedades y Permisos</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Propiedades</b>
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
