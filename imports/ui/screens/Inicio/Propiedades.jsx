/* eslint-disable react/jsx-props-no-spreading */
import { makeStyles } from '@material-ui/core/styles';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material ui icons
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PropertiesFileOrDirectory from '../../contexts/PropertiesFileOrDirectory.jsx';
import Basic from './Basic.jsx';
import Permisos from './Permisos.jsx';
import Propietario from './Propietario.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  tab: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
  },
  hidden: {
    display: 'none',
  },

  default: {
    display: '',
  },
}));

const TAB_PERMISOS = 1;
const TAB_BASIC = 0;
const TAB_PROPIETARIO = 2;

const Propiedades = ({ open, handleClose, infoNodoActual }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const { nombre } = infoNodoActual;

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          Propiedades:
          <b>{` ${nombre}`}</b>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <PropertiesFileOrDirectory.Provider value={infoNodoActual}>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              centered
            >
              <Tab label="Info. Basica" className={classes.tab} />
              <Tab label="Permisos" className={classes.tab} />
              <Tab label="Propietario" className={classes.tab} />
            </Tabs>

            <br />

            <div
              className={tabValue === TAB_BASIC
                ? classes.default
                : classes.hidden}
            >
              <Basic />
            </div>

            <div
              className={tabValue === TAB_PERMISOS
                ? classes.default
                : classes.hidden}
            >
              <Permisos />
            </div>

            <div
              className={tabValue === TAB_PROPIETARIO
                ? classes.default
                : classes.hidden}
            >
              <Propietario />
            </div>

          </PropertiesFileOrDirectory.Provider>
        </DialogContent>
      </Dialog>
    </>
  );
};

Propiedades.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  infoNodoActual: PropTypes.object.isRequired,
};

export default Propiedades;
