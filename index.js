module.exports = function (data = {}) {

    // Prepare Express
    let app = null;
    let bodyParser = null;

    // Path Page
    let path_page = {
        post: '*',
        get: '*'
    };

    // Exist Data
    if (typeof data !== "function" && typeof data !== "undefined" && data) {

        // Express
        if (data.express) {

            // Insert Express
            app = express();

            // Prepare Helmet
            try {
                const helmet = require('helmet');
                app.use(helmet());
            } catch (err) { }

            // Prepare Body Parser
            try {
                bodyParser = require('body-parser');
            } catch (err) { }

        } else if (data.app) {
            app = data.app;
        }

        // Change Path
        if (data.path) {

            // Change Post Path
            if (typeof data.path.post === "string") {
                path_page.post = data.path.post;
            }

            // Change Get Path
            if (typeof data.path.get === "string") {
                path_page.get = data.path.get;
            } else if (data.path.get === null) {
                path_page.get = null;
            }

        }

    }

    // Nope
    else {

        // Get Express
        try {
            express = require('express');
            app = express();
        } catch (err) {
            express = null;
        }

        // Exist Express
        if (express) {

            // Prepare Helmet
            try {
                const helmet = require('helmet');
                app.use(helmet());
            } catch (err) { }

            // Prepare Body Parser
            try {
                bodyParser = require('body-parser');
            } catch (err) { }

        }

    }

    // Is Function
    if (typeof data === "function") {
        data = { post: data };
    }

    // Post
    if (path_page.post && typeof data.post === "function") {

        // Body Parser
        if (bodyParser) {
            app.post(path_page.post, bodyParser.text({ type: '*/*' }), data.post);
        }

        // Nope
        else {
            app.post(path_page.post, data.post);
        }

    }

    // Get
    if (path_page.get) {
        app.get(path_page.get, (req, res) => {

            // HTTP Page
            const http_page = require('puddy-lib/http/HTTP-1.0');
            return http_page.send(res, 403);

        });
    }

    // Result
    return app;

};