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

To set custom environment variables, create a `.env` file based on
`.env.example`. Make sure to add `.env` to your gitignore.

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
rm -rf /var/www/html
git clone git@github.com:xenyo/my-drupal-project.git /var/www/html
```
