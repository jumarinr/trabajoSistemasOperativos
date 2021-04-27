import { Random } from 'meteor/random';

import _ from 'lodash';

import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

// material icons
import HomeIcon from '@material-ui/icons/Home';

const Enrutamiento = ({ arrayBreadCrump = [], setRutaActual }) => {
  const redirigir = (rutaPosition) => {
    const copiaRuta = Object.assign([], arrayBreadCrump);

    const ruta = _.take(copiaRuta, rutaPosition).join('/');

    setRutaActual(`${ruta}/`);
  };
  return (
    <>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {arrayBreadCrump.map((ruta, key) => {
          const contenido = ruta
            ? (
              <Typography
                color="textPrimary"
                onClick={() => redirigir(key + 1)}
                key={Random.id()}
                style={{ cursor: 'pointer' }}
              >
                {ruta}
              </Typography>
            )
            : (
              <HomeIcon
                onClick={() => redirigir(key + 1)}
                key={Random.id()}
                style={{ cursor: 'pointer' }}
              />
            );
          return contenido;
        })}
      </Breadcrumbs>
    </>
  );
};

Enrutamiento.propTypes = {
  arrayBreadCrump: PropTypes.arrayOf(PropTypes.string).isRequired,
  setRutaActual: PropTypes.func.isRequired,
};

export default Enrutamiento;
