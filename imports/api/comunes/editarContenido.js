import { Meteor } from 'meteor/meteor';

import fs from 'fs';

import ruta from '../../commons/ruta';

/**
 * @typedef Entrada
 * @property {String} nuevaRuta
 * @property {String} viejaRuta
 */

/**
 * función para editar el nombre de un archivo o carpeta
 * @param {Entrada} entrada
 * @returns {Boolean}
 */
const editarContenido = ({ nuevaRuta, viejaRuta }) => {
  const contenidoViejo = `${ruta}/tmp/${viejaRuta}`;

  const contenidoNuevo = `${ruta}/tmp/${nuevaRuta}`;
  try {
    fs.renameSync(contenidoViejo, contenidoNuevo);

    return true;
  } catch (error) {
    console.error(error);

    throw new Meteor.Error('error_editando_carpeta', 'Error editando el contenido');
  }
};

export default editarContenido;
