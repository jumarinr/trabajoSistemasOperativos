import { Meteor } from 'meteor/meteor';

import fs from 'fs';

import '../imports/startup';

import leerContenido from '../imports/api/comunes/leerContenido';
import ruta from '../imports/commons/ruta';

Meteor.startup(() => {
  leerContenido()
    .then()
    .catch(() => {
      fs.mkdirSync(`${ruta}/tmp`);
    });
});
