import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material ui core
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// material ui icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// font awesome icons
import { faHandScissors, faCopy } from '@fortawesome/free-solid-svg-icons';

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
  borrarContenidoPorNombre,
  editarNombreContenido,
  copiarContenido,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              .toFormat('ff')}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              aria-controls={nombre}
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Menu
        id={nombre}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();

            editarNombreContenido({
              viejaRuta: nombre,
              isDirectory,
            });
          }}
        >
          <ListItemIcon>
            <EditTwoToneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Editar nombre" />

        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();

            copiarContenido({
              nombreContenido: nombre,
              isDirectory,
            });
          }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faCopy} />
          </ListItemIcon>
          <ListItemText primary="Copiar Archivo" />

        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faHandScissors} />
          </ListItemIcon>
          <ListItemText primary="Cortar Archivo" />

        </MenuItem>

        <MenuItem onClick={() => {
          handleClose();

          borrarContenidoPorNombre({
            rutaABorrar: nombre,
            isDirectory,
          });
        }}
        >
          <ListItemIcon>
            <DeleteTwoToneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Borrar Archivo" />
        </MenuItem>
      </Menu>
    </>
  );
};

Archivo.propTypes = {
  isDirectory: PropTypes.bool.isRequired,
  nombre: PropTypes.string.isRequired,
  fechaCreacion: PropTypes.instanceOf(Date).isRequired,
  fechaActualizacion: PropTypes.instanceOf(Date).isRequired,
  borrarContenidoPorNombre: PropTypes.func.isRequired,
  editarNombreContenido: PropTypes.func.isRequired,
  copiarContenido: PropTypes.func.isRequired,
};

export default Archivo;
