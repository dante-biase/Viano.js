

// // Tone.Synth is a basic synthesizer with a single oscillator
// const synth = new Tone.Synth();
// // Set the tone to sine
// synth.oscillator.type = "sine";

// // connect it to the master output (your speakers)
// synth.toDestination();

const _piano = new Piano({
	velocities: 5
});

//connect it to the speaker output
_piano.toDestination();

//Tone.context.resume();
//AudioContext.start();
//let groups = ks.split(' | ');
// let subgroups = groups.map(g => g.split(' '));
// this.sequence = subgroups;
//this.next();
Math.seedrandom('0');


var key_map = {};


var key_sheet_feed = {
    // alphabet: "qwertyuiopasdfghjklzxcvbnm".split('').sort(() => Math.random() - 0.5),
    //alphabet: "awsedrftgyhujik".split(''),
    active_key_sheet: '',
    queue: {
        front: '',
        line: '',
        load: function(line) {
            this.line = line;
        },
        next: function() {
            if (!this.line) return '';
            else {
                let front, trail;
                [front, trail] = this.line.trimStart().split(/ (.+)/);
                trail = trail ? trail : '';

                if ( front.length > 1 && !['(', '['].includes(front.charAt(0)) ) {
                    this.line = front.substring(1, ) + ' ' + trail;
                }
                else {
                    this.line = trail;
                }
                return [front, trail];
            }
        } 
    },
    load: function(ks) {
        let new_key_note_map;    
        ks = this._prepare(ks);
        [ks, new_key_note_map] = this._translate(ks);
        this.active_key_sheet = ks;
        this.reset();
        // console.log(new_key_note_map);
        return new_key_note_map;
    },
    next: function() {
        let [front, trail] = this.queue.next();
        $("#current_notes")[0].innerHTML = front ? front : '';
        $("#next_notes")[0].innerHTML = trail ? trail : '';
    },
    reset: function() {
        this.queue.load(this.active_key_sheet);
        this.next();
    },
    _prepare: function(ks) {
        ks = ks.trim();
        ks = ks.replaceAll("\n", '');
        ks = ks.replaceAll("|", '');
        ks = ks.replaceAll("[", ' [');
        ks = ks.replaceAll("]", '] ');

        for (group of [...new Set(ks.match(/(\[.\])/g))]) {
            ks = ks.replaceAll(group, `(${group.charAt(1)})`)
        }
        return ks
    },
    _translate: function(ks) {
        let new_key_note_pairs = [];
        let ks_key_set = [...new Set(ks.replace(/\W/g, ''))];
        let new_keys = this._create_new_alphabet(ks_key_set.length);
        for (let i = 0; i < ks_key_set.length; i++) {
            let old_key = ks_key_set[i];
            let old_key_note = knm0[old_key];
            let new_key = new_keys[i];
            
            ks = ks.replaceAll(old_key, new_key);
            new_key_note_pairs.push([new_key, old_key_note]);
            //new_key_note_map[new_key] = old_key_note;
        }

        let new_key_map = {};
        for (let i = 0; i < new_key_note_pairs.length; i++) {
            //console.log(new_key_note_pairs[i]);
            let [new_key, new_note] = new_key_note_pairs[i];

            let piano_key = {
                index: i,
                element: $('#key' + i)[0],
                key: new_key,
                note: new_note,
            }   

            new_key_map[new_key] = piano_key;
        }
        return [ks, new_key_map];
    },
    _create_new_alphabet(size) {
        let key_options;
        if (size <= 9) key_options = "asdfghjkl";
        else if (size <= 17) key_options = "awsedrftgyhujikol";
        else key_options = "awzsexdrcftvgybhunjimkol";
        //return extract_middle_substr(key_options, size).split('');
        return key_options.split('');
    }  
}


