import '../imports/startup';

import { Meteor } from 'meteor/meteor';
import leerContenido from '../imports/api/comunes/leerContenido';

Meteor.startup(() => {
  leerContenido(leerContenido);
});
