import _ from 'lodash';

import { Meteor } from 'meteor/meteor';

import fs from 'fs';

import { exec } from 'child_process';
import ruta from '../../commons/ruta';

/**
 *
 * @param {String} carpetaALeer
 */
const leerContenido = async(carpetaALeer = '/') => {
  try {
    const principalFolder = `${ruta}/tmp${carpetaALeer}`;

    const ejecucion = await new Promise((resolve, reject) => {
      exec('groups', (error, stdout, stderr) => {
        if (error) {
          console.error(error, stderr);
          reject(error);
        }
        resolve(stdout);
      });
    });

    const grupos = ejecucion.split(' ');

    console.log(grupos);

    const datos = fs.readdirSync(principalFolder);

    const datosConvertidos = datos.map((archivoOCarpeta) => {
      const object = fs.lstatSync(`${principalFolder}${archivoOCarpeta}`);

      // obtenemos propiedades
      const isDirectory = object.isDirectory();
      const fechaCreacion = object.birthtime;
      const fechaActualizacion = object.mtime;
      console.log(object.uid, object.gid);

      return {
        isDirectory,
        nombre: archivoOCarpeta,
        fechaCreacion,
        fechaActualizacion,
      };
    });

    return _.orderBy(datosConvertidos, ['nombre'], ['asc']);
  } catch (error) {
    console.error(error);

    throw new Meteor.Error('error_leyendo_directorio', 'Error leyendo el directorio');
  }
};

export default leerContenido;
