import {useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LogoContainer from '../components/logoContainer';

import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';



const Login = () => {
  
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [email, setEmail] = useState("");


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, values.password)
    .then((userCredential) => {
      console.log(userCredential)
      setEmail("")
      setValues({
        ...values,
        password : '',
        showPassword: false,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }


  return (
    <Box sx={{height : "100vh" , display : "flex" , flexDirection : "column" ,  alignItems: "center" ,  justifyContent : "center" }} >
      <LogoContainer  />
      <Box component="form" sx={{ mt : 10, display : "flex" , flexDirection : "column" , alignItems : "flex-end"}}>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
          <InputLabel style={{ color: 'whitesmoke' }} htmlFor="input-with-icon-adornment">
            Email
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            style={{ color: 'whitesmoke' }}
            value ={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
          <InputLabel style={{ color: 'whitesmoke' }} htmlFor="standard-adornment-password">Password</InputLabel>
          <Input style={{ color: 'whitesmoke' }}
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{ color: 'whitesmoke' }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={handleSubmit} sx={{mt : 2 , width : 30}} variant="contained" size="midium">
          Login
        </Button>
      </Box>
    </Box>

  );
}

export default Login;