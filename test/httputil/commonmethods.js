var request = require('request');

function GET(_url, _headers) {
    var options = {
        method: 'GET',
        url: _url,
        headers: _headers,
        json: true
    };
    return REQUEST(options);
}


async function POST(_url, _headers, _body) {
    var options = {
        method: 'POST',
        url: _url,
        headers: _headers,
        body: _body,
        json: isJsonType(_body)
    };
    let promise = await REQUEST(options);
    return promise;
}

function PUT(_url, _headers, _body) {
    var options = {
        method: 'PUT',
        url: _url,
        headers: _headers,
        body: _body,
        json: isJsonType(_body)
    };
    return REQUEST(options);
}

function DELETE(_url, _headers, _body) {
    var options = {
        method: 'DELETE',
        url: _url,
        headers: _headers,
        body: _body,
        json: isJsonType(_body)
    };
    return REQUEST(options);
}

function isJsonType(_body) {
    return (typeof (_body) == 'object')
}


function getResponse(options) {
    return REQUEST(options);
}

function REQUEST(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

module.exports = { getResponse, GET, POST, PUT, DELETE }