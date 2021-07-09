import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import cambiarPropietario from './cambiarPropietario';

const cambiarPropietarioMetodo = new ValidatedMethod({
  name: 'cambiarPropietario',
  validate: new SimpleSchema({
    path: { type: String },
    gid: { type: Number },
    uid: { type: Number },
  }).validator(),
  run({ path, gid, uid }) {
    this.unblock();

    const rutaBorrada = cambiarPropietario({
      gid,
      path,
      uid,
    });

    return rutaBorrada;
  },
});

export default cambiarPropietarioMetodo;
