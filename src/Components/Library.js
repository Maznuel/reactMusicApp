import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({libraryStatus, songs,isPlaying, setCurrentSong, currentSong, audioRef,setSongs}) =>{
    return(
        <div style={{background: `linear-gradient(to top, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className={`library ${libraryStatus ? "clicked" : ""}`}>
            <h1>Library</h1>
            <div className="library-songs">
            {songs.map((song) => <LibrarySong 
            audioRef = {audioRef}
            currentSong={currentSong}
            song={song}
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            key={song.id}
            id={song.id}
             />)}
            </div>
        </div>
    )
}

export default Library;