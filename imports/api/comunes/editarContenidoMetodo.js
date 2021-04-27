import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import editarContenido from './editarContenido';

const editarContenidoMetodo = new ValidatedMethod({
  name: 'editarContenido',
  validate: new SimpleSchema({
    nuevaRuta: { type: String },
    viejaRuta: { type: String },
  }).validator(),
  run({ nuevaRuta, viejaRuta }) {
    this.unblock();

    const rutaBorrada = editarContenido({
      nuevaRuta,
      viejaRuta,
    });

    return rutaBorrada;
  },
});

export default editarContenidoMetodo;
