import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import pegarContenidoCortado from './pegarContenidoCortado';

const pegarContenidoCortadoMetodo = new ValidatedMethod({
  name: 'pegarContenidoCortado',
  validate: new SimpleSchema({
    nuevaRuta: { type: String },
    viejaRuta: { type: String },
  }).validator(),
  run({ nuevaRuta, viejaRuta }) {
    this.unblock();

    const rutaBorrada = pegarContenidoCortado({
      nuevaRuta,
      viejaRuta,
    });

    return rutaBorrada;
  },
});

export default pegarContenidoCortadoMetodo;
