# Giphy

Installation guide:

REQUIRED!
* configure API-KEY in config.js file located in src directory (the api key from giphy.com free registration)
The execution/installation is basic by docker-compose 
```sh
docker-compose up --build
```
* By default project configured to PORT 399

# About the project:
* The project is simple API usage with caching 3d requests.

## The technologies in project are:
LRU - casheing module from npm (memory based)


Responsive front based on:
Angular.js
Bootstrap

Test of cache module based on cahi:
```shell script
npm test
```
