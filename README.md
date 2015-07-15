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
