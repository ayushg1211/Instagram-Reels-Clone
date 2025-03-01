import * as React from 'react';
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Link } from '@mui/material';
import "./Login.css"
import insta from "../Assets/insta1.png"
import bg from '../Assets/instaSlider.png'
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import { makeStyles } from 'tss-react/mui';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { AuthContext } from '../context/Authcontext';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link as RouterLink} from  'react-router-dom';



export default function Login() {
  const store = useContext(AuthContext)
  // console.log(store) ;
  const useStyles = makeStyles()({
    text1:{
        color:'grey',
        textAlign:'center'
    },
    text2:{
      textAlign : "center"
    },
    card2:{
      height : "max-content",
      marginTop : '2%'
    }
})
const {classes} = useStyles() 
const [email, setEmail] = useState("") ;
const [password, setPassword] = useState("") ;
const [error, setError] = useState(null) ;
const [loading, setLoading] = useState(false) ;
const history = useHistory() ;
const {logIn} = useContext(AuthContext) ;
const handleLogin = async()=>{
  if(email=="" || password==""){
    setError("Please enter correct email and password") ;
    setTimeout(()=>{
      setError(null)
    },3000)
    return 
   }
  try{
    setError(null);
    setLoading(true)
    let res = await logIn(email,password);
    setLoading(false);
    history.push('/')
}catch(err){
  
    setError("Incorrect Email or Password");
    setTimeout(()=>{
        setError(null)
    },3000);
    setLoading(false);
}
}
  return (
    <div className="loginWrapper">
      <div className="imgCard" style={{backgroundImage : 'url('+bg+')', backgroundSize : 'cover'}}>
        <div className="card">
        <CarouselProvider 
          visibleSlides={1}
          totalSlides={5}
          // step={3}
          naturalSlideWidth={238}
          naturalSlideHeight={423}
          hasMasterSpinner
          isPlaying={true}
          infinite={true}
          dragEnabled={false}
          touchEnabled={false}
        >
        <Slider>
            <Slide index={0}><Image src={img1}/></Slide>
            <Slide index={1}><Image src={img2}/></Slide>
            <Slide index={2}><Image src={img3}/></Slide>
            <Slide index={3}><Image src={img4}/></Slide>
            <Slide index={4}><Image src={img5}/></Slide>
        </Slider>
      </CarouselProvider>
        </div>
      </div>
      <div className="loginCard">
        <Card variant='outlined'>
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
            <CardContent>
              {error != null && <Alert severity="error">{error}</Alert>} {/* Alert */ }
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin = "dense" size='small' value = {email} onChange={(e)=>{setEmail(e.target.value)}} />
              <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin = "dense" size='small' value = {password} onChange={(e)=>{setPassword(e.target.value)}}/>

              <Typography className={classes.text1} variant="subtitle1">
                 <Link component={RouterLink} to="/forgetpassword" style={{textDecoration : "none"}} >Forget Password ?</Link>
              </Typography>
            </CardContent>
          
          <CardActions>
            <Button size="medium" color="primary" fullWidth={true} variant="contained" margin="dense" onClick={handleLogin} disabled={loading}>
              Log in
            </Button>
          </CardActions>
        </Card>

        <Card variant='outlined' className={classes.card2}>
        <CardContent>
              <Typography className={classes.text1} variant="subtitle1" >
                Don't have an account? <Link component={RouterLink} to="/signup" style={{textDecoration : "none"}}>Sign up</Link>
              </Typography>
            </CardContent>        
        </Card>
      </div>
    </div>

  );
}
