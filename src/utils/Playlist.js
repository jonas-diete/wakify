import SpotifyWebApi from "spotify-web-api-node";
import getAccessToken from "../../asyncStorage/getAccessToken";




const spotifyApi = new SpotifyWebApi({
    clientId: '4bcebf291d354ebd849e9e672f76ce40'
  });

  
  async function getPlaylist(mood) {
    let playlistUrl = ''
    spotifyApi.setAccessToken(await getAccessToken('access_token'));
await spotifyApi.getPlaylistsForCategory("0JQ5DAqbMKFzHmL4tf05da", {limit: 50}).then(
  function(data) {
    playlistUrl = findPlaylist(data.body.playlists.items, mood);
  },
  function(err) {
    console.error(err);
  }
  );
return String(playlistUrl);
}
  
const findPlaylist = (playlistItems, mood) => { 
  let foundPlaylist = ''
  playlistItems.forEach((item) => {
    if (item.name.toLowerCase().includes(mood)) {
      foundPlaylist = item;
    }
  })
  return foundPlaylist.external_urls.spotify;
}

export default getPlaylist;