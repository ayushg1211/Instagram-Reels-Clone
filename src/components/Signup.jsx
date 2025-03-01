import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Link, CardActionArea } from '@mui/material';
import "./Signup.css"
import insta from "../Assets/insta1.png"
import { makeStyles } from 'tss-react/mui';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import { database, storage } from '../firebase';
import { Link as RouterLink } from 'react-router-dom';




export default function Signup() {
  const useStyles = makeStyles()({
    text1:{
        color:'grey',
        textAlign:'center'
    },
    card2:{
      height : "fit-content",
      marginTop : '2%'
    }
})
const {classes} = useStyles() 
const [email, setEmail] = useState("") ;
const [password, setPassword] = useState("") ;
const [name, setName] = useState("") ;
const [file, setFile] = useState(null) ;
const [error, setError] = useState("") ;
const [loading, setLoading] = useState(false) ;
const history = useHistory()  // imported from react router dom
const {signUp} = useContext(AuthContext) ;

const handleClick = async()=>{
   if(file==null){
    setError("Please add your profile image.") ;
    setTimeout(()=>{
      setError("")
    },3000)
    return 
   }
   try{
    setError('')
    setLoading(true)
    let userObj = await signUp(email,password)
    let uid = userObj.user.uid
    const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
    uploadTask.on('state_changed',fn1,fn2,fn3);
    function fn1(snapshot){
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        // console.log(`Upload is ${progress} done.`)
    }
    function fn2(error){
        setError(error);
        setTimeout(()=>{
            setError('')
        },2000);
        setLoading(false)
        return;
    }
    function fn3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            // console.log(url);
            database.users.doc(uid).set({
                email:email,
                userId:uid,
                fullname:name,
                profileUrl:url,
                createdAt:database.getTimeStamp()
            })
        })
        setLoading(false);
        history.push('/')
    }
}catch(err){
    setError(err);
    setTimeout(()=>{
        setError('')
    },2000)
}

   
}
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant='outlined'>
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
            <CardContent>
              <Typography className={classes.text1} variant="subtitle1" >
                Signup to see photos and videos from your friends
              </Typography>
              {error != "" && <Alert severity="error">{error}</Alert>} {/* Alert */ }
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin = "dense" value = {email} onChange={(e)=> setEmail(e.target.value)}/>
              <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin = "dense" value = {password} onChange={(e)=> setPassword(e.target.value)}/>
              <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin = "dense" value = {name} onChange={(e)=> setName(e.target.value)}/>
              <Button color='secondary' fullWidth={true} margin= "dense" variant='outlined' startIcon={<CloudUploadIcon fontSize="small"/>} component="label">
                <input type="file" accept='image/*' hidden onChange={(e)=> setFile(e.target.files[0])} />
                Upload Profile Image
                </Button>
            </CardContent>
          
          <CardActions>
            <Button size="medium" color="primary" fullWidth={true} variant="contained" margin="dense" disabled={loading} onClick={handleClick}>
              Signup
            </Button>
          </CardActions>

          <CardContent>
              <Typography className={classes.text1} variant="subtitle1" >
                By signing up, you agree to our Terms, Conditions and Cookies policy
              </Typography>
          </CardContent>
        </Card>

        <Card variant='outlined' className={classes.card2}>
        <CardContent>
              <Typography className={classes.text1} variant="subtitle1" >
                Have an account ? <Link component={RouterLink} to="/login" style={{textDecoration : "none"}}>Log in</Link>
              </Typography>
            </CardContent>
          
        </Card>
      </div>
    </div>

  );
}
