import React, {useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid' ;
import {storage, database} from '../firebase'

function Uploadfile(props) { // 'props' is userData obj added to "UploadFile" component from "feed" component.
    const [error, setError] = useState(null) ;
    const [loading, setLoading] = useState(false) ;

    const handleChange = async(file)=>{  // data store karwana hai database me toh 'async' function hoga
        // got 'file' from input.
        if(file == null){
            setError("Please select a file to upload") ;
            setTimeout(()=>{
                setError(null)
            }, 3000)
            return
        }
        if(file.size/(1024*1024)> 100){
            setError("File size is more than 100mb")
            setTimeout(()=>{
                setError(null)
            }, 3000)
            return
        }

        let uid = uuidv4() ;
        setLoading(true) ;
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed',fn1,fn2,fn3);
        // ye progress ko dekhega
        function fn1(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            // console.log(`Upload is ${progress} done.`)
        }
        // ye error ko dekhega
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
            return;
        }
        // ye success dekhega
        function fn3(){
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                // console.log(url);
                let obj = {
                    likes : [],
                    comments : [],
                    pId : uid,  // post id
                    pUrl : url,
                    uName : props.user.fullname , // user name
                    uProfile : props.user.profileUrl,
                    userId : props.user.userId,
                    createdAt : database.getTimeStamp()
                }
                database.posts.add(obj).then(async(ref)=>{
                    let res= await database.users.doc(props.user.userId).update({
                        postIds : props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(()=>{
                    setLoading(false)
                }).catch((err)=>{
                    setError(err)
                    setTimeout(()=>{
                        setError(null)
                    },3000)
                    setLoading(false) ;
                })
            })
            // setLoading(false);
        }
    }
  return (
    <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
        {
            error != null ?<Alert severity="error">{error}</Alert> :
            <>
                <input id='upload-input' type= "file" accept='video/x-matroska, video/*' style={{display : "none"}} onChange={(e)=>handleChange(e.target.files[0])}/> {/* using current selected file in 'handleChange' function */}
                <label htmlFor="upload-input">
                    <Button variant='outlined' color="secondary" disabled={loading} component="span">
                       <MovieIcon/>&nbsp; Upload File
                    </Button>
                </label>
                {loading && <LinearProgress color="secondary" style={{marginTop : "3%"}} />}
            </>
        }
    </div>
  )
}

export default Uploadfile