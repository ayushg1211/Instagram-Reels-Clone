import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from "../firebase";

function AddComment({ userData, postData }) {
  const [text, setText] = useState("");

  const handleClick = () => {
    let newStr = text.trim();
    if(newStr.length === 0){
        alert("Empty Comment") ;
    }
    else{
      let obj = {
        text: text,
        uProfileImage: userData.profileUrl,
        uName: userData.fullname,
      };
      database.comments.add(obj).then((doc) => {
        database.posts.doc(postData.postId).update({
          comments: [...postData.comments, doc.id],
        });
      });
      
    }
setText("");
  };
  return (
    <div>
      <TextField
        id="outtlined-basic"
        label="comment"
        variant="outlined"
        size="small"
        sx={{ width: "70%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Post
      </Button>
    </div>
  );
}

export default AddComment;
