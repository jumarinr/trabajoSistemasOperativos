import { Meteor } from 'meteor/meteor';

import fs from 'fs';

const ruta = 'C:/Users/juann/Documents/trabajoSistemasOperativos';

/**
 *
 * @param {String} carpetaALeer
 */
const leerContenido = (carpetaALeer = '/') => {
  try {
    const principalFolder = `${ruta}/tmp${carpetaALeer}`;

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
      };
    });

    return datosConvertidos;
  } catch (error) {
    console.error(error);

    throw new Meteor.Error('error_leyendo_directorio', 'Error leyendo el directorio');
  }
};

export default leerContenido;
