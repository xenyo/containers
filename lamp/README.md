# xenyo/lamp

An all-in-one Docker LAMP server for web development.

- DockerHub: https://hub.docker.com/r/xenyo/lamp
- GitHub: https://github.com/xenyo/containers/tree/main/lamp

## Features

- Based on xenyo/ubuntu
- Increased PHP memory limit and upload max size
- Empty MySQL root password

# Pre-installed packages

- PHP-FPM
- Common PHP extensions
- Composer
- Apache server
- MariaDB server

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
