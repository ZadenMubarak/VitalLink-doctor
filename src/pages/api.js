// fetch('https://5af0-197-184-183-73.ngrok-free.app/login_doctor',{
//     method: 'POST',
//     body: JSON.stringify({
//         "email": "thabo.mokoena@parktownmedical.co.za",
//         "password": "SecurePassword123!!!"
//     }),
//     headers: {
//         'Content-Type': 'application/json; charset=UTF-8',
//     }
// }).then(response => response.json())
// .then(data => console.log('data:',data))
// .catch(error => console.error('Error:', error));

const requestMedicalDocuments = async (patientId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/doctor/medical_record/${patientId}`, {
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
    //   setError(error.message);
      console.error('Error fetching medical record:', error);
    }
  };

requestMedicalDocuments('671cc602bf1587eb52579f65');
