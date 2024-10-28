// import React, { useState } from 'react';
// import {
//   Paper,
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Drawer,
//   Box,
//   Avatar,
//   Stack,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';

// // Sample data for appointments
// const appointments = [
//   { name: 'Buhle Nkosi', age: 42, gender: 'Female', bmi: 21, date: 'Feb 19, 2024', time: '08:30 am - 09:00 am', doctor: 'Dr. Xolisi Dlamini', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
//   { name: 'Susane Naidoo', age: 35, gender: 'Female', bmi: 23, date: 'Mar 5, 2024', time: '10:00 am - 10:30 am', doctor: 'Dr. John Doe', notes: 'Notes for Susane Naidoo.' },
//   { name: 'Alice Greene', age: 29, gender: 'Female', bmi: 20, date: 'Apr 12, 2024', time: '01:00 pm - 01:30 pm', doctor: 'Dr. Jane Smith', notes: 'Notes for Alice Greene.' },
//   { name: 'Boitumelo Gumede', age: 48, gender: 'Male', bmi: 27, date: 'May 19, 2024', time: '11:30 am - 12:00 pm', doctor: 'Dr. Sarah Lee', notes: 'Notes for Boitumelo Gumede.' }
// ];



// const AppointmentDrawer = ({ selectedAppointment, onClose }) => {

//   const confirmAppointment = async ({patient_id}) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000//doctor/appointments/${patient_id}/accept`, {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });


//       const data = await response.json();

      

//       if (response.ok) {
//         console.log('response:',response);
        
//       } else {
//         setError(data.message || 'wrong.');
//       }
//     } catch (error) {
//       setError('Failed to Confirm. Please try again later.');
//       console.error('Error:', error);
//     }
//   }

//   return (

//   <Drawer anchor="right" open={Boolean(selectedAppointment)} onClose={onClose}>
//     <Box sx={{ width: 300, p: 2 }}>
//       <Stack alignItems="center" spacing={1}>
//         <Avatar sx={{ width: 80, height: 80 }} src="path/to/profile/image.jpg" alt={selectedAppointment?.name} />
//         <Typography variant="h6">{selectedAppointment?.name}</Typography>
//       </Stack>

//       <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
//         <Box textAlign="center">
//           <Typography variant="body2" color="textSecondary">Age</Typography>
//           <Typography variant="h6">{selectedAppointment?.age}</Typography>
//         </Box>
//         <Box textAlign="center">
//           <Typography variant="body2" color="textSecondary">Gender</Typography>
//           <Typography variant="h6">{selectedAppointment?.gender}</Typography>
//         </Box>
//         <Box textAlign="center">
//           <Typography variant="body2" color="textSecondary">BMI</Typography>
//           <Typography variant="h6">{selectedAppointment?.bmi}</Typography>
//         </Box>
//       </Stack>

//       <Typography variant="subtitle1" sx={{ mt: 3 }}>Appointment Details</Typography>
//       <Divider sx={{ mb: 2 }} />
//       <List disablePadding>
//         <ListItem disableGutters>
//           <ListItemText primary={selectedAppointment?.date} secondary={`${selectedAppointment?.time}`} />
//         </ListItem>
//         <ListItem disableGutters>
//           <Typography variant="body2">{selectedAppointment?.doctor}</Typography>
//         </ListItem>
//       </List>

//       <Typography variant="subtitle2" sx={{ mt: 2 }}>Notes</Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>{selectedAppointment?.notes}</Typography>

//       <Stack direction="row" justifyContent="space-between">
//         <Button variant="contained" color="success" fullWidth sx={{ mr: 1 }} onClick={() => confirmAppointment(selectedAppointment.name)}>
//           Confirm
//         </Button>
//         <Button variant="contained" color="error" fullWidth sx={{ ml: 1 }}>
//           Decline
//         </Button>
//       </Stack>
//     </Box>
//   </Drawer>
//   )
// }

// export default function App() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const handleCardClick = (appointment) => {
//     setSelectedAppointment(appointment);
//     setDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setSelectedAppointment(null);
//   };

