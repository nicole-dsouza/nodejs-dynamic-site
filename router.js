var Profile  = require('./profile.js');
var renderer = require('./renderer.js');
var querystring = require('querystring');



const commonHeaders = { 'Content-Type': 'text/html' };

// handle HTTP route GET / and POST / i.e. homepage
function home(req, res) {

    // if URL = / && GET  -> show search
    if (req.method.toLowerCase() === 'get') {
        res.writeHead(200, commonHeaders);
        renderer.view('header', {}, res);
        renderer.view('search', {}, res);
        renderer.view('footer', {}, res);
        res.end();
    }

    // if URL = / && POST -> redirect to /:studentname
    // 303 - make GET request to another URL, even if original req was POST
    else {
        req.on('data', function(postBody) {
            const query = querystring.parse(postBody.toString());
            res.writeHead(303, { "Location" : "/" + query.username });
            res.end();
        })
    }

}

// handle HTTP route GET /:studentname
function student(req, res) {

    const student_name = req.url.replace("/", "");
    const is_valid = (student_name.length > 0);

    if (!is_valid) { return };

    res.writeHead(200, commonHeaders);
    renderer.view('header', {}, res);

    // get json data
    var studentProfile = new Profile(student_name);
    studentProfile.on("end", function(profileJSON) {

        const { gravatar_url, profile_name, badges, points } = profileJSON;

        const values = {
            gravatar_url,
            profile_name,
            badges: badges.length,
            javascriptPoints: points.JavaScript
        }

        renderer.view('profile', values, res);
        renderer.view('footer', {}, res);
        res.end();

    });

    studentProfile.on("error", function(error) {
        renderer.view('error', { errorMessage: error.message }, res);
        renderer.view('search', {}, res);
        renderer.view('footer', {}, res);
        res.end();
    });

}

module.exports.home  = home;
module.exports.student = student;