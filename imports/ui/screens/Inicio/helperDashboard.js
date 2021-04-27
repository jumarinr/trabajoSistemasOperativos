import { Meteor } from 'meteor/meteor';

export const obtenerContenido = (carpetaALeer) => new Promise((resolve, reject) => {
  Meteor.call('leerContenido', { carpetaALeer }, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

/**
 * @typedef EntradaCrearArchivo
 * @property {String} nombreArchivo
 * @property {String|null} carpetaDestino
*/

/**
 * @typedef EntradaCrearCarpeta
 * @property {String} nombreCarpeta
 * @property {String|null} carpetaDestino
*/

/**
 * función para crear un archivo
 * @param {EntradaCrearArchivo} entrada
 * @returns {Promise<Boolean>}
 */
export const crearArchivo = (entrada) => new Promise((resolve, reject) => {
  Meteor.call('crearArchivo', entrada, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

/**
 * función para crear una carpeta
 * @param {EntradaCrearCarpeta} entrada
 * @returns {Promise<Boolean>}
 */
export const crearCarpeta = (entrada) => new Promise((resolve, reject) => {
  Meteor.call('crearCarpeta', entrada, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

/**
 * función para borrar la carpeta
 * @param {String} rutaABorrar
 * @returns {Promise<Boolea>}
 */
export const borrarCarpeta = (rutaABorrar) => new Promise((resolve, reject) => {
  Meteor.call('borrarCarpeta', { rutaABorrar }, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});
