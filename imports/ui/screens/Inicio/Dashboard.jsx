/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
// import _ from 'lodash';

import { useSnackbar } from 'notistack';
import { Random } from 'meteor/random';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Material ui core
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

// Material ui icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

// font awesome icons
import { faPaste, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  obtenerContenido, crearArchivo, crearCarpeta, borrarContenido, editarContenido, pegarContenido,
} from './helperDashboard';

// components
import Archivo from './Archivo.jsx';
import Carpeta from './Carpeta.jsx';
import Enrutamiento from './Enrutamiento.jsx';

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [portaPapeles, setPortaPapeles] = useState(localStorage.getItem('viejaRuta'));

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

  const borrarContenidoPorNombre = async ({ rutaABorrar, isDirectory }) => {
    const { isConfirmed } = await Swal.fire({
      title: `¿Esta seguro que desea borrar ${isDirectory ? 'la carpeta llamada' : 'el archivo llamado'} ${rutaABorrar}?`,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: red[500],
      confirmButtonColor: green[600],
      showCancelButton: true,
      reverseButtons: true,
      icon: 'warning',
    });

    if (isConfirmed) {
      try {
        const carpetaABorrar = `${rutaActual}${rutaABorrar}`;
        await borrarContenido(carpetaABorrar);

        enqueueSnackbar(`${isDirectory ? 'Carpeta borrada' : 'Archivo borrado'} con éxito!`, {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);

        const mensajeError = error.reason || error.message;

        enqueueSnackbar(mensajeError, {
          variant: 'error',
        });
      }

      initialLoad(rutaActual);
    }
  };

  const editarNombreContenido = async ({ viejaRuta, isDirectory }) => {
    const { isConfirmed, value: nuevoNombre } = await Swal.fire({
      title: `Ingrese el nuevo nombre. Nombre Actual = ${viejaRuta}`,
      input: 'text',
      inputLabel: '',
      inputPlaceholder: '',
      confirmButtonText: 'Editar Nombre',
      inputAttributes: {
        autoComplete: 'off',
      },
      cancelButtonText: 'Cancelar',
      cancelButtonColor: red[500],
      confirmButtonColor: green[600],
      showCancelButton: true,
      reverseButtons: true,
      icon: 'info',
    });

    if (isConfirmed) {
      try {
        const contenidoAModificar = `${rutaActual}${viejaRuta}`;

        const contenidoNuevo = `${rutaActual}${nuevoNombre}`;

        await editarContenido({
          nuevaRuta: contenidoNuevo,
          viejaRuta: contenidoAModificar,
        });

        enqueueSnackbar(`${isDirectory ? 'Carpeta editada' : 'Archivo editado'} con éxito!`, {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);

        const mensajeError = error.reason || error.message;

        enqueueSnackbar(mensajeError, {
          variant: 'error',
        });
      }

      initialLoad(rutaActual);
    }
  };

  const copiarContenido = ({ nombreContenido, isDirectory }) => {
    const viejaRuta = `${rutaActual}${nombreContenido}`;
    localStorage.setItem('viejaRuta', viejaRuta);

    setPortaPapeles(localStorage.getItem('viejaRuta'));

    enqueueSnackbar(`${isDirectory ? 'Carpeta copiada' : 'Archivo copiado'} con éxito!`, {
      variant: 'success',
    });
  };

  const pegarContenidoPortaPapeles = async() => {
    const contenidoActual = localStorage.getItem('viejaRuta');

    if (!contenidoActual) {
      enqueueSnackbar('No se encontró contenido a pegar', {
        variant: 'error',
      });

      setPortaPapeles(localStorage.getItem('viejaRuta'));

      return;
    }

    try {
      await pegarContenido({
        nuevaRuta: rutaActual,
        viejaRuta: contenidoActual,
      });

      enqueueSnackbar('Pegado con exito!', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);

      const mensajeError = error.reason || error.message;

      enqueueSnackbar(mensajeError, {
        variant: 'error',
      });
    }

    initialLoad(rutaActual);
  };

  return (
    <>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          Nuevo
        </Button>
        &nbsp;

        {portaPapeles
          ? (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={pegarContenidoPortaPapeles}
              startIcon={<FontAwesomeIcon icon={faPaste} />}
            >
              Pegar
            </Button>
          )
          : null}

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
              ? (
                <Carpeta
                  {...resultado}
                  cambiarRuta={cambiarRuta}
                  borrarContenidoPorNombre={borrarContenidoPorNombre}
                  editarNombreContenido={editarNombreContenido}
                  copiarContenido={copiarContenido}
                />
              )
              : (
                <Archivo
                  {...resultado}
                  borrarContenidoPorNombre={borrarContenidoPorNombre}
                  editarNombreContenido={editarNombreContenido}
                  copiarContenido={copiarContenido}
                />
              )}
          </Grid>
        ))}

      </Grid>

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
    </>
  );
};

export default Dashboard;
