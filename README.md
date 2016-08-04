# CI-Server starter project

This starter project will get participants up and running for the React/Redux
class.

## Requirements

- Node 6.0+

## Installation

Clone the repository then, from a terminal window run:

    $ npm install

This may take a while as all dependencies are downloaded and installed.

The starter project comes with a back-end service that exposes an HTTP/JSON API.
From a terminal window, start the web server with the following command:

    $ npm run start

You may try out the API by going to [http://localhost:3000/projects](http://localhost:3000/projects).
Leave the server running while developing.

The ECMAScript code that runs in the browser needs to be transpiled from
ES6/ES7/JSX to ES5. Webpack is used to dynamically transpile and bundle
the application. From another terminal window, start the webpack development
server with this command:

    $ npm run start-dev-server

Leave the webpack dev server running while developing.

Once everything is started, go to [http://localhost:3000/](http://localhost:3000/).
If everything worked, you should see a nice message!
