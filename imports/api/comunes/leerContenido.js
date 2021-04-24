import fs from 'fs';

const ruta = 'C:/Users/juann/Documents/trabajoSistemasOperativos';

/**
 *
 * @param {String} carpetaALeer
 */
const leerContenido = (carpetaALeer = '/') => {
  try {
    const principalFolder = `${ruta}/tmp/`;

    console.log(fs.readSync(principalFolder));
  } catch (error) {
    console.error();
  }
};

export default leerContenido;
