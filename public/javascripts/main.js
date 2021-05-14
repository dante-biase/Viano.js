/*
 * This files holds all the code to test you REST API
 */

var songs;
var song_table;
var songs_url = 'http://localhost:3000/songs/';

function request(url, method, data) {
    // setup the request parameters
    let params = {
        'method': method,
        'headers': {
            'Content-Type': 'application/json',
        }
    };

    // if the request is a GET request, return the status of the get request
    // only if the request was not sucessful. Otherwise return the collection
    // of film's or specific use requested
    if (method === 'GET') {
        return fetch(url, params)
            .then(response => {
                if (!response.ok) return response.status;
                else return response.json();
            });
    }
    // for any other type of request, set the parameter body
    // and only return the response status recieved from executing
    // the request
    else {
        params.body = JSON.stringify(data);
        return fetch(url, params)
            .then(response => response.status);
    }
};

async function refreshSongs() {
    songs = await request(songs_url, "GET");
    songs = [{"name": "test","artist": "test","difficulty": "test"}];
    console.log(songs)
    for (let i = 0; i < songs.length; ++i) {
        let song = songs[i];
        song_table.rows.add([
            song.name, song.artist, song.difficulty
        ])//.draw();
    }
}

$(document).ready(async () => {
    // song_table = $('#song-table').DataTable({
    //     "scrollY":        "200px",
    //     "scrollCollapse": false,
    //     "paging":         false
    // });
    song_table = $('#song-table');
    song_table.tablesort();
    song_table.rows = song_table[0].children[1];
    song_table.rows.add = (cells) => {
        let new_row = song_table.rows.insertRow(0);
        for (let i = 0; i < cells.length; ++i) {
            let cell = new_row.insertCell(i);
            cell.innerHTML = cells[i];
        }
    };

    await refreshSongs();
});

//Run once broswer has loaded everything
window.onload = () => {

    var select_song_modal = new RModal(document.getElementById('select-song-modal'), {
        afterOpen: () => {
            //song_table.columns.adjust();
        },
    
        // dialogOpenClass: 'animate__slideInDown',
        // dialogCloseClass: 'animate__slideOutUp'
        // bodyClass: 'modal-open',
        // dialogClass: 'modal-dialog',
    
        // focus: true,
        // focusElements: ['input.form-control', 'textarea', 'button.btn-primary'],
    
        // escapeClose: true
    });


    var new_song_modal = new RModal(document.getElementById('new-song-modal'), {
        afterOpen: () => {
            //song_table.columns.adjust();
        },
    });


    //button event for create
    document.getElementById("select-song-btn").addEventListener("click", e => {
        window.modal = select_song_modal;
        e.preventDefault();
        select_song_modal.open();
    }, false);

    document.getElementById("select-song-submit-btn").addEventListener("click", e => {
        window.modal = select_song_modal;
        e.preventDefault();
        //load_song(song)
        select_song_modal.close();
    }, false);

    //button event for create
    document.getElementById("new-song-btn").addEventListener("click", e => {
        window.modal = new_song_modal;
        e.preventDefault();
        new_song_modal.open();
    }, false);

    //button event for create
    document.getElementById("new-song-submit-btn").addEventListener("click", async e => {
        window.modal = new_song_modal;
        e.preventDefault();
        // post new song
        await refreshSongs();
        //load_song(song)
        new_song_modal.close();
    }, false);

};

