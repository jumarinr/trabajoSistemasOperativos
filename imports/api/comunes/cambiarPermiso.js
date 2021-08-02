import { Meteor } from 'meteor/meteor';

import fs from 'fs';

import ruta from '../../commons/ruta';

/**
 * función para cambiar los permisos a las rutas o archivos
 * @param {Object} entrada
 * @param {String} entrada.rutaArchivo
 * @param {Number} entrada.permisoCode
 * @returns {Boolean}
 */
const cambiarPermiso = ({ rutaArchivo, permisoCode }) => {
  const rutaCompleta = `${ruta}/tmp/${rutaArchivo}`;
  try {
    fs.chmodSync(rutaCompleta, permisoCode);

    return true;
  } catch (error) {
    throw new Meteor.Error('error_cambio_permisos', error.message);
  }
};

export default cambiarPermiso;
