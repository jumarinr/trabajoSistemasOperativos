/* eslint-disable no-console */
import fs from 'fs';
import { Meteor } from 'meteor/meteor';

import ruta from '../../commons/ruta';

/**
 * @typedef Entrada
 * @property {String} nombreCarpeta
 * @property {String} carpetaDestino
 */

/**
 * función para crear un archivo
 * @param {Entrada} entrada
 */
const crearCarpeta = ({ nombreCarpeta, carpetaDestino = '/' }) => {
  const principalFolder = `${ruta}/tmp${carpetaDestino}${nombreCarpeta}`;
  try {
    fs.mkdirSync(principalFolder);

    return true;
  } catch (error) {
    console.error(error);
    const mensajeError = error.errno === -4075
      ? 'Ya existe un archivo o carpeta con este nombre, por favor verificar'
      : 'Error creando la carpeta';
    throw new Meteor.Error('error_creando_archivo', mensajeError);
  }
};

export default crearCarpeta;
