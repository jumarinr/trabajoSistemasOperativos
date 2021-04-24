import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import leerContenido from './leerContenido';

const leerContenidoMetodo = new ValidatedMethod({
  name: 'leerContenido',
  validate: new SimpleSchema({
    carpetaALeer: { type: String, optional: true },
  }).validator(),
  run({ carpetaALeer }) {
    this.unblock();
    const contenido = leerContenido(carpetaALeer);

    return contenido;
  },
});

export default leerContenidoMetodo;
