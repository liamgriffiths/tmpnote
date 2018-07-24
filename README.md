# [tmpnote](https://tmpnote.xyz) :cherries:


A simple clone of the service [privnote.com](https://privnote.com/).

I made this one as a little side-project to experiemnt with a few technologies I
wanted to learn more about, primarily:

* [react-router](https://github.com/ReactTraining/react-router) - client side router
* [react-snap](https://github.com/stereobooster/react-snap) - static page generation
* [loadable-components](https://github.com/smooth-code/loadable-components) - bundle splitting/easy dynamic React imports
* [styled-components](https://www.styled-components.com/) - nice css-in-JS
* [netlify](https://www.netlify.com/) - static website hosting
* [AWS lambda](https://www.netlify.com/docs/functions/) - via netlify for running "serverless" backend

## Setup (local)

```
# the database here is redis, so you'll need that
# (osx install w/ homebrew)
$ brew install redis


# install dependencies
$ npm install

# start the webpack dev server (runs on port 3000)
$ npm start

# start the local netlify lambda server (runs on port 9000)
$ REDIS_AUTH= REDIS_HOST=127.0.0.1 REDIS_PORT=6379 npm run start:lambda
```

## Deployment

### Setup a [redis](https://redis.io/) server

_TODO:_ fill this out a little more :)

1. Setup a digital ocean droplet
2. Install redis
3. Configure redis
4. Configure `ufw`
5. Setup "Floating IP address"

### Deploy web app to netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/liamgriffiths/tmpnote)

After deploying, setup these environment vars to redis server:
  * `REDIS_HOST` - the IP address or name of host where redis lives.
  * `REDIS_PORT` - the port the server is listening on (6379 is the default).
  * `REDIS_AUTH` - your redis auth password.

## Contributing :octocat:

PRs and issues welcome, thanks!
