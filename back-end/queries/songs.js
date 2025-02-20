const db = require("../db/dbConfig.js")

const getAllSongs = async (album_id)=>{
    try {
        const allSongs = await db.any("SELECT * FROM songs WHERE album_id=$1", album_id)
        return allSongs
    } catch (error) {
        return error
    }
}

const getSong = async (id)=>{
    try {
        const oneSong = await db.one("SELECT * FROM songs WHERE id =$1", id)
        return oneSong
    } catch (error) {
        return error
    }
}

const createSong = async (song)=>{
    try {
        const newSong = await db.one(
            "INSERT INTO songs (name, artist, album, time, is_favorite, album_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [song.name, song.artist, song.album, song.time, song.is_favorite, song.album_id]
        )
        return newSong
    } catch (error) {
       return error 
    }
}

const deleteSong = async (id)=>{
    try {
        const deletedSong = await db.one("DELETE FROM songs WHERE id=$1 RETURNING *", id)
        return deletedSong
    } catch (error) {
        return error
    }
}

const updateSong = async (song)=>{
    try {
        const updatedSong = await db.one(
            "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5, album_id=$6 WHERE id=$7 RETURNING *",
            [song.name, song.artist, song.album, song.time, song.is_favorite, song.album_id, song.id]
        )
        return updatedSong
    } catch (error) {
        return error
    }
}


module.exports = {
    getAllSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong}