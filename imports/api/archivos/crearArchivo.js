/* eslint-disable no-console */
import fs from 'fs';
import { Meteor } from 'meteor/meteor';

const ruta = 'C:/Users/juann/Documents/trabajoSistemasOperativos';
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
    fs.writeFileSync(principalFolder);

    return true;
  } catch (error) {
    console.error(error);

    throw new Meteor.Error('error_creando_archivo', 'Error creando el archivo');
  }
};

export default crearArchivo;
