import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Avatar from '@material-ui/core/Avatar';

// material ui icons
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const Carpeta = ({
  isDirectory,
  nombre,
  fechaCreacion,
  fechaActualizacion,
}) => (
  <>
    <Avatar>
      <FolderOpenIcon />
    </Avatar>
    {nombre}
  </>
);

Carpeta.propTypes = {
  isDirectory: PropTypes.bool.isRequired,
  nombre: PropTypes.string.isRequired,
  fechaCreacion: PropTypes.instanceOf(Date).isRequired,
  fechaActualizacion: PropTypes.instanceOf(Date).isRequired,
};

export default Carpeta;
