## Execution instructions

First build client code by running the following commands:
 - cd ./client
 - npm ci
 - npm run build
 - cd ..

Then run the server code as follows:
 - cd ./server
 - npm ci
 - npm run start

Take a look at './.build/Dockerfile' for the exact instructions used by the build server.

By default, an in-memory mock database will be used.  To use a Postgres instance, create a db and set the following
environment variables:

 - SQL_HOST - host name
 - SQL_PORT - port number - defaults to 5432
 - SQL_DB - db name
 - SQL_USER - username
 - SQL_PASS - password
