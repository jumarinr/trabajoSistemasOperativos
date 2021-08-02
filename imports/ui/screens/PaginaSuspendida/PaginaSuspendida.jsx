/* eslint-disable react/prop-types */

import { withStyles } from '@material-ui/core/styles';
import { PropagateLoader } from 'react-spinners';

import React from 'react';

// material ui core
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import paginaSuspendidaStyles from './paginaSuspendidaStyles.jsx';

const PaginaSuspendida = ({ classes }) => (
  <Container component="main" maxWidth="md">
    <div className={classes.paper}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Cargando...
      </Typography>
      <PropagateLoader color="#f1ce61" />
    </div>

  </Container>
);

export default withStyles(paginaSuspendidaStyles)(PaginaSuspendida);
