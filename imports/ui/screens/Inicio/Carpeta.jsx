import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// font awesome icons
import { faHandScissors, faCopy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import Propiedades from './Propiedades.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  listItemStyle: {
    borderColor: theme.palette.backgroundColor.main,
    border: 'solid 1px',
  },
}));

const Carpeta = ({
  // file
  isDirectory,
  nombre,
  fechaCreacion,
  fechaActualizacion,
  idUsuario,
  rutaActual,
  permiso,

  // funciones
  cambiarRuta,
  borrarContenidoPorNombre,
  editarNombreContenido,
  copiarContenido,
  cortarContenido,
}) => {
  const classes = useStyles();

  const infoNodoActual = {
    isDirectory,
    nombre,
    fechaCreacion,
    fechaActualizacion,
    idUsuario,
    rutaActual,
    permiso,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalPropiedades, setModalPropiedades] = useState(false);

  const handleClickPropiedades = () => {
    setModalPropiedades(true);
  };

  const handleClosePropiedades = () => {
    setModalPropiedades(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <List>
        <ListItem button className={classes.listItemStyle} onClick={() => cambiarRuta(nombre)}>
          <ListItemIcon>
            <FolderOpenIcon />
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
          <ListItemText primary="Copiar Carpeta" />

        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();

            cortarContenido({
              nombreContenido: nombre,
              isDirectory,
            });
          }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faHandScissors} />
          </ListItemIcon>
          <ListItemText primary="Cortar Carpeta" />

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
          <ListItemText primary="Borrar Carpeta" />
        </MenuItem>

        <MenuItem onClick={() => {
          handleClose();

          handleClickPropiedades();
        }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faInfoCircle} />
          </ListItemIcon>
          <ListItemText primary="Propiedades" />
        </MenuItem>

      </Menu>

      <Propiedades
        open={modalPropiedades}
        handleClose={handleClosePropiedades}
        infoNodoActual={infoNodoActual}
      />
    </>
  );
};

Carpeta.propTypes = {
  isDirectory: PropTypes.bool.isRequired,
  nombre: PropTypes.string.isRequired,
  idUsuario: PropTypes.number.isRequired,
  fechaCreacion: PropTypes.instanceOf(Date).isRequired,
  fechaActualizacion: PropTypes.instanceOf(Date).isRequired,
  cambiarRuta: PropTypes.func.isRequired,
  borrarContenidoPorNombre: PropTypes.func.isRequired,
  editarNombreContenido: PropTypes.func.isRequired,
  copiarContenido: PropTypes.func.isRequired,
  cortarContenido: PropTypes.func.isRequired,
  permiso: PropTypes.number.isRequired,
  rutaActual: PropTypes.string.isRequired,
};

export default Carpeta;
