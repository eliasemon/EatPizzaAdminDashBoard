import { useState } from 'react';
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
import { httpsCallable } from "firebase/functions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, functions } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { showLoading , closeLoading } from '../components/loading/loading';


const Login = () => {
  // const [isReg, setIsReg] = useState(false)
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


  //  //super user fun start
  //  const [superkey, setSetSuperkey] = useState({
  //   amount: '',
  //   password: '',
  //   weight: '',
  //   weightRange: '',
  //   showPassword: false,
  // });

  // const handelSuperUserskey = (prop) => (event) => {
  //   setSetSuperkey({ ...superkey, [prop]: event.target.value });
  // };

  // const handleClickShowSuperUserKey = () => {
  //   setSetSuperkey({
  //     ...superkey,
  //     showPassword: !superkey.showPassword,
  //   });
  // };

//super user fun end



 

  const handleSubmit = async(event) => {
    
    event.preventDefault();
    // if(isReg){
    //   if(!superkey.password || !email || !values.password){
    //     toast.error("Empty Field is Required")
    //     return
    //   }
    //   showLoading()
    //   const MakeAdminBySuperUser = httpsCallable(functions , 'makeUserAdmin')
    //   const data = {}
    //   data.superAdminKey = superkey.password
    //   data.email = email
    //   data.password = values.password
    //   try {
    //     await MakeAdminBySuperUser().catch((error)=>{
    //       console.log(error)
    //     })
      
    //     toast.success("User Registration Successful , Please Log in")
    //     closeLoading()
    //     setIsReg(false)
    //   } catch (error) {
    //     console.log(error);
    //     closeLoading()
    //     toast.error("SomeThings Went Worng. Please Input Valid data")
    //   }
      
    //   return
    // }

    if(!email || !values.password){
      closeLoading()
      toast.error("Empty Field is Required")
      return
    }
    showLoading()
    signInWithEmailAndPassword(auth, email, values.password)
      .then((userCredential) => {
        closeLoading()
        setEmail("")
        setValues({
          ...values,
          password: '',
          showPassword: false,
        });
      })
      .catch((error) => {
        closeLoading()
        toast.error("LogIn Faild. Please Provide Valid Information");
      });
  }

  

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
      <LogoContainer />
      <Box component="form" sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
          <InputLabel style={{ color: 'whitesmoke' }} htmlFor="input-with-icon-adornment">
            Email
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            style={{ color: 'whitesmoke' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* {isReg && (
          <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
            <InputLabel style={{ color: 'whitesmoke' }} htmlFor="standard-adornment-password"> Super User's Key </InputLabel>
            <Input style={{ color: 'whitesmoke' }}
              id="standard-adornment-password"
              type={superkey.showPassword ? 'text' : 'password'}
              value={superkey.password}
              onChange={handelSuperUserskey('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: 'whitesmoke' }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowSuperUserKey}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {superkey.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

        )} */}






        <Button onClick={handleSubmit} sx={{ mt: 2, width: 30 }} variant="contained" size="midium">
          Submit
        </Button>

        {/* {isReg ? (<Button onClick={() => setIsReg(false)} sx={{ mt: 2, width: 30 }} variant="contained" size="midium">
          Login In
        </Button>) : (<Button onClick={() => setIsReg(true)} sx={{ mt: 2, width: 30 }} variant="contained" size="midium">
          Sign Up By Super User
        </Button>)} */}
      </Box>
    </Box>

  );
}

export default Login;