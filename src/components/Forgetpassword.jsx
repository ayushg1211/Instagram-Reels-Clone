import * as React from 'react';
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Link } from '@mui/material';
import "./Forgetpassword.css"
import forgotpassword from "../Assets/forgotpassword.png"

import { makeStyles } from 'tss-react/mui';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { AuthContext } from '../context/Authcontext';  // context
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link as RouterLink} from  'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Forgetpassword() {
  const store = useContext(AuthContext)  // from context
  // console.log(store) ;
  const useStyles = makeStyles()({
    text1:{
        color:'grey',
        textAlign:'center',
        fontSize: "1.2rem"
        
    },
    text2:{
      textAlign : "center"
    },

    text3:{
      color:'black',
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: "1.5rem"
    },
    card2:{
      height : "10vh",
      marginTop : '2%'
    }
})
  const {classes} = useStyles() 
  const [email, setEmail] = useState("") ;
  const [error, setError] = useState(null) ;
  const [loading, setLoading] = useState(false) ;
  const history = useHistory() ;
  const {sendEmail} = useContext(AuthContext) ;  // using this from context
  
  const handleFP = async()=>{
    if(email == ""){
      setError("Please enter correct email") ;
      setTimeout(()=>{
      setError(null)
      },3000)
    return 
    }
    try{
      setError(null);
      setLoading(true)
      await sendEmail(email) ;
      toast.success("Email was sent",{autoClose:3000})
      setLoading(false);
      
      // history.push('/login')
    }catch(err){
      toast.error('Could Not send reset email', {autoClose:3000})
      setTimeout(()=>{
          setError(null)
      },3000);
      setLoading(false);
    }
    setEmail("") ;
  }
  return (
    <>
      <div className="fpWrapper">
        <div className="fpCard">
          <Card variant='outlined'>
            <div className="fp-logo">
              <img src={forgotpassword} alt="" />
            </div>
            <div className="cardContentWrapper">
              <Typography className={classes.text3} variant="subtitle1" >
                    Trouble with logging in?
              </Typography>

              <Typography className={classes.text1} variant="subtitle1" >
                    Enter your email address, phone number or username, and we'll send you a link to get back into your account.
              </Typography>

              <CardContent>
                
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin = "dense" size='medium' value = {email} onChange={(e)=>{setEmail(e.target.value)}} />
              </CardContent>
              
              <CardActions>
                <Button size="medium" color="primary" fullWidth={true} variant="contained" margin="dense" disabled={loading} onClick={handleFP}>
                  Click Here
                </Button>
              </CardActions>

              <CardContent className={classes.card2}>
                  <Typography className={classes.text1} variant="subtitle1" >
                    Don't have an account? <Link component={RouterLink} to="/signup" style={{textDecoration : "none"}}>Sign up</Link>
                  </Typography>

                  <Typography className={classes.text1} variant="subtitle1" >
                    <Link component={RouterLink} to="/login" style={{textDecoration : "none"}}>Back to Log In</Link>
                  </Typography>
              </CardContent> 
            </div>  
          </Card>
        </div>
      </div>
    </>
  )
}

export default Forgetpassword