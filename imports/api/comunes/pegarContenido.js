import _ from 'lodash';

import { Meteor } from 'meteor/meteor';

import fse from 'fs-extra';

import ruta from '../../commons/ruta';

const pegarContenido = ({ nuevaRuta, viejaRuta }) => {
  const nombreContenido = _.last(viejaRuta.split('/'));
  const contenidoViejo = `${ruta}/tmp${viejaRuta}`;

  const contenidoNuevo = `${ruta}/tmp${nuevaRuta}${nombreContenido}`;

  try {
    fse.copySync(contenidoViejo, contenidoNuevo);

    return true;
  } catch (error) {
    console.error(error);

    const message = error.message === 'Source and destination must not be the same.'
      ? 'No se puede copiar un archivo en el mismo destino'
      : `Error copiando el contenido: ${error.message}`;

    throw new Meteor.Error('error_editando_carpeta', message);
  }
};

export default pegarContenido;
