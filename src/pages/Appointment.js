import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Card, CardContent, CardActions, Grid, Modal, Box, Divider, CardMedia } from '@mui/material';

const AcceptedAppointments = () => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [doctorId, setDoctorId] = useState('671e15ea9175d226d51e1047');
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAcceptedAppointments = async () => {
    try {
      const response = await fetch(`https://appoftheyear-439917.nw.r.appspot.com/doctor/get_accepted_appointments/${doctorId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch accepted appointments');
      }

      const data = await response.json();
      setAcceptedAppointments(data.appointments || []);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching accepted appointments:', error);
    }
  };

  const requestMedicalDocuments = async (patientId) => {
    try {
      const response = await fetch(`http://appoftheyear-439917.nw.r.appspot.com/doctor/medical_record/${patientId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch medical record');
      }

      const data = await response.json();
      setMedicalRecord(data.record);
      setModalOpen(true);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching medical record:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setMedicalRecord(null);
  };

  useEffect(() => {
    fetchAcceptedAppointments();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }} textAlign={'center'}>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h5" gutterBottom>
        Accepted Appointments
      </Typography>
      {acceptedAppointments.length === 0 ? (
        <Typography>Waiting to for your accepted payments, this may take a few seconds.</Typography>
      ) : (
        <Grid container spacing={2} style={{justifyContent:'center', alignItems:'center'}}>
          {acceptedAppointments.map((appointment) => (
            <Grid item xs={20} sm={10} md={10} key={appointment.patient_id}>
              <Card raised={true} style={{textAlign:"center"}}>

                <CardMedia sx={{ height: 140 }} image="https://t4.ftcdn.net/jpg/08/54/85/41/240_F_854854118_WTqOEfHVipk2PYT4Xo4oGC2y1Hs4AwUh.jpg" />
                
                <CardContent>
                  <Typography variant="h6">{appointment.patient_name}</Typography>
                  <Typography variant="body2">Reason for Visit: {appointment.reason_for_visit}</Typography>
                  <Divider/>
                  <Typography variant="body2">Appointment Date: {appointment.date_requested}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => requestMedicalDocuments(appointment.patient_id)}>
                    Request Medical Documents
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography variant="h6" component="h2">
            Medical Record
          </Typography>
          <Typography sx={{ mt: 2 }}>{medicalRecord || "No record available."}</Typography>
          <Button variant="outlined" onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default AcceptedAppointments;
