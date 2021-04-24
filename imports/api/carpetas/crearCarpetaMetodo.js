import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import crearCarpeta from './crearCarpeta';

const crearCarpetaMetodo = new ValidatedMethod({
  name: 'crearCarpeta',
  validate: new SimpleSchema({
    carpetaDestino: { type: String, optional: true },
    nombreCarpeta: { type: String },
  }).validator(),
  run({ nombreCarpeta, carpetaDestino }) {
    this.unblock();

    const contenido = crearCarpeta({
      carpetaDestino,
      nombreCarpeta,
    });

    return contenido;
  },
});

export default crearCarpetaMetodo;
