[![Build Status](https://travis-ci.com/proSingularity/parvenu.svg?branch=master)](https://travis-ci.com/proSingularity/parvenu)
[![codecov](https://codecov.io/gh/proSingularity/parvenu/branch/master/graph/badge.svg)](https://codecov.io/gh/proSingularity/parvenu)

# Parvenu

Play now at [https://prosingularity.github.io/parvenu/](https://prosingularity.github.io/parvenu/).

A phaser3 trading simulation game in TypeScript.

## Getting started

### Installing

Assumes you have globally installed

- git
- node.js

Clone the git repository

```
git clone https://github.com/proSingularity/parvenu.git
```

Install dependencies:

```
npm install
```

### Building and Running

Perform a quick build (bundle.js) and start server:

```
npm run dev
```

### Running with Docker

```
# Assumes local installation of Docker.
docker-compose up
```

In your browser, navigate to [localhost:8080](http://localhost:8080).

## Deployment

Continuous deployment is performed on each push to `master` via github pages to

- [prosingularity.github.io/parvenu/](https://prosingularity.github.io/parvenu/) .

At the same time, a new Docker image is published to

- [Parvenu's Docker Hub repository](https://cloud.docker.com/u/nonbiri/repository/docker/nonbiri/parvenu).

Note: The image with tag `latest` is the newest `master`.

See [.travis.yml](.travis.yml).

### Dev deployments and other tools

The latest updated branch gets continuously deployed at

- [parvenu-game.herokuapp.com](https://parvenu-game.herokuapp.com/)

Dashboard for heroku at

- [dashboard.heroku.com/apps/parvenu-game](https://dashboard.heroku.com/apps/parvenu-game)

All exceptions in the game are automatically send to Sentry at

- [sentry.io](https://sentry.io/)

Deployments can also be made with [Google Cloud Engine](https://console.cloud.google.com/kubernetes) in conjunction with Dockerhub. See

- [deployment/parvenu.k8s.yaml](deployment/parvenu.k8s.yaml)

## External Resources

- [Phaser 3 Framework](https://github.com/photonstorm/phaser)
- [Phaser 3 Docs with TypeScript Definition File](https://github.com/photonstorm/phaser3-docs)
- [Phaser 3 Online Docs](https://photonstorm.github.io/phaser3-docs/index.html)
- [Phaser 3 Official Examples](https://github.com/photonstorm/phaser3-examples)
- [Cheat sheets](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets)
- [Template Project - Phaser3 with TypeScript](https://github.com/digitsensitive/phaser3-typescript)

## Helpful tools

- [Pixel Art Maker](http://pixelartmaker.com/)
- [Leshy SpriteSheet Tool](https://www.leshylabs.com/apps/sstool)
- [Littera](http://kvazars.com/littera)
- [MagicTools](https://github.com/ellisonleao/magictools)
- [Tiled](https://www.mapeditor.org)
