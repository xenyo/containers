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

## File permissions

The `ubuntu` and `www-data` users have mutual group membership. This means that
the `ubuntu` user is in the `www-data` group and the `www-data` user is in the
`ubuntu` group.

Files in `/var/www/html` must be owned by `ubuntu:ubuntu` or
`www-data:www-data`. None of the files in `/var/www/html` should be owned by
`root`.

When group permissions are set to rw, the files in `/var/www/html` will be
readable and writable by both `ubuntu` and `www-data`.

You can run the following command to reset file permissions:

```
sudo chmod -R ug+w /var/www/html
```
