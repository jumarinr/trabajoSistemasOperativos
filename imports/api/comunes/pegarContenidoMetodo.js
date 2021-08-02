import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import pegarContenido from './pegarContenido';

const pegarContenidoMetodo = new ValidatedMethod({
  name: 'pegarContenido',
  validate: new SimpleSchema({
    nuevaRuta: { type: String },
    viejaRuta: { type: String },
  }).validator(),
  run({ nuevaRuta, viejaRuta }) {
    this.unblock();

    const rutaBorrada = pegarContenido({
      nuevaRuta,
      viejaRuta,
    });

    return rutaBorrada;
  },
});

export default pegarContenidoMetodo;
