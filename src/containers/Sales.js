import React, { useState } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { clearSession } from '../utils/auth';
import { useStore } from '../store/Store';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HistoryIcon from '@material-ui/icons/History';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SalesContainer from './SalesContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  nav: {
    width: '100%',
    flexGrow: 1,
    height: '64px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bottom: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    flexGrow: 1,
  },
}));

export default function Sales() {
  const classes = useStyles();
  const [value, setValue] = useState(1);

  const history = useHistory();
  const {
    selectors: { user },
    actions: { logout },
  } = useStore();

  return (
    <div className={classes.root}>
      {' '}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ventas
          </Typography>

          <Typography variant="h6" className={classes.title}>
            {user.name} {user.lastname}
          </Typography>
          <Button
            onClick={() => {
              clearSession();
              logout();
              history.push('/login');
            }}
          >
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <SalesContainer />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottom}
      >
        <BottomNavigationAction
          label="Nuevo Pedido"
          icon={<AddCircleIcon />}
          component={NavLink}
          to="/sales/new"
        />
        <BottomNavigationAction
          label="Ordenes Activas"
          icon={<ListAltIcon />}
          component={NavLink}
          to="/sales/active"
        />
        <BottomNavigationAction
          label="Historial de Ordenes"
          icon={<HistoryIcon />}
          component={NavLink}
          to="/sales/history"
        />
      </BottomNavigation>
    </div>
  );
}