var piano = {
    default_key_map: {},
    enabled: true,
    transpose: 0,
    current_song: {},
    songs: [],
    key_sheet_feed: key_sheet_feed,
    key_count: -1,
    clock: progress_clock,
    state: {
        started: false,
        paused: true,
        stopped: true,
    },
    _labels: [
        ["name", "song-name-label"],
        ["artist", "artist-label"],
        //["key_sheet", "key-sheet-label"],
        ["tempo", "tempo-label"],
        //["duration", "duration-label"],
        ["transposition", "trans-label"],
        ["difficulty", "difficulty-label"]
    ],
    setup: async function() {
        await _piano.load().then(() => {
            console.log('loaded!')
        })

        this._disable_btn('#prev-song-btn', true);
        this._disable_btn('#pp-song-btn', true);
        this._disable_btn('#next-song-btn', true);
        this._disable_btn('#sr-song-btn', true);

        let parent = this;

        this.clock.setup("#timer-up", "#timer-progress", "#timer-down", e => {
            $('#sr-song-btn').click();
        });

        let all_keys = "qawzsexdrcftvgybhunjimkolp".split('');
        let all_notes = Object.values(knm0);
        let default_key_note_pairs = all_keys.map((key, i) => [key, all_notes[i]]);
        
        this.key_count = $('.piano-keys')[0].children.length;
        
        for (let i = 0; i < this.key_count; i++) {
            let [key, note] = default_key_note_pairs[i];

            let piano_key = {
                index: i,
                element: $('#key' + i)[0],
                key: key,
                note: note,

            }           
            // p.keyDown({note: 'C4', time: '+1'})
            // p.keyUp({ note: 'C4' }) 
            piano_key.element.addEventListener("mousedown", e => {
                if (parent.enabled) {
                    let note = Tonal.Note.transposeFifths(piano_key.note, parent.transpose);
                    return _piano.keyDown({note: note}); //synth.triggerAttack(piano_key.note);   
                }
            });  
            piano_key.element.addEventListener("mouseup", e => {
                if (parent.enabled) {
                    let note = Tonal.Note.transposeFifths(piano_key.note, parent.transpose);
                    _piano.keyUp({note: note})
                } 
            });

            this.default_key_map[key] = piano_key;
        }

        key_map = this.default_key_map;

        document.addEventListener("keydown", e => {
            if (!parent.enabled || e.repeat || !(e.key in key_map)) return;

            let piano_key = parent._get_key(e.key);
            if(!parent.state.paused) parent.key_sheet_feed.next();
            piano_key.element.classList.add("piano-key-focus");
            let note = Tonal.Note.transposeFifths(piano_key.note, parent.transpose);
            return _piano.keyDown({note: note});
        });

        document.addEventListener("keyup", e => {
            if (!parent.enabled || !(e.key in key_map)) return;
            let piano_key = parent._get_key(e.key)
            piano_key.element.classList.remove("piano-key-focus")
            let note = Tonal.Note.transposeFifths(piano_key.note, parent.transpose);
            _piano.keyUp({note: note}) 
        });
        
        this._disable_btn('#pp-song-btn', true);
        this._disable_btn('#sr-song-btn', true);
    },
    load_songs: function(songs) {
        for (let i = 0; i < this.songs.length; ++i) songs[i].track_no = i;
        this.songs = songs;
    },
    select_song: function(track_no) {
        let song = this.songs[track_no];
        for (let [key, id] of this._labels) this._set_field_value(id, song[key]);
        key_map = this.key_sheet_feed.load(song.key_sheet);
        this.current_song = song;
        this.transpose = song.transposition;
        [song.mins, song.secs] = parse_duration(this.current_song.duration);
        this.clock.set(song.mins, song.secs);
        this._set_btn_icon("pp-song-btn", "url(../icons/play.png)");
        this.state.paused = true;
        this.state.stopped = false;

        this._disable_btn('#pp-song-btn', false);
        this._disable_btn('#sr-song-btn', true);
        if (this.songs.length === 1) {
            this._disable_btn('#prev-song-btn', true);
            this._disable_btn('#next-song-btn', true);
        }
        else if (track_no === this.songs.length - 1) {
            this._disable_btn('#prev-song-btn', false);
            this._disable_btn('#next-song-btn', true);
        }
        else if (track_no === 0) {
            this._disable_btn('#prev-song-btn', true);
            this._disable_btn('#next-song-btn', false);
        }
        else {
            this._disable_btn('#prev-song-btn', false);
            this._disable_btn('#next-song-btn', false);
        }

    },
    on_select_song_click: async function(f) {
        document.getElementById("select-song-btn").addEventListener("click", async e => {
            e.preventDefault();
            await f();
        }, false);
    },
    on_new_song_click: function(f) {
        document.getElementById("new-song-btn").addEventListener("click", e => {
            e.preventDefault();
            f();
        }, false);
    },
    on_prev_click: function(f) {
        let parent = this
        document.getElementById("prev-song-btn").addEventListener("click", e => {
            e.preventDefault();
            parent.select_song(parent.current_song.track_no - 1);
            f();
        }, false);
    },
    on_play_pause_click: function(f) {
        let parent = this;
        document.getElementById("pp-song-btn").addEventListener("click", e => {
            e.preventDefault();
            parent._disable_btn('#sr-song-btn', false);
            if (parent.state.paused) {
                parent._set_btn_icon("pp-song-btn", "url(../icons/pause.png)");
                parent.clock.resume();
                parent.state.paused = false;
            }
            else {
                parent._set_btn_icon("pp-song-btn", "url(../icons/play.png)");
                parent.clock.pause();
                parent.state.paused = true;
            }
            f();
        }, false);
    },
    on_next_click: function(f) {
        let parent = this
        document.getElementById("next-song-btn").addEventListener("click", e => {
            e.preventDefault();
            parent.select_song(parent.current_song.track_no + 1);
            f();
        }, false);
    },
    on_stop_replay_click: function(f) {
        let parent = this;
        document.getElementById("sr-song-btn").addEventListener("click", e => {
            e.preventDefault();
            piano.select_song(piano.current_song.track_no);
            parent._set_btn_icon("pp-song-btn", "url(../icons/restart.png)");
            f();
        }, false);
    },
    _set_field_value: function(id, value) {
        $(`#${id}`).text(value);
    },
    _get_key: function(key) {
        let piano_key = key_map[key];
        piano_key.element = $('#key' + piano_key.index)[0];
        return piano_key;
    },
    _set_btn_icon(id, icon) {
        $('#' + id).css("background-image", icon);
    },
    _disable_btn(id, disable) {
        let btn = $(id);
        btn.prop('disabled', disable);
        if (disable) btn.css('opacity', 0.7);
        else btn.css('opacity', 1);
    }
};