import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { database } from '../firebase'
import { CircularProgress } from '@mui/material';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import Like from './Like' ;
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Like2 from './Like2' ;
import AddComment from './AddComment';
import Comments from './Comments';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import './Profile.css'
// Snapshot use karenge....userData nhi .
// userData props nhi use karenge bcz koi agar do devices se logged in hua 
// aur usne ek device se changes kiye toh doosre vaale devices me vo reflect nhi honge.
function Profile() {
  const {id} = useParams() ;
  const [userData, setUserData] = useState(null) ;
  const [posts, setPosts] = useState(null) ;
  const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

  useEffect(()=>{
    database.users.doc(id).onSnapshot((snap)=>{
        setUserData(snap.data())
    })
},[id])

  useEffect(()=>{
    let funcn = async()=>{
    
      if(userData != null){
        let parr = []
        // console.log(userData?.postIds) ;
        if(userData?.postIds){
        for(let i=0;i<userData.postIds.length;i++){
          let postData = await database.posts.doc(userData.postIds[i]).get()
          parr.push({...postData.data(), postId:postData.id})
        }
        setPosts(parr)
      }
        
        // console.log(parr) ;
      }
    }
    funcn() ; 
  })
  
  return (
    <>
      {
        userData==null ? <CircularProgress/> : 
        <>
          {/* {console.log(userData)} */}
          <Navbar userData={userData}/>
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userData.profileUrl} alt="" />
              </div>
              <div className="info">
                <Typography variant='h5' className='infoText'>
                  Email : {userData.email} 
                </Typography>
                <Typography variant='h6'>
                  Posts : {userData?.postIds?.length || 0} 
                </Typography>
              </div>
            </div>
            <hr style={{marginTop:'3rem', marginBottom:'3rem'}}/>
            <div className="profile-videos">
                { posts==null ? "" : 
                    posts.map((post, index)=>(
                        <React.Fragment key={index}>
                            <div className="videos">
                                <video muted="muted" onClick={()=> handleClickOpen(post.pId)} >
                                    <source src={post.pUrl}/>
                                </video>
                                <Dialog
                                    open={open==post.pId}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    fullWidth = {true}
                                    maxWidth = 'md'
                                >
                                <div className="modal-container">
                                    <div className="video-modal">
                                        <video autoPlay={true} muted="muted" controls>
                                            <source src={post.pUrl}/>
                                        </video>
                                    </div>
                                    <div className="comment-modal" style={{position:'relative'}}>
                                        <Card className='card1' style={{padding:'1rem', maxHeight: '500px', overflowY:"scroll"}}>
                                            <Comments postData={post}/>
                                        </Card>

                                        <Card variant='outlined' className="card2">
                                            <Typography style={{padding:'0.4rem'}}> 
                                                {post.likes.length == 0 ? "" : `Liked by ${post.likes.length} users`}
                                            </Typography>
                                            <div style={{display:'flex'}}>
                                                <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userData} postData={post}/>
                                            </div>
                                        </Card>

                                    </div>
                                </div>
                                </Dialog>
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Profile