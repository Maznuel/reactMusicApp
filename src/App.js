import React,{useState,useRef} from 'react';
//Components
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
import Nav from './Components/Nav';
//Styles
import "./style/style.scss";
//data
import Data from './util';

function App() {
 const audioRef = useRef(null);
 const [songs, setSongs] = useState(Data());
 const [currentSong, setCurrentSong] = useState(songs[0]);
 const [isPlaying, setIsPlaying] = useState(false);
 const [songInfo, setSongInfo] = useState({
  currentTime:0,
  duration:0,
  animationPercentage:0
});
const[libraryStatus, setLibraryStatus] = useState(false);

//functions
 const timeUpdateHandler = (e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //percentage
    const roundedCurrent = (current);
    const roundedDuration = (duration);
    const animation = ((roundedCurrent / roundedDuration) * 100)
    setSongInfo({...songInfo, currentTime: current, duration:duration, animationPercentage:
   animation}
      )};
const songEndedHandler = async () =>{
  let songIndex = songs.findIndex((song)=> song.id === currentSong.id)
     songIndex = songIndex+1;
    await  setCurrentSong(songs[songIndex % songs.length]);
    if(isPlaying) audioRef.current.play();
}
 return (
<div className={`app ${libraryStatus ? 'library-active' : ''}`}>
    <Nav
     setLibraryStatus={setLibraryStatus}
     libraryStatus={libraryStatus}
     />
    <Song
     currentSong={currentSong}
     />
    <Player
    setSongs={setSongs}
    id={songs.id}
    currentSong={currentSong}
    songs={songs}
     setSongInfo={setSongInfo}
      songInfo={songInfo}
       timeUpdateHandler={timeUpdateHandler}
        audioRef={audioRef}
         isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentSong={setCurrentSong}
           />
    <Library
     libraryStatus={libraryStatus}
     setSongs={setSongs}
      isPlaying={isPlaying}
        songs={songs}
         currentSong={currentSong}
          setCurrentSong={setCurrentSong} 
            audioRef={audioRef}
              setIsPlaying={setIsPlaying}
/>
<audio
     onTimeUpdate={timeUpdateHandler}
     ref={audioRef}
     src={currentSong.audio}
     onLoadedMetadata ={timeUpdateHandler}
     onEnded ={songEndedHandler}
     ></audio>
</div>
  );
}

export default App;
