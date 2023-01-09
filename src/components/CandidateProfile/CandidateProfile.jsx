import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormControl, InputLabel, Input, Button, Typography, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './CandidateProfile.css'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    // alignItems: 'center',
    flexDirection: 'column',
  },
});

function CandidateProfile() {

  const classes = useStyles();  // define the classes variable

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    LinkedIn: '',
    ResumePath: '',
    CoverLetterPath: '',
  });


  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const submit = (event) => {
    event.preventDefault();
    console.log("i'm here in submit")
    dispatch({
      type: 'ADD_PROFILE',
      payload: formData
    });
    history.push('/ResumeCoverLetter');
  }


  const handleFormCompletion = () => {

    let button = document.getElementById('populateCandidateProfile');
    let form = document.getElementById('candidateProfile');

    button.addEventListener('click', function () {
      // Set the value of the form fields
      form.firstName.value = "Faduma ";
      form.lastName.value = "Siyad";
      form.email.value = "fsiyad@gmail.com";
      form.linkedin.value = "linkedin.com/faduma-siyad";

      setFormData({

        FirstName: "Faduma",
        LastName: "Siyad",
        Email: "fsiyad@google.com",
        LinkedIn: "linkedin.com/faduma-siyad",

      })

      console.log('This is the formData', formData);
    })
  };

  let value;
  return (
    <>
      <Box className='container'  >
        <Typography onClick={handleFormCompletion} id='populateCandidateProfile' variant="h3" style={{ marginTop: '1em' }}>Personal Information</Typography>
        <Typography variant="h6" style={{ marginTop: '2em' }}>This information will not be shared with the employers until you choose to share</Typography>
        <Typography>Step 1 of 6</Typography>


        <Box sx={{ marginTop: '5em' }} className="Profile">
          <form id='candidateProfile' className={classes.form} onSubmit={submit}>
            <Box>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <FormControl>
                <TextField
                  className='textField'
                  style={{ width: '30em', marginBottom: '2em' }}
                  id="firstName"
                  name='FirstName'
                  required
                  onChange={event => handleFormChange(event)}
                  value={value}
                />
              </FormControl>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <FormControl>

                <TextField
                className='textField'
                  style={{ width: '30em', marginBottom: '2em' }}
                  id="lastName"
                  name='LastName'
                  required
                  onChange={event => handleFormChange(event)}
                  value={value}
                />
              </FormControl>
            </Box>
            <Box>
              <InputLabel htmlFor="email">Email</InputLabel>
              <FormControl>

                <TextField
                className='textField'
                  style={{ width: '30em', marginBottom: '2em' }}
                  id="email"
                  name='Email'
                  required
                  onChange={event => handleFormChange(event)}
                  value={value}
                />
              </FormControl>

              <InputLabel htmlFor="linkedin">LinkedIn</InputLabel>
              <FormControl>
                <TextField
                className='textField'
                  style={{ width: '30em', marginBottom: '2em' }}
                  id="linkedin"
                  name='LinkedIn'
                  onChange={event => handleFormChange(event)}
                  value={value}
                />
              </FormControl>


            </Box>

            <Button className='formButtons' variant="contained" color="primary" type="submit">Next</Button>
          </form>



        </Box>
      </Box>
    </>
  );

}

export default CandidateProfile;