

function request(url, method, data) {
    // setup the request parameters
    let params = {
        'method': method,
        'headers': {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'Access-Control-Allow-Origin': '*'
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

function parse_duration(dur) {
    let partials = dur.split(':');
    return [parseInt(partials[0]), parseInt(partials[1])];
}

function pad0(n) {
    return ('00'+ n).slice(-2);
}

function extract_middle_substr(str, max_len) {
    let padding = Math.floor((str.length - max_len) / 2);
    return str.substring(0 + padding, str.length - padding);
}

function reverse_obj(obj) {
    let reverse_obj = {};
    for (const [key, value] of Object.entries(object1)) {
        reverse_obj[value] = key;
    }
    return reverse_obj;
}