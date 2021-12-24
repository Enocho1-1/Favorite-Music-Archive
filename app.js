// Music Constructor
class Music{
  constructor(artist,song,album,genre){
    this.artist = artist;
    this.song = song;
    this.album = album;
    this.genre = genre;
  }


  // Add song to music list
  addSongToList(music){
    // Select Music List in UI
    const list = document.querySelector('#music-list');
    // Create Element
    const row = document.createElement('tr');
    row.className = 'row-data';
    row.innerHTML = 
                  ` <td class="tbl-data">${music.artist}</td>
                    <td class="tbl-data">${music.song}</td>
                    <td class="tbl-data">${music.album}</td>
                    <td class="tbl-data">${music.genre}</td>`;
    list.appendChild(row);
  }

  // Clear Fields
  clearFields(){
    artist.value = '';
    song.value = '';
    album.value = '';
    genre.value = '';
  }

  // Delete Song
  deleteSong(target){
    if(target.className === 'tbl-data'){
      target.parentElement.remove();
    }
  }

  // Filter songs by artist, song, album, and genre
  filter(input){
    let songs = document.querySelectorAll('tr.row-data');
    songs.forEach(function(song){
      let songRow = song.textContent;
      if(songRow.toLowerCase().includes(input)){
        song.style.display = "";
      } else {
        song.style.display = "none";
      }
    })

  }

  // Static Methods
  // Welcome message
  static welcomeMsg(message, className){
    // Create element
    const div = document.createElement('div');
    div.className = 'welcomeMessage';
    div.appendChild(document.createTextNode(message));
    // Select parent
    const parent = document.querySelector('.container');
    const card = document.querySelector('.card');
    parent.insertBefore(div, card);

    setTimeout( function(){
      div.remove();
    }, 6000);
  }

  // Get from local storage
  static getFromLS(){
    let songs;
    if(localStorage.getItem('song') === null){
      songs = [];
    }else{
      songs = JSON.parse(localStorage.getItem('song'));
    }
    return songs;
  }

  // Add to local storage
  static addToLS(song){
    const songs = this.getFromLS();
    songs.push(song);
    localStorage.setItem('song', JSON.stringify(songs));
  }

  // Display from local storage
  static displayFromLS(){
    const songs = this.getFromLS();
    songs.forEach(function(song){
      const music = new Music(artist, song,album, genre);
      music.addSongToList(song);
    });
  }

  // Remove from local storage
  static removeFromLS(target){
    const songs = this.getFromLS();
    songs.forEach(function(song, index){
      let songRow = song.textContent;
      if(target.textContent === songRow){
        songs.splice(index,1);
      }
    }); 
    localStorage.setItem('song', JSON.stringify(songs));
  }
}

// Document object event listener
document.addEventListener('DOMContentLoaded' ,function(){
  // Welcome Message call
  Music.welcomeMsg('Welcome, enter your favorite artist, songs, albums, and genre in the input fields below! Click songs you want to delete once added!');
}, Music.displayFromLS());

// Event listener on Form
document.querySelector('form').addEventListener('submit', function(e) {
  // UI Form Input
  const artist = document.querySelector('#artist').value;
  const song = document.querySelector('#song').value;
  const album = document.querySelector('#album').value;
  const genre = document.querySelector('#genre').value;

  // Instantiate Music Constructor 
  const music = new Music(artist, song,album, genre);
  console.log(music);
  // Call prototype method
  music.addSongToList(music);
  music.clearFields()
  // Add to local storage static method
  Music.addToLS(music);
  e.preventDefault();
})

// Music list event listener
document.querySelector('#music-list').addEventListener('dblclick', function(e){
  // Instantiate Music Constructor 
  const music = new Music(artist, song,album, genre);
  // Remove method call
  music.deleteSong(e.target);
  // Remove from local storage
  Music.removeFromLS(e.target.parentElement.textContent);
});

// Filter field event listener 
document.querySelector('#filter').addEventListener('keyup', function(){
  let filter = document.querySelector('#filter').value;
    //Instantiate Music Constructor 
    const music = new Music(artist, song,album, genre);
    // Call filter prototype method
    music.filter(filter);
});