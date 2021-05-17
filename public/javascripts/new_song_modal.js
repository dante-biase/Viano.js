
var new_song_modal = {
    _modal: null,
    setup: function(id) {
        this._modal = new RModal(document.getElementById(id));
    },
    open: function() {
        piano.enabled = false;
        window.modal = this._modal;
        this._modal.open();
    },
    on_submit_click: function(f) {
        document.getElementById("new-song-submit-btn").addEventListener("click", async e => {
            e.preventDefault();
            await f();
        }, false);
    },
    close: function() {
        window.modal = this._modal;
        this._modal.close();
        piano.enabled = true;
    },
    form: {
        input_fields: [
            ["name", "song-name-input"],
            ["artist", "artist-input"],
            ["key_sheet", "key-sheet-input"],
            ["tempo", "tempo-input"],
            ["duration_mins", "dur-mins-input"],
            ["duration_secs", "dur-secs-input"],
            ["transposition", "trans-input"]
        ],
        get_song: function() {        
            let song = {};
            song.difficulty = $("#difficulty-selection :selected").text();
            for (let [field, field_id] of this.input_fields) {
                song[field] = this._get_field(field_id).value;
            }
            song.duration = pad0(song.duration_mins) + ':' + pad0(song.duration_secs);
            delete song.duration_mins; delete song.duration_secs;
            return song;
        },
        clear: function() {
            for (let [field, field_id] of this.input_fields) this._get_field(field_id).value = "";
        },
        _get_field: function(id) {
            return $('#' + id)[0];
        }
    }
};