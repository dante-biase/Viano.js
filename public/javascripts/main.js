/*
 * This files holds all the code to test you REST API
 */

var songs;
var songs_url = 'https://frozen-everglades-73007.herokuapp.com/songs/';


async function refresh_songs() {
    songs = await request(songs_url, "GET");
    select_song_modal.table.update(
        songs, song => [song.artist, song.name, song.difficulty]
    );
    piano.load_songs(songs);
}

$(document).ready(async () => {
    await refresh_songs();
});

//Run once broswer has loaded everything
window.onload = () => {

    // setup
    select_song_modal.setup("select-song-modal");
    new_song_modal.setup("new-song-modal");
    piano.setup();
    // piano.load_song(songs[0]);

    // select song
    piano.on_select_song_click(async () => {
        await refresh_songs();
        select_song_modal.open();
    });

    select_song_modal.on_select_click(() => {
        let selected_song = select_song_modal.table.get_selected_song();
        if (selected_song) {
            select_song_modal.close();
            piano.select_song(selected_song.track_no);
        }
    });

    // new song
    piano.on_new_song_click(() => {
        new_song_modal.open();
    });

    new_song_modal.on_submit_click(async () => {
        let song = new_song_modal.form.get_song();
        let response = await request(songs_url, "POST", song);
        if (response !== 201) {
            console.log("post error");
        }
        else {
            new_song_modal.close();
            new_song_modal.form.clear();
            await refresh_songs();
            let track_no = songs.findIndex(s => s.name === song.name && s.artist === song.artist);
            piano.select_song(track_no);
        }
    });


    piano.on_prev_click(() => {

    });

    piano.on_play_pause_click(() => {

    });

    piano.on_next_click(() => {

    });

    piano.on_stop_replay_click(() => {
        
    });
    
};