//   return (
//     <Paper elevation={3} style={{ alignContent: 'center', justifyContent: 'center' }}>
//       {appointments.map((appointment, index) => (
//         <React.Fragment key={index}>
//           <Card
//             sx={{ maxWidth: '80%' }}
//             style={{ textAlign: 'center', margin: '10% auto', cursor: 'pointer' }}
//             onClick={() => handleCardClick(appointment)}
//           >
//             <CardContent>
//               <Typography variant="h5" component="div">{appointment.name}</Typography>
//             </CardContent>
//             <CardActions>
//               <Button size="small">Share</Button>
//               <Button size="small">Learn More</Button>
//             </CardActions>
//           </Card>
//           {/* <div style={{ height: '15px' }}></div> */}
//         </React.Fragment>
//       ))}
//       <AppointmentDrawer selectedAppointment={selectedAppointment} onClose={handleCloseDrawer} />
//     </Paper>
//   );
// }
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Drawer,
  Box,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

// AppointmentDrawer component
// AppointmentDrawer component
const AppointmentDrawer = ({ selectedAppointment, onClose }) => {
  const confirmAppointment = async () => {
    if (!selectedAppointment) return;

    const { patient_id } = selectedAppointment;

    try {
      const response = await fetch(`http://127.0.0.1:5000/doctor/appointments/${patient_id}/accept`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('response:', data);
        onClose(); // Close drawer on success
      } else {
        console.error(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Failed to Confirm. Please try again later.', error);
    }
  };

  const confirmDecline = async () => {
    if (!selectedAppointment) return;

    const { patient_id } = selectedAppointment;

    try {
      const response = await fetch(`http://127.0.0.1:5000/doctor/appointments/${patient_id}/decline`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Decline response:', data);
        onClose(); // Close drawer on success
      } else {
        console.error(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Failed to Decline. Please try again later.', error);
    }
  };

  return (
    <Drawer anchor="right" open={Boolean(selectedAppointment)} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Stack alignItems="center" spacing={1}>
          <Avatar sx={{ width: 80, height: 80 }} src="path/to/profile/image.jpg" alt={selectedAppointment?.name} />
          <Typography variant="h6">{selectedAppointment?.name}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="textSecondary">Age</Typography>
            <Typography variant="h6">{selectedAppointment?.age}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="textSecondary">Gender</Typography>
            <Typography variant="h6">{selectedAppointment?.gender}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="textSecondary">BMI</Typography>
            <Typography variant="h6">{selectedAppointment?.bmi}</Typography>
          </Box>
        </Stack>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>Appointment Details</Typography>
        <Divider sx={{ mb: 2 }} />
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary={selectedAppointment?.date} secondary={`${selectedAppointment?.time}`} />
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2">{selectedAppointment?.doctor}</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2" color="textSecondary">Reason for Visit:</Typography>
            <Typography variant="body1">{selectedAppointment?.reason_for_visit}</Typography>
          </ListItem>
        </List>

        <Typography variant="subtitle2" sx={{ mt: 2 }}>Notes</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>{selectedAppointment?.notes}</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="success" fullWidth sx={{ mr: 1 }} onClick={confirmAppointment}>
            Confirm
          </Button>
          <Button variant="contained" color="error" fullWidth sx={{ ml: 1 }} onClick={confirmDecline}>
            Decline
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

// Main App component
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [doctorId, setDoctorId] = useState('671e15ea9175d226d51e1047'); // Set this value accordingly

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedAppointment(null);
  };

  // Fetch pending appointments on component mount
  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/doctor/get_pending_appointments/${doctorId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pending appointments');
        }

        const data = await response.json();
        setAppointments(data.appointments || []); // Use the fetched appointments
      } catch (error) {
        setError(error.message);
        console.error('Error fetching pending appointments:', error);
      }
    };

    fetchPendingAppointments();
  }, [doctorId]); // Add doctorId as a dependency if it can change

  return (
    <Paper elevation={3} style={{ alignContent: 'center', justifyContent: 'center' }}>
      {error && <Typography color="error">{error}</Typography>} {/* Show error if any */}
      {appointments.length === 0 ? (
        <Typography>No pending appointments found.</Typography>
      ) : (
        appointments.map((appointment, index) => (
          <React.Fragment key={index}>
            <Card
              sx={{ maxWidth: '80%' }}
              style={{ textAlign: 'center', margin: '10% auto', cursor: 'pointer' }}
              onClick={() => handleCardClick(appointment)}
            >
              <CardContent>
                <Typography variant="h5" component="div">{appointment.patient_name}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </React.Fragment>
        ))
      )}
      <AppointmentDrawer selectedAppointment={selectedAppointment} onClose={handleCloseDrawer} />
    </Paper>
  );
}
