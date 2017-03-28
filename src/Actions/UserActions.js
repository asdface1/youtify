export function signIn(user) {
  return {
    type: 'SIGN_IN',
    payload: {
      user: user
    }
  }
}
export function signOut() {
  return {
    type: 'SIGN_OUT'
  }
}
export function setPlaylists(array) {
  return {
    type: 'SET_PLAYLISTS',
    payload: {
      playlists: array
    }
  }
}
export function setFavorites(array) {
  return {
    type: 'SET_FAVORITES',
    payload: {
      favorites: array
    }
  }
}
export function addToPlaylist(song, playlistId) {
  console.log("UserAction.js::song", song);
  return {
    type: 'ADD_TO_PLAYLIST',
    payload: {
      song: song,
      playlistId: playlistId
    }
  }
}

