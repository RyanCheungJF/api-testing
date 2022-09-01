# Express Server with CI Testing

This repository demostrates making a simple REST API with Express and Node.

Instead of using a database and hosting it online, we use local data stored in a json file which be found under `dummy/users.json`.

Interacting with the `POST`, `PUT` and `DELETE` commands will change the contents of the file.

## Setup

To setup after cloning, run `npm install` to install all necessary packages.

Once done, run the node server using `node .`.

It is automatically configured to run on PORT 8080.

## Testing

For testing our API, we use the dependencies `mocha`, `chai` and `chai-http`.

To run the unit tests, run `npm test`.
