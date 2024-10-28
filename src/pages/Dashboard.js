import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import GridView from '@mui/icons-material/GridView';
import PendingActions from '@mui/icons-material/PendingActions';
import Medication from '@mui/icons-material/Medication'
import GroupsIcon from '@mui/icons-material/Groups';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

///

import Home from './Home';
import Requests from './Requests';
import AcceptedAppointments from './Appointment';

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const [portalState, setPortalState] = React.useState('home');

  // Check if user is a superuser
  const isSuperuser = localStorage.getItem('isSuperuser') === 'true';

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isSuperuser');
    navigate('/login'); // Redirect to login page
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Home', 'Requests', 'Appointments', 'Patients'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setPortalState(text.toLowerCase())} >
              <ListItemIcon>
                {index === 0 && (<GridView/>)}
                {index === 1 && <PendingActions/>}
                {index === 2 && <Medication/>}
                {index === 3 && <GroupsIcon/>}

              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Reports', 'Settings', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={text === 'Logout' ? handleLogout : null}>
              <ListItemIcon>
                {index === 0 && <AnalyticsIcon/>}
                {index === 1 && <SettingsIcon/>}
                {index === 2 && <LoginIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            VitalLink Doctor Portal
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 'auto' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/*  */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        {isSuperuser && (
          <Typography variant="body1" color="primary" gutterBottom>
            Superuser Access: You have additional permissions.
            {portalState === 'home' && (
                <Home/>
            )}
            {portalState === 'requests' && (
                <Requests/>
            )}
            {portalState === 'appointments' && (
                <AcceptedAppointments/>
            )}
            
          </Typography>
        )}
        {!isSuperuser && (
            <>
                {portalState === 'home' && (
                    <Home/>
                )}
                {portalState === 'requests' && (
                    <Requests/>
                )}
                {portalState === 'appointments' && (
                <AcceptedAppointments/>
                )}
            </>

        )}

        <Typography>{portalState}</Typography>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
