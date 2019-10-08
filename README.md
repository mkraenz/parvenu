[![Build Status](https://travis-ci.com/proSingularity/parvenu.svg?branch=master)](https://travis-ci.com/proSingularity/parvenu/builds)
[![codecov](https://codecov.io/gh/proSingularity/parvenu/branch/master/graph/badge.svg)](https://codecov.io/gh/proSingularity/parvenu)
[![dependencies](https://david-dm.org/proSingularity/parvenu.svg)]()
[![Dependabot](https://badgen.net/dependabot/dependabot/dependabot-core/?icon=dependabot)](https://app.dependabot.com/accounts/proSingularity)
[![dockerhub](https://badgen.net/docker/pulls/nonbiri/parvenu)](https://cloud.docker.com/repository/docker/nonbiri/parvenu)

# Parvenu

## Build, Trade, Automate

**[>> PLAY NOW on github.io! <<](https://prosingularity.github.io/parvenu/)**

Parvenu - Build, Trade, Automate. A phaser 3 economy simulation game written in TypeScript. Inspired by [Patrizier 2 & 3](https://en.wikipedia.org/wiki/Patrician_II:_Quest_for_Power), [Port Royale 2](https://en.wikipedia.org/wiki/Port_Royale_2), and [X2: The Thread](https://en.wikipedia.org/wiki/X2:_The_Threat).

Can't wait to play the newest features? Try our dev deployments:
[Deployment of latest CI pipeline at Heroku](https://parvenu-game.herokuapp.com/)

## Getting started

### Initial setup

Assumes you have globally installed

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/en/) (comes with npm)

```
git clone https://github.com/proSingularity/parvenu.git

# Install npm dependencies, build and start dev server
npm run sanity-check

# wait. Installing all dependencies might take a while. After a few minutes, your web browser opens and the game starts.
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

### Other Tools

Note: The image with tag `latest` is the newest `master`.

- [Travis CI](https://travis-ci.com/proSingularity/parvenu/builds)
- [Codecov](https://codecov.io/gh/proSingularity/parvenu)
- [Deployment of latest CI pipeline at Heroku](https://parvenu-game.herokuapp.com/)
- [Heroku Dashboard](https://dashboard.heroku.com/apps/parvenu-game)
- [Docker Hub](https://cloud.docker.com/u/nonbiri/repository/docker/nonbiri/parvenu)
- [Sentry](https://sentry.io/)
- [Dependabot](https://app.dependabot.com/)

See also [.travis.yml](.travis.yml).

Deployments can also be made with [Google Cloud Engine](https://console.cloud.google.com/kubernetes) in conjunction with Dockerhub. See

- [deployment/parvenu.k8s.yaml](deployment/parvenu.k8s.yaml)

### Debugging

#### Mocha tests

Use the debug config for mocha tests inside of VS Code. Simply start from the debugger.

#### Inside web browser

- `google-chrome localhost:8080` # or firefox etc
- open Developer tools (`Ctrl` + `Shift` + `i`)
- goto tab Sources
- `Ctrl` + `P` to open file search and write `.ts` file name, for example `TableScene.ts`
- click on the line number to add a breakpoint
- wait for breakpoint to be triggered if the line is in, for example, the `update()` method
- or trigger the breakpoint by clicking on a respective button
- or reload the website if the breakpoint is inside of a `create()` method

## External Resources

- [Phaser 3 Framework](https://github.com/photonstorm/phaser)
- [Phaser 3 Online Docs](https://photonstorm.github.io/phaser3-docs/index.html)
- [Phaser 3 Official Examples](https://github.com/photonstorm/phaser3-examples)
- [Template Project - Phaser3 with TypeScript](https://github.com/digitsensitive/phaser3-typescript)

## Helpful tools

- [Pixel Art Maker](http://pixelartmaker.com/)
- [Leshy SpriteSheet Tool](https://www.leshylabs.com/apps/sstool)
- [Littera](http://kvazars.com/littera)
- [MagicTools](https://github.com/ellisonleao/magictools)
- [Tiled](https://www.mapeditor.org)
- [game-icons.com](https://game-icons.net)
- [flaticon.com](https://www.flaticon.com)
