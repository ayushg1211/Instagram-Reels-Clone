import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/Authcontext'
import {database} from '../firebase'
import Navbar from './Navbar';
import Posts from './Posts';
import Uploadfile from './Uploadfile';
function Feed() {
  const {user,logOut} = useContext(AuthContext) ;
  const [userData, setUserData] = useState("") ;
  useEffect(()=>{
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
      })
      return ()=>{unsub()}
  },[user])
  return (
    <>
    {/* {console.log(userData)} */}
      <Navbar userData={userData}/>
      <div style={{display: "flex", justifyContent: "center" , alignItems: "center", flexDirection: 'column'}}>
        {/* <div className="comp" style={{width:"50%"}}>
          <h1>Welcome to feed</h1>
          <button onClick={logOut}>Log Out</button>
        </div>   */}
        
        <Uploadfile user = {userData}/> {/* Adding "user" prop to 'UploadFile' component */}
        <Posts userData = {userData}/>
      </div>
    </>
    
  )
}

export default Feed