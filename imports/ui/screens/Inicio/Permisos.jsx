import { useSnackbar } from 'notistack';

import _ from 'lodash';

import React, { useContext, useState, useEffect } from 'react';
import ReactSelect from 'react-select';

// material ui core
import DialogContentText from '@material-ui/core/DialogContentText';

import { cambiarPermiso } from './helperDashboard.js';
import { PERMISO_ESCRITURA, PERMISO_LECTURA, NO_PERMISSION } from '../../../commons/constantes.js';

import PropertiesFileOrDirectory from '../../contexts/PropertiesFileOrDirectory.jsx';

const PERMISOS = [
  { label: 'Lectura y escritura', value: PERMISO_ESCRITURA },
  { label: 'Lectura', value: PERMISO_LECTURA },
  { label: 'Sin Permiso', value: NO_PERMISSION },
];

const Permisos = () => {
  const { enqueueSnackbar } = useSnackbar();

  const properties = useContext(PropertiesFileOrDirectory);
  const { rutaActual, nombre } = properties;

  const [permiso, setPermiso] = useState(null);

  const handleResponse = (value) => () => {
    setPermiso(value);

    enqueueSnackbar('Permiso cambiado con éxito', {
      variant: 'success',
    });
  };

  const handleError = (error) => {
    console.error(error);
    enqueueSnackbar(error.reason, {
      variant: 'error',
    });
  };

  const handleChangePermiso = (value) => {
    const permisoCode = _.get(value, 'value', NaN);
    const llamadoResponse = handleResponse(value);

    cambiarPermiso({
      permisoCode,
      rutaArchivo: `${rutaActual}${nombre}`,
    })
      .then(llamadoResponse)
      .catch(handleError);
  };

  const permisoRaw = _.get(properties, 'permiso', null);

  useEffect(() => {
    const permisoObject = _.find(PERMISOS, { value: permisoRaw });

    if (permisoObject) {
      setPermiso(permisoObject);
    }
  }, [permisoRaw]);

  return (
    <>
      <DialogContentText id="alert-dialog-slide-description">
        <b>Permiso: </b>

        <ReactSelect
          options={PERMISOS}
          value={permiso}
          menuPosition="fixed"
          fullWidth
          maxMenuHeight={150}
          placeholder=""
          onChange={handleChangePermiso}
          noOptionsMessage={() => 'No se encontraron permisos'}
        />
      </DialogContentText>
    </>
  );
};

Permisos.propTypes = {

};

export default Permisos;
