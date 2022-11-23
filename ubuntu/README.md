# xenyo/ubuntu

A Docker development environment based on Ubuntu.

- DockerHub: https://hub.docker.com/r/xenyo/ubuntu
- GitHub: https://github.com/xenyo/containers/tree/main/ubuntu

## Features

- Based on ubuntu official image
- Added limited sudo user `ubuntu`
- Uses supervisord for process management
- Copies .ssh from host to container

## Pre-installed software

- Common development tools
- Node.js

## Add to an existing project

Copy `docker-compose.yml` to your project.

Edit `name:` and `hostname:` in `docker-compose.yml` to suit your project.

## Usage

Create and start containers:

```
docker compose up -d
```

Run bash:

```
docker compose exec ubuntu bash
```
