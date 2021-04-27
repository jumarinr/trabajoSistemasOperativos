import { Meteor } from 'meteor/meteor';

import fse from 'fs-extra';

import ruta from '../../commons/ruta';

const borrarCarpeta = (rutaABorrar) => {
  const carpetaABorrar = `${ruta}/tmp/${rutaABorrar}`;

  try {
    fse.removeSync(carpetaABorrar);

    return true;
  } catch (error) {
    console.error(error);

    throw new Meteor.Error('error_borrando_carpeta', 'Error eliminando la carpeta');
  }
};

export default borrarCarpeta;
