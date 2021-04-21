import React from 'react';
import PropTypes from 'prop-types';

const Navegacion = ({ children }) => (
  <>
    Header
    <br />
    {children}
  </>
);

Navegacion.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Navegacion;
