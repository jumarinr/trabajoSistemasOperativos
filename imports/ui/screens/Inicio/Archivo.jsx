import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Avatar from '@material-ui/core/Avatar';

// material ui icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const Archivo = ({
  isDirectory,
  nombre,
  fechaCreacion,
  fechaActualizacion,
}) => (
  <>
    <Avatar>
      <InsertDriveFileIcon />
    </Avatar>
    {nombre}
  </>
);

Archivo.propTypes = {
  isDirectory: PropTypes.bool.isRequired,
  nombre: PropTypes.string.isRequired,
  fechaCreacion: PropTypes.instanceOf(Date).isRequired,
  fechaActualizacion: PropTypes.instanceOf(Date).isRequired,
};

export default Archivo;
