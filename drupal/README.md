# xenyo/drupal

An all-in-one Docker LAMP server for Drupal web development.

- DockerHub: https://hub.docker.com/r/xenyo/drupal
- GitHub: https://github.com/xenyo/containers/tree/main/drupal

## Features

- Based on xenyo/lamp
- Document root at /var/www/html/web

## Pre-installed software

- Drush Launcher

## Add to an existing project

Copy `docker-compose.yml` and `.env.example` to your project.

Edit `name:` and `hostname:` in `docker-compose.yml` to suit your project.

Create a `.env` file based on `.env.example` and add `.env` to your gitignore.
Edit `.env` to set custom environment variables.

## Usage

Create and start containers:

```
docker compose up -d
```

Run bash:

```
docker compose exec drupal bash
```

Clone your repository to `/var/www/html`:

```
git clone git@github.com:xenyo/my-drupal-project.git /var/www/html
```
