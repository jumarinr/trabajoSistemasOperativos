import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import crearArchivo from './crearArchivo';

const crearArchivoMetodo = new ValidatedMethod({
  name: 'crearArchivo',
  validate: new SimpleSchema({
    carpetaDestino: { type: String, optional: true },
    nombreArchivo: { type: String },
  }).validator(),
  run({ nombreArchivo, carpetaDestino }) {
    this.unblock();
    const contenido = crearArchivo({
      carpetaDestino,
      nombreArchivo,
    });

    return contenido;
  },
});

export default crearArchivoMetodo;
