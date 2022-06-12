import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import SyncIcon from '@material-ui/icons/Sync';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, FormControlLabel } from '@material-ui/core';
import './NavBarDrawer.css';
import Box from '@material-ui/core/Box';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    // width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  IconButton: {
    marginRight: theme.spacing(5),
  },
}));

function NavbarDrawer({ updateTT, toggleTheme }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 500);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 500);
    });
  }, []);
  const drawerHeader = (
    <div>
      <Box display="flex">
        <IconButton
          key="Sync with aims timetable"
          type="submit"
          onClick={updateTT}
          color="inherit"
          title="Sync with AIMS Timetable"
          className={classes.IconButton}
        >
          <SyncIcon />
        </IconButton>
        <IconButton
          color="inherit"
          title="Toggle Theme"
          type="submit"
          onClick={toggleTheme}
          className={classes.IconButton}
        >
          <BrightnessHighIcon />
        </IconButton>
        <IconButton
          color="inherit"
          type="submit"
          onClick={() => {
            localStorage.clear();
            firebase.auth().signOut();
            window.location.reload();
          }}
          title="Logout"
          className={classes.IconButton}
        >
          <ExitToAppIcon />
        </IconButton>
      </Box>
    </div>
  );

  const drawerNavbarMenu = (
    <div>
      <Divider />
      <List>
        <ListItem
          button
          key="Sync with aims timetable"
          type="submit"
          onClick={updateTT}
        >
          <ListItemIcon>
            <SyncIcon />
          </ListItemIcon>
          <ListItemText primary="Sync with AIMS Timetable" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key="Logout"
          type="submit"
          onClick={() => {
            localStorage.clear();
            firebase.auth().signOut();
            window.location.reload();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <FormControlLabel
            control={<Switch onChange={toggleTheme} />}
            label="Toggle Theme"
          />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Box display="flex" flexGrow={1} paddingLeft={isMobile ? 0 : 3}>
            <Typography variant="h6" noWrap>
              IITH Dashboard
            </Typography>
          </Box>
          {isMobile ? '' : drawerHeader}
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerNavbarMenu}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawerNavbarMenu}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  );
}
NavbarDrawer.propTypes = {
  updateTT: PropTypes.func,
  toggleTheme: PropTypes.func,
};
NavbarDrawer.defaultProps = { updateTT: () => {}, toggleTheme: () => {} };
export default NavbarDrawer;
