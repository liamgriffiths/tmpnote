# [tmpnote](https://tmpnote.xyz)


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

### Setup a [Redis](https://redis.io/) server

An easy way to get this going is to setup a little [Digital Ocean](https://www.digitalocean.com) droplet ($5/mo) and follow [these instructions](https://www.digitalocean.com/community/tutorials/how-to-install-redis-from-source-on-ubuntu-18-04). Make sure to setup the `auth` to password protect it and a [Floating IP](https://www.digitalocean.com/docs/networking/floating-ips/) (free) so you can always access the the server from a static IP.

### Deploy web app to [Netlify](https://www.netlify.com/)

An easy way to deploy the website is fork this repo, then use the following button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/liamgriffiths/tmpnote)

After deploying, setup these environment vars to redis server:
  * `REDIS_HOST` - the IP address or name of host where redis lives.
  * `REDIS_PORT` - the port the server is listening on (6379 is the default).
  * `REDIS_AUTH` - your redis auth password.

## Contributing :octocat:

PRs and issues welcome, thanks!
