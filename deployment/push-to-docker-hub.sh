#!/bin/bash

# NOTE: env vars set by travis, or in travis repository settings
docker build . --tag "$DOCKER_USERNAME/$DOCKER_REPO:$TRAVIS_BRANCH-$TRAVIS_JOB_NUMBER"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push $DOCKER_USERNAME/$DOCKER_REPO:$TRAVIS_BRANCH-$TRAVIS_JOB_NUMBER