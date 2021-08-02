import React from 'react';

const properties = {
  isDirectory: null,
  nombre: null,
  fechaCreacion: null,
  fechaActualizacion: null,
  idUsuario: null,
  rutaActual: null,
  permiso: null,
};

const PropertiesFileOrDirectory = React.createContext(properties);

export default PropertiesFileOrDirectory;
