import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom';
function Video(props) {
    const handleMute= (e) =>{
        e.preventDefault() ;
        e.target.muted = !e.target.muted ;
    }

    const handleScroll = (e) =>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling ;
        if(next){
            next.scrollIntoView() ;  // DOM ki property
            e.target.muted = true ;
        }
    }
  return (
    <video src = {props.src} onEnded={handleScroll} id={props.id} className="videos-styling" muted="muted" onClick={handleMute}>
    </video>
  )
}

export default Video