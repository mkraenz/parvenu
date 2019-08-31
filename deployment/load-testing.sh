#!/bin/bash

function loadTestOnce() {
    local NUMBER_OF_RUNS=1000
    echo "running test ${NUMBER_OF_RUNS} times"
    date +"%T"
    (curl -s "192.168.99.100:31558?[1-${NUMBER_OF_RUNS}]") >>/dev/null
    date +"%T"
}

loadTestOnce
