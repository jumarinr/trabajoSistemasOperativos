import _ from 'lodash';

import { Meteor } from 'meteor/meteor';

import fs from 'fs';

import ruta from '../../commons/ruta';

/**
 *
 * @param {String} carpetaALeer
 */
const leerContenido = async(carpetaALeer = '/') => {
  try {
    const principalFolder = `${ruta}/tmp${carpetaALeer}`;

    console.log(principalFolder);

    const datos = fs.readdirSync(principalFolder);

    const datosConvertidos = datos.map((archivoOCarpeta) => {
      const object = fs.lstatSync(`${principalFolder}${archivoOCarpeta}`);

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
      };
    });

    return _.orderBy(datosConvertidos, ['nombre'], ['asc']);
  } catch (error) {
    console.error(error);

    throw new Meteor.Error('error_leyendo_directorio', 'Error leyendo el directorio');
  }
};

export default leerContenido;
