import React from 'react';
import playAudio from './promise';


const LibrarySong =  ({song,songs,setCurrentSong, audioRef,isPlaying,id,setSongs}) =>{
    const updateSong =  async (e)=>{
     await  setCurrentSong(song);
        const newSongs = songs.map((song) =>{
            if(song.id === id){
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
        })
        if(isPlaying) audioRef.current.play()
        setSongs(newSongs)
    }
    return(
       <div onClick={updateSong} className={`library-song ${song.active ? 'selected' : ''}`}>
        <img alt={song.name.value} src={song.cover}></img>
       <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
        </div>
        </div>
    );
}

export default LibrarySong;