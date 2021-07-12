import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from "@fortawesome/free-solid-svg-icons";
import playAudio from './promise';

const Player = ({setSongs,id,setCurrentSong,currentSong,songs,setSongInfo, isPlaying, setIsPlaying,audioRef,songInfo}) =>{
    //events
    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

const getTime = (time)=>{
    return(
Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
}
const dragHandler = (e)=>{
audioRef.current.currentTime = e.target.value
setSongInfo({...songInfo, currentTime:e.target.value})
}
const skipHandler = async (direction) =>{
 let songIndex = songs.findIndex((song)=> song.id === currentSong.id)
 if(direction === "skip-foward"){
     songIndex = songIndex+1; // % songs.length
    await  setCurrentSong(songs[songIndex % songs.length]);
    activeLibraryHandler(songs[songIndex % songs.length]);
}if(direction === "skip-back"){
    if(songIndex == 0){
        songIndex = 30;
    }
    songIndex = songIndex-1;
 await   setCurrentSong(songs[songIndex]);
 activeLibraryHandler(songs[songIndex])
 
}
if(isPlaying) audioRef.current.play()
}
const activeLibraryHandler = (nextPrev) =>{
    const newSongs = songs.map((song) =>{
        if(song.id === nextPrev.id){
            return{
                ...song,
                active:true
            };
        }else{
            return{
                ...song,
                active:false
            }
        }
    });
    setSongs(newSongs);
}
    //styles
const trackAnim ={
    transform: `translateX(${songInfo.animationPercentage}%)`
  }
    //app
    return(
       <div className="player">
    <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
       <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
        <input min={0}
         max={songInfo.duration}
        value={songInfo.currentTime}
        type="range"
        onChange ={dragHandler}
           />
          <div style={trackAnim} className="animation-track"></div>
           </div>
        <p>{getTime(songInfo.duration || 0)}</p>
        </div>
    <div className="play-control">
        <FontAwesomeIcon onClick={()=>{skipHandler("skip-back")}} className="skip-back" size="2x" icon={faAngleLeft} /> 
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x"
         icon={isPlaying ? faPause : faPlay} /> 
        <FontAwesomeIcon onClick={()=>{skipHandler("skip-foward")}} className="skip-foward" size="2x" icon={faAngleRight} /> 
    </div>
    </div>
    )
}

export default Player;