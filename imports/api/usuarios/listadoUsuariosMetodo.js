import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Promise as MPromise } from 'meteor/promise';

import listadoUsuarios from './listadoUsuarios';

const listadoUsuariosMetodo = new ValidatedMethod({
  name: 'listadoUsuarios',
  validate: null,
  run() {
    this.unblock();

    const rutaBorrada = MPromise.await(listadoUsuarios());

    return rutaBorrada;
  },
});

export default listadoUsuariosMetodo;
