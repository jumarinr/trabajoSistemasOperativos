/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useSnackbar } from 'notistack';
import { Random } from 'meteor/random';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Material ui core
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Material ui icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import { obtenerContenido, crearArchivo, crearCarpeta } from './helperDashboard';

// components
import Archivo from './Archivo.jsx';
import Carpeta from './Carpeta.jsx';
import Enrutamiento from './Enrutamiento.jsx';

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [rutaActual, setRutaActual] = useState('/');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const initialLoad = async(ruta) => {
    try {
      const resultadoMetodo = await obtenerContenido(ruta);

      setResultados(resultadoMetodo);
    } catch (error) {
      console.error(error);
    }
  };

  const crearNuevoArchivo = async(fileName) => {
    try {
      await crearArchivo({
        nombreArchivo: fileName,
        carpetaDestino: rutaActual,
      });

      enqueueSnackbar('Archivo creado con éxito', {
        variant: 'success',
      });

      initialLoad(rutaActual);
    } catch (error) {
      console.error(error);
      const mensajeError = error.reason || error.message;

      enqueueSnackbar(mensajeError, {
        variant: 'error',
      });
    }
  };

  const alCrearArchivo = async() => {
    const { value: fileName } = await Swal.fire({
      title: 'Ingrese el nombre del archivo, si desee con la extensión',
      input: 'text',
      inputLabel: 'si desea con la extensión',
      inputPlaceholder: '',
      confirmButtonText: 'Crear',
      inputAttributes: {
        autoComplete: 'off',
      },
    });

    if (fileName) {
      crearNuevoArchivo(fileName);
    }
  };

  const crearNuevaCarpeta = async(folderName) => {
    try {
      await crearCarpeta({
        nombreCarpeta: folderName,
        carpetaDestino: rutaActual,
      });

      enqueueSnackbar('Carpeta creada con éxito', {
        variant: 'success',
      });

      initialLoad(rutaActual);
    } catch (error) {
      console.error(error);

      const mensajeError = error.reason || error.message;

      enqueueSnackbar(mensajeError, {
        variant: 'error',
      });
    }
  };

  const alCrearCarpeta = async() => {
    const { value: folderName } = await Swal.fire({
      title: 'Ingrese el nombre de la carpeta',
      input: 'text',
      inputLabel: '',
      inputPlaceholder: '',
      confirmButtonText: 'Crear',
      inputAttributes: {
        autoComplete: 'off',
      },
    });

    if (folderName) {
      crearNuevaCarpeta(folderName);
    }
  };

  useEffect(() => {
    if (rutaActual) {
      initialLoad(rutaActual);
    }
  }, [rutaActual]);

  const cambiarRuta = (nuevaRuta) => {
    const ruta = `${rutaActual}${nuevaRuta}/`;
    setRutaActual(ruta);
  };

  const arrayBreadCrump = rutaActual.split('/');

  // eliminamos la última posicion que no retorna nada
  arrayBreadCrump.pop();

  return (
    <>
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Nuevo
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            handleClose();
            alCrearCarpeta();
          }}
          >
            <ListItemIcon>
              <CreateNewFolderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Crear Carpeta" />

          </MenuItem>

          <MenuItem onClick={() => {
            handleClose();
            alCrearArchivo();
          }}
          >
            <ListItemIcon>
              <InsertDriveFileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Crear Archivo" />
          </MenuItem>
        </Menu>
      </div>

      <br />

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Enrutamiento arrayBreadCrump={arrayBreadCrump} setRutaActual={setRutaActual} />
        </Grid>

        {resultados.map((resultado) => (
          <Grid
            item
            xs={6}
            md={2}
            key={Random.id()}
          >
            {resultado.isDirectory
              ? <Carpeta {...resultado} cambiarRuta={cambiarRuta} />
              : <Archivo {...resultado} />}
          </Grid>
        ))}

      </Grid>

    </>
  );
};

export default Dashboard;
