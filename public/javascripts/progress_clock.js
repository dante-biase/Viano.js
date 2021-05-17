
//●
const progress_clock = {

    _timer_up: new easytimer.Timer(),
    _timer_down: new easytimer.Timer(),
    _target: 0,
    _max_fill: 48,
    progress: 0.0,
    ids: {},
    setup: function(tmr_up_id, prog_id, tmr_dwn_id, on_complete) {
        parent = this;
        this._timer_up.addEventListener('secondsUpdated', function(e) {
            let time = parent._timer_up.getTimeValues();
            let prog = parent._calc_secs(time.minutes, time.seconds) / parent._target;
            let prog_fill = Math.floor(prog * parent._max_fill);
            let prog_fill_str = '-'.repeat(prog_fill).substring(0, prog_fill - 1) + (prog < 1.0 ? '●' : '');
            $(tmr_up_id)[0].textContent = time.toString().substring(3, );
            $(prog_id)[0].textContent = prog_fill_str;
        });
        this._timer_down.addEventListener('secondsUpdated', function(e) {
            let time = parent._timer_down.getTimeValues().toString().substring(3, );
            $(tmr_dwn_id)[0].textContent = '-' + time;
        });

        this._timer_down.addEventListener('targetAchieved', function(e) {
            on_complete();
        });

        this.ids = {
            up: tmr_up_id,
            prog: prog_id,
            down: tmr_dwn_id
        };
    },
    set: function(mins, secs) {
        this._timer_up.config = {
            countdown: false,
            target: {minutes: mins, seconds: secs}
        };
        this._timer_down.config = {
            countdown: true,
            startValues: {minutes: mins, seconds: secs},
        };
        this._target = this._calc_secs(mins, secs);
        this.start();
        this.pause();
        $(this.ids.up)[0].textContent = "00:00";
        $(this.ids.prog)[0].textContent = "●";
        $(this.ids.down)[0].textContent = "-" + pad0(mins) + ":" + pad0(secs);
    },
    start: function() {
        this._timer_up.stop();
        this._timer_down.stop();
        this._timer_up.start(this._timer_up.config);
        this._timer_down.start(this._timer_down.config);
    },
    pause: function() {
        this._timer_up.pause();
        this._timer_down.pause();
    },
    resume: function() {
        this._timer_up.start();
        this._timer_down.start();
    },
    reset: function() {
        this._timer_up.reset();
        this._timer_down.reset();
        this.pause();
        $(this.ids.prog)[0].textContent = "●";
        $(this.ids.down)[0].textContent = "-" + pad0(this._timer_down.config.startValues.minutes) + ":" + pad0(this._timer_down.config.startValues.seconds);
    },
    clear: function() {
        this._timer_up.stop();
        this._timer_down.stop();
        $(this.ids.up)[0].textContent = "00:00";
        $(this.ids.prog)[0].textContent = "●";
        $(this.ids.down)[0].textContent = "-00:00";
    },
    _calc_secs(mins, secs) {
        return (mins * 60) + secs;
    }
}

