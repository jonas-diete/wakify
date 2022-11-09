import SpotifyWebApi from "spotify-web-api-node";
import getAccessToken from "../../asyncStorage/getAccessToken";
import getData from "../../asyncStorage/getData";

const spotifyApi = new SpotifyWebApi({
    clientId: '7241615fa50c440dbf5d06ee41374ddb'
  });
  
  async function getPlaylist(mood) {
    let playlistUrl = ''
    let genre = await getData('genre');
    spotifyApi.setAccessToken(await getAccessToken('access_token'));

    if (genre ) {
      await spotifyApi.search(genre + ' ' + mood , ['playlist'], { limit : 5}).then(
        function(data) {
            console.log(data.body.playlists.items.map(item => item.name));
            playlistUrl = findRandomPlaylist(data.body.playlists.items);
        },
        function(err) {
            console.error(err);
            return false;
        }
      );
      return String(playlistUrl)
    } else {
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

const findRandomPlaylist = (playlistItems) => { 
    let rand = Math.floor(Math.random() * playlistItems.length)
    return playlistItems[rand].external_urls.spotify;
}

export default getPlaylist;