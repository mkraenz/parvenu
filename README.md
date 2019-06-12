[![Build Status](https://travis-ci.com/proSingularity/parvenu.svg?branch=master)](https://travis-ci.com/proSingularity/parvenu)
[![codecov](https://codecov.io/gh/proSingularity/parvenu/branch/master/graph/badge.svg)](https://codecov.io/gh/proSingularity/parvenu)

# Parvenu

Play now at [https://prosingularity.github.io/parvenu/](https://prosingularity.github.io/parvenu/).

Or on [Google Cloud Engine](34.90.37.206:80) 

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
npm run build && docker-compose up
```

In your browser, navigate to [localhost:8080](http://localhost:8080).

## Deployment

Continuous deployment to github pages [https://prosingularity.github.io/parvenu/](https://prosingularity.github.io/parvenu/) is performed on each push to `master`.

At the same time, a new Docker image is published to [Parvenu's Docker Hub repository](https://cloud.docker.com/u/nonbiri/repository/docker/nonbiri/parvenu).

See [.travis.yml](.travis.yml).

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
