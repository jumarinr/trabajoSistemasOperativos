/* eslint-disable no-console */
import fs from 'fs';
import { Meteor } from 'meteor/meteor';

import ruta from '../../commons/ruta';

/**
 * @typedef Entrada
 * @property {String} nombreArchivo
 * @property {String} carpetaDestino
 */

/**
 * función para crear un archivo
 * @param {Entrada} entrada
 */
const crearArchivo = ({ nombreArchivo, carpetaDestino = '/' }) => {
  const principalFolder = `${ruta}/tmp${carpetaDestino}${nombreArchivo}`;
  try {
    fs.writeFileSync(principalFolder, '');

    return true;
  } catch (error) {
    console.error(error);
    const mensajeError = error.errno === -4068
      ? 'Ya existe un archivo o carpeta con este nombre, por favor verificar'
      : `Error creando la carpeta: ${error.message}`;
    throw new Meteor.Error('error_creando_archivo', mensajeError);
  }
};

export default crearArchivo;
