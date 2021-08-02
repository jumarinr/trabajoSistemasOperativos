import { DateTime } from 'luxon';

import React, { useContext } from 'react';
// import PropTypes from 'prop-types';

// material ui core
import DialogContentText from '@material-ui/core/DialogContentText';

import PropertiesFileOrDirectory from '../../contexts/PropertiesFileOrDirectory.jsx';

const Basic = () => {
  const {
    fechaActualizacion, fechaCreacion, isDirectory, nombre, rutaActual,
  } = useContext(PropertiesFileOrDirectory);

  return (
    <>
      <DialogContentText>
        <b>Nombre: </b>
        {nombre}
      </DialogContentText>
      <DialogContentText>
        <b>Tipo: </b>
        {isDirectory ? 'Carpeta' : 'Archivo'}
      </DialogContentText>
      <DialogContentText>
        <b>Ruta: </b>
        {rutaActual}
      </DialogContentText>
      <DialogContentText>
        <b>Última modificación: </b>
        {' '}
        {DateTime
          .fromJSDate(fechaActualizacion)
          .setLocale('co')
          .toFormat('ff')}
      </DialogContentText>

      <DialogContentText>
        <b>Fecha creación: </b>
        {' '}
        {DateTime
          .fromJSDate(fechaCreacion)
          .setLocale('co')
          .toFormat('ff')}
      </DialogContentText>

    </>
  );
};

Basic.propTypes = {

};

export default Basic;
