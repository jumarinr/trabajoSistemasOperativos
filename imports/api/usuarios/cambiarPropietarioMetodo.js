import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import cambiarPropietario from './cambiarPropietario';

const cambiarPropietarioMetodo = new ValidatedMethod({
  name: 'cambiarPropietario',
  validate: new SimpleSchema({
    path: { type: String },
    uid: { type: Number },
    gid: { type: Number },
  }).validator(),
  run({ path, gid, uid }) {
    this.unblock();

    return cambiarPropietario({
      path,
      uid,
      gid,
    });
  },
});

export default cambiarPropietarioMetodo;
