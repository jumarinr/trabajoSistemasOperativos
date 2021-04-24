/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useSnackbar } from 'notistack';

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

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [rutaActual] = useState('/');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const initialLoad = async() => {
    try {
      const resultadoMetodo = await obtenerContenido(rutaActual);

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

      initialLoad();
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

      initialLoad();
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
    initialLoad();
    return () => null;
  }, []);
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

        {console.log(resultados)}
        {resultados.map((resultado) => (
          <Grid item xs={4} md={1}>
            {resultado.isDirectory
              ? <Carpeta {...resultado} />
              : <Archivo {...resultado} />}
          </Grid>
        ))}

      </Grid>

    </>
  );
};

export default Dashboard;
