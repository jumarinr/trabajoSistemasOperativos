import { Meteor } from 'meteor/meteor';

// import fs from 'fs';

import { execSync } from 'child_process';

import ruta from '../../commons/ruta';
import contrasena from '../../commons/contrasena';

const cambiarPropietario = async ({ path, uid, gid }) => {
  const currentPath = `${ruta}/tmp${path}`;

  if (!contrasena) {
    throw new Meteor.Error(
      'error_contraseña',
      'Debe ingresar una contraseña primero',
    );
  }

  try {
    execSync(`echo ${contrasena} | sudo -S chown ${uid}:${gid} ${currentPath}`);
  } catch (error) {
    console.error(error);

    throw new Meteor.Error(
      'error',
      `Error cambiando Propietario: ${String(error.stderr)}`,
    );
  }
};

export default cambiarPropietario;
