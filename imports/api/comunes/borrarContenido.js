import { Meteor } from 'meteor/meteor';

import fse from 'fs-extra';

import ruta from '../../commons/ruta';

const borrarContenido = (rutaABorrar) => {
  const contenidoABorrar = `${ruta}/tmp/${rutaABorrar}`;

  try {
    fse.removeSync(contenidoABorrar);

    return true;
  } catch (error) {
    console.error(error);

    throw new Meteor.Error(
      'error_borrando_carpeta',
      `Error eliminando el contenido: ${error.message}`,
    );
  }
};

export default borrarContenido;
