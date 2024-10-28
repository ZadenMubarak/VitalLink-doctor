// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
// import GridView from '@mui/icons-material/GridView';
// import PendingActions from '@mui/icons-material/PendingActions';
// import Medication from '@mui/icons-material/Medication'
// import GroupsIcon from '@mui/icons-material/Groups';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
// import SettingsIcon from '@mui/icons-material/Settings';
// import Toolbar from '@mui/material/Toolbar';
// import LoginIcon from '@mui/icons-material/Login';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';


// const Home = () => {
//   return (
//     <Box>
//         <AppBar position="static">
//             <Toolbar>
//                 <Typography>Home shoot</Typography>
//             </Toolbar>
//         </AppBar>
//     </Box>
//   )
// }

// export default Home

import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Container,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const appointments = [
  { time: '09:15 - 09:45', title: 'Thandeka Ncube Video Check up', color: '#FFE5B4' },
  { time: '09:45 - 10:15', title: 'Bridgette Khumalo Video Check Up', color: '#FFD1DC' },
  { time: '10:30 - 11:00', title: 'David van der Merwe Check Up', color: '#FFE5B4' },
  { time: '11:15 - 11:55', title: 'Katlego Nkosi Physical Examination', color: '#FFE5B4' },
  { time: '12:00 - 12:45', title: 'Lunch with Dr Lin', color: '#FFE5B4' },
  { time: '12:45 - 13:00', title: 'Meeting', color: '#D7C7FF' },
  { time: '13:30 - 15:30', title: 'Training with Interns', color: '#FFE5B4' },
];

const Home = () => {
  return (
    <Box>


      {/* Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ mr: 2 }}>February 2024</Typography>
          <Button variant="outlined" startIcon={<CalendarTodayIcon />}>
            Schedule
          </Button>
        </Box>

        <Paper elevation={2} sx={{ padding: -2, width:'110%' }}>
          <List>
            {appointments.map((appointment, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{
                  backgroundColor: appointment.color,
                  borderRadius: 2,
                  mb: 1,
                  width:'90%'
                }}>
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="body2" color="textSecondary">
                        {appointment.time}
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body1">
                        {appointment.title}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {index < appointments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
