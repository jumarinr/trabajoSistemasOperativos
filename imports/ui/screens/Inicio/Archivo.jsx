import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// material ui icons}
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  listItemStyle: {
    borderColor: theme.palette.backgroundColor.main,
    border: 'solid 1px',
  },
}));

const Archivo = ({
  isDirectory,
  nombre,
  fechaCreacion,
  fechaActualizacion,
}) => {
  const classes = useStyles();
  return (
    <>
      <List>
        <ListItem button className={classes.listItemStyle}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText
            primary={nombre}
            secondary={DateTime
              .fromJSDate(fechaCreacion)
              .setLocale('co')
              .toFormat('ff a')}
          />
        </ListItem>
      </List>
    </>
  );
};

Archivo.propTypes = {
  isDirectory: PropTypes.bool.isRequired,
  nombre: PropTypes.string.isRequired,
  fechaCreacion: PropTypes.instanceOf(Date).isRequired,
  fechaActualizacion: PropTypes.instanceOf(Date).isRequired,
};

export default Archivo;
