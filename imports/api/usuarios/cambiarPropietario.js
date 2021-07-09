import { Meteor } from 'meteor/meteor';

import fs from 'fs';

import ruta from '../../commons/ruta';

const cambiarPropietario = async ({ path, uid, gid }) => {
  const currentPath = `${ruta}/tmp/${path}`;

  try {
    return fs.chownSync(currentPath, uid, gid);
  } catch (error) {
    console.error(error);

    throw new Meteor.Error('error', 'error_cambiando_propietario');
  }
};

export default cambiarPropietario;
