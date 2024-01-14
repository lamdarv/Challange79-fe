import React, { useState } from 'react';
import { Dialog, DialogContent, Typography, Link, InputAdornment, IconButton, MenuItem, Box } from '@mui/material';
import { Visibility, VisibilityOff, Close as CloseIcon } from '@mui/icons-material';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomTextField1 } from 'components/text-field/text-field-1';
import { CustomButton1 } from 'components/button/button-1';
import { CustomButton2 } from 'components/button/button-2';
import { TickSquare } from 'iconsax-react';
import { CloseSquare } from 'iconsax-react';
import CustomDatePicker from '../../text-field/date-picker';
import { format } from 'date-fns';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const PasswordValidation = ({ isValid, text }) => {
  const validationColor = isValid ? '#30A952' : '#848484';
  const Icon = isValid ? TickSquare : CloseSquare;
  return (
    <div style={{ display: 'flex', alignItems: 'center', color: validationColor }}>
      <Icon style={{ color: validationColor }} variant="Bold" />
      <span style={{ marginLeft: '5px' }}>{text}</span>
    </div>
  );
};

const RegisterPopup = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '',
    clientPosition: '',
    agencyName: '',
    agencyAddress: '',
  });

  const [password, setPassword] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    oneLetterOneNumber: false,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('Male');

  //Untuk mengecek length yang exceed
  const [inputValue, setInputValue] = useState('');
  const [isLengthExceededFirstName, setIsLengthExceededFirstName] = useState(false);
  const [isLengthExceededLastName, setIsLengthExceededLastName] = useState(false);
  const [isLengthExceededEmail, setIsLengthExceededEmail] = useState(false);
  const [isLengthExceededPassword, setIsLengthExceededPassword] = useState(false);
  const [isLengthExceededConfirmPassword, setIsLengthExceededConfirmPassword] = useState(false);
  const [isLengthExceededAgencyName, setIsLengthExceededAgencyName] = useState(false);
  const [isLengthExceededAgencyAddress, setIsLengthExceededAgencyAddress] = useState(false);

  //Untuk mengecek length yang kosong
  const requiredFields = [
    { name: 'firstName', message: 'Kolom name tidak boleh kosong' },
    { name: 'lastName', message: 'Kolom name tidak boleh kosong' },
    { name: 'email', message: 'Kolom email tidak boleh kosong' },
    { name: 'password', message: 'Kolom password tidak boleh kosong' },
    { name: 'confirmPassword', message: 'Kolom password ulang tidak boleh kosong' },
    { name: 'dateOfBirth', message: 'Kolom tanggal lahir tidak boleh kosong' },
    { name: 'clientPosition', message: 'Kolom posisi tidak boleh kosong'},
    { name: 'agencyName', message: 'Kolom nama agensi tidak boleh kosong'},
    { name: 'agencyAddress', message: 'Kolom alamat agensi tidak boleh kosong'}
  ];

  const [errors, setErrors] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError : '',
    genderError: '',
    dateOfBirthError: '',
    clientPositionError: '',
    agencyNameError: '',
    agencyAddressError: '', 
  });

  const [emailExist, setEmailExist] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateLength = (name, value, setLengthExceeded) => {
    setInputValue(value);

    if (name === 'agencyAddress') {
      if (value.length > 255) {
        setLengthExceeded(true);
      } else {
        setLengthExceeded(false);
      }
    } else if (name === 'confirmPassword') {
      if (value.length > 50) {
        setLengthExceeded(true);
      } else {
        setLengthExceeded(false);
      }
    } else {
      if (value.length > 100 ){
        setLengthExceeded(true); 
      } else {
        setLengthExceeded(false);
      }
    }
  };
  //   let hasError = false;
  
  //   requiredFields.forEach((field) => {
  //     const {name, message} = field;

  //     if (!credentials[name]) {
  //       // Set pesan kesalahan sesuai pesan yang telah ditetapkan
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         [`${name}Error`]: message,
  //       }));
  //       hasError = true;
  //     } else {
  //       // Reset pesan kesalahan jika field sudah diisi
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         [`${name}Error`]: '',
  //       }));
  //     }
  //   });
  
  //   return hasError;
  // };

  const validateRequiredFields = () => {
    let hasError = false;
    let newErrors = {};

    requiredFields.forEach((field) => {
      const {name, message} = field;
      if (!credentials[name]) {
        // console.log(credentials[name]);
        newErrors[`${name}Error`] = message;
        hasError = true;
      } else {
        newErrors[`${name}Error`] = '';
      }
    });
  
    setErrors(newErrors);
    // console.log(newErrors);
    return hasError;
};

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));

    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
    validatePassword(name === 'password' ? value : password, name === 'confirmPassword' ? value : confirmPassword);

    if (name === 'firstName') {
      validateLength(name, value, setIsLengthExceededFirstName);
    }

    if (name === 'lastName') {
      validateLength(name, value, setIsLengthExceededLastName);
    }

    if (name === 'email') {
      validateLength(name, value, setIsLengthExceededEmail);
    }

    if (name === 'password') {
      validateLength(name, value, setIsLengthExceededPassword);
    }

    if (name === 'confirmPassword') {
      validateLength(name, value, setIsLengthExceededConfirmPassword);
    }

    if (name === 'agencyName') {
      validateLength(name, value, setIsLengthExceededAgencyName);
    }

    if (name === 'agencyAddress') {
      validateLength(name, value, setIsLengthExceededAgencyAddress);
    }
  };

  const validatePassword = (newPassword, newConfirmPassword) => {
    const minLength = newPassword.length >= 8;
    const oneLetterOneNumber = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(newPassword);
    const passwordsMatch = newPassword === newConfirmPassword;

    setPasswordValidations({
      minLength,
      oneLetterOneNumber,
      passwordsMatch,
    });
  };

  // Call validatePassword for confirmPassword as well to ensure both fields are validated
  // const handleConfirmPasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setConfirmPassword(value);
  //   validatePassword(password, value);
  //   // validateLength(name, value, setIsLengthExceededConfirmPassword)
  //   if (name === 'confirmPassword') {
  //     validateLength(name, value, setIsLengthExceededConfirmPassword);
  //   }
  // };

  const handleGenderChange = (event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      gender: event.target.value,
    }));
  };

  const handleBirthOfDate = (event) => {
    // The event here should be the standard event coming from a `TextField` change
    const newDate = event.target.value; // This should already be in "YYYY-MM-DD" format

    console.log('New date of birth:', newDate);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      dateOfBirth: newDate, // Store the date string directly
    }));
  };

  const handleClientPosition = (event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      clientPosition: event.target.value,
    }));
  };

  const handleEmailExist = () => {
    setEmailExist(true);
  }

  const handleSuccessRegister = () => {
    setRegisterSuccess(true);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEmailExist(false);
    setRegisterSuccess(false);
  }

  const Overlay = () => (
    <Box
      onClick={handleCloseAlert}
      sx={{
        position: 'fixed', // Fixed position to cover the whole screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        zIndex: (theme) => theme.zIndex.drawer - 1, // Below the Snackbar but above other content
        cursor: 'pointer',
      }}
    />
  );

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const hasRequiredFieldError = validateRequiredFields();

    if (hasRequiredFieldError) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/user-management/users/register', {
        ...credentials,
        dateOfBirth: format(new Date(credentials.dateOfBirth), "yyyy-MM-dd'T'HH:mm:ss"),
        clientPositionName: credentials.clientPosition,
      });

      console.log('Registration successful:', response.data);
      localStorage.setItem('role_id', "36532858-6831-46d5-9d56-2e077f566d7c");
      handleSuccessRegister(true);
      
    } catch (error) {
      if (error.response.data === "Email already exists") {
        console.error('Email is already registered:', error.response.data);
        handleEmailExist(true);
      } else {
        console.error('Error during registration:', error);
      }
      
    }
  };

  return (
    <div>
      {/* Email Exist */}
      {emailExist && <Overlay />}
      {registerSuccess && <Overlay />}
      <Snackbar
          open={emailExist}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            top: { xs: 0, sm: 56 },
          }}
        >
        <Alert severity="error" sx={{ width: '100%', boxShadow: 6, backgroundColor: '#CF1D1D', color: '#FDFDFD' }} icon={false}>
          Email sudah digunakan.
        </Alert>
      </Snackbar>

      {/* Register Success */}
      <Snackbar
          open={registerSuccess}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            top: { xs: 0, sm: 56 },
          }}
        >
        <Alert severity="error" sx={{ width: '100%', boxShadow: 6, backgroundColor: '#30A952', color: '#FDFDFD' }} icon={false}>
          Berhasil mendaftarkan user.
        </Alert>
      </Snackbar>
      
      <Dialog open={open} onClose={onClose}>
        <DialogContent sx={{ backgroundColor: '#FDFDFD', borderRadius: '10px' }}>
          <IconButton onClick={onClose} style={{ position: 'absolute', top: 0, right: '2%', color: '#212121' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" align="center" gutterBottom sx={{ color: '#212121', fontFamily: 'Poppins', fontWeight: 700 }}>
            Register
          </Typography>
          <Typography variant="body2" align="center" gutterBottom sx={{ color: '#848484', fontFamily: 'Inter', fontWeight: 400 }}>
            Register so you can choose and request our talent
          </Typography>
          <form onSubmit={handleSubmitRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField1
                  autoFocus
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleChangeRegister}
                />
                {isLengthExceededFirstName && <span style={{ color: '#CF1D1D' }}>Panjang kolom ini tidak boleh lebih dari 100</span>}
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.firstNameError}</span>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField1
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleChangeRegister}
                />
                {isLengthExceededLastName && <span style={{ color: '#CF1D1D' }}>Panjang kolom ini tidak boleh lebih dari 100</span>}
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.lastNameError}</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField1
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  onChange={handleChangeRegister}
                />
                {isLengthExceededEmail && <span style={{ color: '#CF1D1D' }}>Panjang kolom ini tidak boleh lebih dari 100</span>}
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.emailError}</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField1
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={handleChangeRegister}
                  sx={{
                    mb: 2,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: '#848484' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {isLengthExceededPassword && <span style={{ color: '#CF1D1D' }}>Panjang kolom ini tidak boleh lebih dari 50</span>}
                <div style={{marginBottom: '1rem'}}>
                 <span style={{ color: 'red' }}>{errors.passwordError}</span>
                </div>
                <PasswordValidation isValid={passwordValidations.minLength} text="Password is at least 8 characters long" />
                <PasswordValidation isValid={passwordValidations.oneLetterOneNumber} text="Password contains at least one letter and one number" />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField1
                  margin="dense"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Type in your password again"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  variant="outlined"
                  value={confirmPassword}
                  onChange={handleChangeRegister}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: '#848484' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {isLengthExceededConfirmPassword && <span style={{ color: '#CF1D1D' }}>Panjang kolom ini tidak boleh lebih dari 50</span>}
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.confirmPasswordError}</span>
                </div>
                <PasswordValidation isValid={passwordValidations.passwordsMatch} text="Passwords match" />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ color: '#848484', fontFamily: 'Inter', fontWeight: 400 }}>
                    Gender
                  </FormLabel>
                  <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
                    <FormControlLabel
                      value="Male"
                      control={<Radio sx={{ color: '#848484' }} />}
                      label="Male"
                      sx={{ color: '#848484', fontFamily: 'Inter', fontWeight: 400 }}
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio sx={{ color: '#848484' }} />}
                      label="Female"
                      sx={{ color: '#848484', fontFamily: 'Inter', fontWeight: 400 }}
                    />
                  </RadioGroup>
                </FormControl>
                <span style={{ color: 'red' }}>{errors.genderError}</span>
              </Grid>
              <Grid item xs={12}>
                <CustomDatePicker label="Date of Birth" value={credentials.dateOfBirth} onChange={handleBirthOfDate} />
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.dateOfBirthError}</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField1
                  select
                  label="Client Position"
                  value={credentials.clientPosition}
                  onChange={handleClientPosition}
                  fullWidth
                  variant="outlined"
                >
                  {['Human Resource'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </CustomTextField1>
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.clientPositionError}</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField1
                  margin="dense"
                  id="agencyName"
                  name="agencyName"
                  label="Agency Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleChangeRegister}
                />
                {isLengthExceededAgencyName && <span style={{ color: '#CF1D1D' }}>Panjang kolom ini tidak boleh lebih dari 100</span>}
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.agencyNameError}</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField1
                  margin="dense"
                  id="agencyAddress"
                  name="agencyAddress"
                  label="Agency Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={handleChangeRegister}
                />
                {isLengthExceededAgencyAddress && <span style={{ color: '#CF1D1D' }}>Panjang kolom ini tidak boleh lebih dari 255</span>}
                <div style={{marginTop: '0.5rem'}}>
                 <span style={{ color: 'red' }}>{errors.agencyAddressError}</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CustomButton1 fullWidth variant="contained" type="Submit">
                  Register
                </CustomButton1>
              </Grid>
            </Grid>
          </form>

          <hr style={{ borderColor: '#DBDBDB' }} />

          <CustomButton2 fullWidth variant="outlined" startIcon={<GoogleIcon style={{ color: '#848484', height: '15px' }} />}>
            Continue with Google
          </CustomButton2>
          <Typography variant="body2" align="center" sx={{ mt: 2, color: '#212121', fontFamily: 'Inter', fontWeight: 400 }}>
            Already have an Account?{' '}
            <Link href="#" onClick={onClose} sx={{ color: '#2C8AD3', textDecoration: 'none' }}>
              Sign In Here
            </Link>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterPopup;
