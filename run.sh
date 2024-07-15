#!/bin/bash

docker-compose down

# Install dependencies
docker-compose build

# Run all necessary parts of the codebase
docker-compose up
