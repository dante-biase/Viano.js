

var select_song_modal = {
    _modal: null,
    setup: function(id) {
        this._modal = new RModal(document.getElementById(id));
        this.table.setup("#song-table");
    },
    open: function() {
        piano.enabled = false;
        window.modal = this._modal;
        this._modal.open();
        this.table._table.columns.adjust().draw();
    },
    on_select_click: function(f) {
        document.getElementById("select-song-submit-btn").addEventListener("click", e => {
            e.preventDefault();
            f();
        }, false);
    },
    close: function() {
        window.modal = this._modal;
        this._modal.close();
        piano.enabled = true;
    },
    table: {
        _table: null,
        _selected_row: null,
        songs: null,
        setup: function(id) {
            this._table = $(id).DataTable({
                scrollY:        "200px",
                scrollCollapse: false,
                paging:         false,
                searching: false,
                bInfo: false,
                select: {
                    style: "single"
                }
            });
        
            let parent = this;
            $(id + ' tbody').on( 'click', 'tr', function () {
                let selected_row = $(this);
                if (selected_row.hasClass('selected')) $(this).removeClass('selected');
                else {
                    parent._table.$('tr.selected').removeClass('selected');
                    selected_row.addClass('selected');
                    parent._selected_row = selected_row;
                }
            });


        },
        update: function(songs, filter) {
            this.songs = songs;
            let rows = songs.map(filter);

            this._table.clear();
            this._table.rows.add(rows);
            this._table.draw();
        },
        get_selected_song: function() {
            let row_selection = this._table.rows({selected: true});
            let row_index = this._table.row(row_selection).index();
            let song = this.songs[row_index];
            song.track_no = row_index;
            return song;
        }
    }
}


