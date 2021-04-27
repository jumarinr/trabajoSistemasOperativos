import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import borrarCarpeta from './borrarCarpeta';

const borrarCarpetaMetodo = new ValidatedMethod({
  name: 'borrarCarpeta',
  validate: new SimpleSchema({
    rutaABorrar: { type: String },
  }).validator(),
  run({ rutaABorrar }) {
    this.unblock();

    const rutaBorrada = borrarCarpeta(rutaABorrar);

    return rutaBorrada;
  },
});

export default borrarCarpetaMetodo;
