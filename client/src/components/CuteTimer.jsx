import React from "react";
import { redA200, grey300 } from "material-ui/styles/colors";

import styles from "./CuteTimer.css";

function Tomato(props) {
  let animationStyle = {};
  if(props.running) {
    animationStyle = { animation: `dash ${props.time}s linear forwards` }
  } else if(props.finish) {
    animationStyle = { animation: "dash 1s linear forwards" }
  }
  if(props.paused) {
    animationStyle.animationPlayState = "paused"
  } else {
    animationStyle.animationPlayState = "running"
  }
  return(
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512" height="210px" width="200px" key="foo">
      <path 
      stroke={grey300} strokeWidth="2px" fill="none" d="M412.77,81.345c-22.575-18.958-48.1-22.958-69.287-23.413L359.938,14.9c1.588-4.157,0.511-8.863-2.73-11.914,c-3.239-3.052-8.001-3.844-12.056-2.007l-89.148,40.398L166.857,0.979c-4.056-1.836-8.816-1.044-12.056,2.007,c-3.241,3.051-4.318,7.757-2.73,11.914l16.298,42.627c-20.672,0.378-45.42,4.239-67.485,22.44,c-56.399,46.542-88.746,115.131-88.746,188.179C12.138,402.607,121.536,512,256.008,512,c134.462,0,243.854-109.393,243.854-243.854C499.862,195.922,468.118,127.836,412.77,81.345z M190.566,66.72,c1.907-2.942,2.292-6.618,1.042-9.892l-9.493-24.826l69.356,31.428c2.879,1.304,6.185,1.304,9.062,0L329.89,32l-9.493,24.826,c-1.25,3.275-0.865,6.95,1.042,9.892l32.24,49.741l-54.311-22.103c-4.768-1.941-10.244-0.306-13.17,3.927l-30.195,43.694,l-30.195-43.694c-2.101-3.039-5.514-4.738-9.036-4.738c-1.385,0-2.787,0.263-4.134,0.811l-54.313,22.105L190.566,66.72z"/>
      <path className={styles.animated}
      style={animationStyle}
      stroke={redA200} strokeWidth="10px" fill="none" d="M412.77,81.345c-22.575-18.958-48.1-22.958-69.287-23.413L359.938,14.9c1.588-4.157,0.511-8.863-2.73-11.914,c-3.239-3.052-8.001-3.844-12.056-2.007l-89.148,40.398L166.857,0.979c-4.056-1.836-8.816-1.044-12.056,2.007,c-3.241,3.051-4.318,7.757-2.73,11.914l16.298,42.627c-20.672,0.378-45.42,4.239-67.485,22.44,c-56.399,46.542-88.746,115.131-88.746,188.179C12.138,402.607,121.536,512,256.008,512,c134.462,0,243.854-109.393,243.854-243.854C499.862,195.922,468.118,127.836,412.77,81.345z M190.566,66.72,c1.907-2.942,2.292-6.618,1.042-9.892l-9.493-24.826l69.356,31.428c2.879,1.304,6.185,1.304,9.062,0L329.89,32l-9.493,24.826,c-1.25,3.275-0.865,6.95,1.042,9.892l32.24,49.741l-54.311-22.103c-4.768-1.941-10.244-0.306-13.17,3.927l-30.195,43.694,l-30.195-43.694c-2.101-3.039-5.514-4.738-9.036-4.738c-1.385,0-2.787,0.263-4.134,0.811l-54.313,22.105L190.566,66.72z"/>
    </svg>
  );
}

function CuteTimer(props) {
  return(
    <div
      style={{
        height: "210px"
      }}
    >
      <Tomato
        time={props.time}
        running={props.running}
        finish={props.finish}
        paused={props.paused}
      />
      <h1
        style={{
          position: "relative",
          top: "-130px",
          left: "60px",
          height: "0",
          width: "0",
          fontWeight: "300"
        }}
      >{props.formattedTime}</h1>
    </div>
  )
}
CuteTimer.propTypes = {
  time: React.PropTypes.number.isRequired,
  formattedTime: React.PropTypes.string.isRequired,
  running: React.PropTypes.bool,
  finish: React.PropTypes.bool,
  paused: React.PropTypes.bool,
}

export default CuteTimer;