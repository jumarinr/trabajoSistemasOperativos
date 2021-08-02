import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import borrarContenido from './borrarContenido';

const borrarContenidoMetodo = new ValidatedMethod({
  name: 'borrarContenido',
  validate: new SimpleSchema({
    rutaABorrar: { type: String },
  }).validator(),
  run({ rutaABorrar }) {
    this.unblock();

    const rutaBorrada = borrarContenido(rutaABorrar);

    return rutaBorrada;
  },
});

export default borrarContenidoMetodo;
