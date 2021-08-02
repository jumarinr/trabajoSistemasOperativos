import _ from 'lodash';

import { Meteor } from 'meteor/meteor';

import fs from 'fs';

import { PERMISO_ESCRITURA, PERMISO_LECTURA, NO_PERMISSION } from '../../commons/constantes';

import ruta from '../../commons/ruta';

/**
 * función para detectar el permiso del archivo
 * @param {String} fileOrDirectory
 * @returns {Number}
 */
const comprobarPermisos = (fileOrDirectory) => {
  try {
    fs.accessSync(fileOrDirectory, fs.constants.W_OK);

    return PERMISO_ESCRITURA;
  } catch (error) { console.log('sin permisos de escritura'); }

  try {
    fs.accessSync(fileOrDirectory, fs.constants.R_OK);

    return PERMISO_LECTURA;
  } catch (error) {
    return NO_PERMISSION;
  }
};

/**
 *
 * @param {String} carpetaALeer
 */
const leerContenido = async(carpetaALeer = '/') => {
  try {
    const principalFolder = `${ruta}/tmp${carpetaALeer}`;

    const datos = fs.readdirSync(principalFolder);

    const datosConvertidos = datos.map((archivoOCarpeta) => {
      const fileOrDirectory = `${principalFolder}${archivoOCarpeta}`;
      const object = fs.lstatSync(fileOrDirectory);
      const permiso = comprobarPermisos(fileOrDirectory);

      // obtenemos propiedades
      const isDirectory = object.isDirectory();
      const fechaCreacion = object.birthtime;
      const fechaActualizacion = object.mtime;

      return {
        isDirectory,
        nombre: archivoOCarpeta,
        fechaCreacion,
        fechaActualizacion,
        idUsuario: object.uid,
        permiso,
      };
    });

    return _.orderBy(datosConvertidos, ['nombre'], ['asc']);
  } catch (error) {
    console.error(error);

    throw new Meteor.Error(
      'error_leyendo_directorio',
      `Error leyendo el directorio: ${error.message}`,
    );
  }
};

export default leerContenido;
