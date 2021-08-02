import { Meteor } from 'meteor/meteor';

/**
 * @typedef EntradaEditar
 * @property {String} nuevaRuta
 * @property {String} viejaRuta
 */
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
export const borrarContenido = (rutaABorrar) => new Promise((resolve, reject) => {
  Meteor.call('borrarContenido', { rutaABorrar }, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

/**
 * función para editar el nombre de un archivo o carpeta
 * @param {EntradaEditar} entrada
 * @returns {Promise<Boolean>}
 */
export const editarContenido = (entrada) => new Promise((resolve, reject) => {
  Meteor.call('editarContenido', entrada, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

/**
 * función para pegar un archivo o carpeta
 * @param {EntradaEditar} entrada
 * @returns {Promise<Boolean>}
 */
export const pegarContenido = (entrada) => new Promise((resolve, reject) => {
  Meteor.call('pegarContenido', entrada, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

/**
 * función para pegar un archivo o carpeta
 * @param {EntradaEditar} entrada
 * @returns {Promise<Boolean>}
*/
export const pegarContenidoCortado = (entrada) => new Promise((resolve, reject) => {
  Meteor.call('pegarContenidoCortado', entrada, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

export const listadoUsuarios = () => new Promise((resolve, reject) => {
  Meteor.call('listadoUsuarios', (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

export const cambiarPropietario = (entrada) => new Promise((resolve, reject) => {
  Meteor.call('cambiarPropietario', entrada, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

/**
 * función para cambiar los permisos a las rutas o archivos
 * @param {Object} entrada
 * @param {String} entrada.rutaArchivo
 * @param {Number} entrada.permisoCode
 * @returns {Promise<Boolean>}
 */
export const cambiarPermiso = (entrada) => new Promise((resolve, reject) => {
  Meteor.call('cambiarPermiso', entrada, (err, result) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(result);
    }
  });
});
