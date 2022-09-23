# Express Server with CI/ CD

This repository demostrates making a simple REST API with Express and Node.
It includes authorization, authentication functionality with Firebase
as well as the ability to cache results into Redis.

Instead of using a database and hosting it online, we use local data for users.

Interacting with the `POST`, `PUT` and `DELETE` commands will change the contents of the file.

## Setup

To setup after cloning, run `npm install` to install all necessary packages.

Once done, run the node server using `npm start`.

It is automatically configured to run on PORT 8080.

## Testing

For testing our API, we use the dependencies `mocha`, `chai` and `chai-http`.

To run the unit tests, run `npm test`.

## API details

For Authorization and Authentication:

Our API supports two types of users, viewers, logged in viewers and admins. 

Normal viewers are not authenticated, that is to say, they can only view the bare minimum.

To see what a normal viewer can access, refer to `userRouter`.

Logged in users can get access to extra data as they are authenticated users.
To authenticate a user, you would have to login with an email and a password.

However, logged in users may not be authorized to all data, 
and some data are protected only for those with an 'admin' role.

To see what a logged in user and admin can access, refer to `adminRouter`.
We provide authentication and authroization checks in `middleware`.

<br>

For Redis caching:

We are reading data from this [API](https://www.fishwatch.gov/api/species),
which contains a huge chunk of data about many different types of fishes.

To prevent our server from repeatedly querying this endpoint, 
we cache the result into our Redis cache with a current TTL of 30s.

When fetching fish data, take note of the key `fromCache` in our JSON response, 
as having it to `true` means that we are reading from cache 
while having it to `false` means that we are reading from the endpoint.
