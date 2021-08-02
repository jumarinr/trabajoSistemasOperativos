import _ from 'lodash';

import React, { useState, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

// material ui core
import DialogContentText from '@material-ui/core/DialogContentText';

import { listadoUsuarios, cambiarPropietario } from './helperDashboard';

import PropertiesFileOrDirectory from '../../contexts/PropertiesFileOrDirectory.jsx';

const Propietario = () => {
  const { idUsuario, nombre, rutaActual } = useContext(PropertiesFileOrDirectory);

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [propietario, setPropietario] = useState(null);

  const cargarListadoUsuarios = () => listadoUsuarios()
    .then(setListaUsuarios)
    .catch(console.error);

  const handleChangeSelect = (newPropietario) => {
    cambiarPropietario({
      path: `${rutaActual}${nombre}`,
      uid: newPropietario.idUser,
      gid: newPropietario.idGroup,
    })
      .then(() => {
        console.log(setPropietario);

        setPropietario(newPropietario);
      })
      .catch(console.error);
  };

  useEffect(() => {
    cargarListadoUsuarios();

    return () => null;
  }, []);

  useEffect(() => {
    if (idUsuario && !_.isEmpty(listaUsuarios)) {
      const currentPropietario = _.find(listaUsuarios, { idUser: idUsuario });

      setPropietario({
        ...currentPropietario,
        label: currentPropietario.userName,
        value: idUsuario,
      });
    }
  }, [idUsuario, listaUsuarios]);

  return (
    <div>
      <DialogContentText id="alert-dialog-slide-description">
        <b>Nombre </b>

        <ReactSelect
          options={listaUsuarios}
          value={propietario}
          menuPosition="fixed"
          fullWidth
          placeholder=""
          maxMenuHeight={150}
          noOptionsMessage={() => 'No se encontraron usuarios'}
          onChange={handleChangeSelect}
        />

      </DialogContentText>

    </div>
  );
};

Propietario.propTypes = {
};

export default Propietario;
