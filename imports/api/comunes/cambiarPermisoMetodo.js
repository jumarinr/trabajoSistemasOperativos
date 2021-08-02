import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import cambiarPermiso from './cambiarPermiso';

const cambiarPermisoMetodo = new ValidatedMethod({
  name: 'cambiarPermiso',
  validate: new SimpleSchema({
    rutaArchivo: { type: String },
    permisoCode: { type: Number },
  }).validator(),
  run({ rutaArchivo, permisoCode }) {
    this.unblock();

    return cambiarPermiso({
      permisoCode,
      rutaArchivo,
    });
  },
});

export default cambiarPermisoMetodo;
