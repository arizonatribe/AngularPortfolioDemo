# AngularPortfolioDemo
This is a simple demonstration of a website with basic features and navigation written in AngularJS and leveraging Node for simulating real APIs.

## Instructions
This demo is under construction, however currently the express.js server is functional and the API endpoints will respond properly.
For quick demonstration purposes and for easier installation, there is currently no true data store but rather singleton caches local to each `.service.js` in the `server\services` directory.

To launch the mock server for testing the endpoints, first run the following command from the locally installed/clone project folder to install all the third-party dependencies:

```
npm install
```

Then run the following command to start up the server:

```
grunt devmock
```

Now you can attempt to send requests to the mock server:

```
curl -X POST http://localhost:3030/messages
>> rem ut eaque porro ullam qui accusantium dolorum quas qui animi officia sed ...
curl -G http://localhost:3030/messages
{"Messages":["rem ut eaque porro ullam qui accusantium dolorum quas qui animi officia sed ..."]}
```

## Viewing Documentation
Due to the way the code is documented throughout the application we can use a Grunt plugin which generates browsable structured documentation. To view this documentation, first enter this command once you're inside the project root folder:

```
grunt all-documentation
```

Then, browse to the `docs/code/` folder it just generated and open the __index.html__ page in your web browser.

You should then see the code class structure and detailed descriptions of classes and methods in a navigation pane on the left.