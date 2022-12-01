import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../assets/images/logo.png'
import { flexbox } from '@mui/system';
const Login = () => {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

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


  return (
     
    <div  style={{ width:"100vw",height:"100vh",background:'#2B3648',alignItems:'center',color:"#fffff",textAlign:'center'}}>
       <div >
        <img style = {{width:'200px',heigt:'220px'}} src ={Logo} alt = 'brandLogo' />
      </div>
      <Box>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
          <InputLabel style={{ color:'whitesmoke'}} htmlFor="input-with-icon-adornment">
            email
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            style={{ color:'whitesmoke'}}
          />
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
          <InputLabel style={{ color:'whitesmoke'}} htmlFor="standard-adornment-password">Password</InputLabel>
          <Input style={{color:'whitesmoke'}}
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment  position="end">
                <IconButton
                  style={{color:'whitesmoke'}}
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
      </Box>
      <div style={{ marginLeft: "220px" }}>
        <Button variant="contained" size="midium">
          Login
        </Button>
      </div>
    </div>

  );
}

export default Login;