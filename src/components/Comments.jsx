import React,{useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import {database} from '../firebase'

function Comments({postData}) {
    const [comments,setComments] = useState(null)
    useEffect(()=>{
        let funcn = async ()=>{
            let arr = []
            for(let i=0;i<postData.comments.length;i++){
                let data = await database.comments.doc(postData.comments[i]).get()
                arr.push(data.data())
            }
            setComments(arr)
        }
        funcn()

    },[postData])
    return (
        <div style={{display:"flex", flexDirection:"column-reverse", alignItems:"flex-start"}}>
            {
                comments==null? <CircularProgress/> :
                <>
                {
                    comments.map((comment,index)=>(
                        <div key={index} style={{display:'flex', alignItems:"start"}}>
                            <Avatar  src={comment.uProfileImage} style={{marginTop:"6px"}}/>
                            <p style={{marginLeft:".5rem", fontSize:"14px"}}><span style={{fontWeight:'bold', fontSize:"14px"}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default Comments