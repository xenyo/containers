# xenyo/ubuntu

A Docker development environment based on Ubuntu.

- DockerHub: https://hub.docker.com/r/xenyo/ubuntu
- GitHub: https://github.com/xenyo/containers/tree/main/ubuntu

## Features

- Based on ubuntu official image
- Added limited sudo user `ubuntu` with umask `0002`
- Uses supervisord for process management
- Copies SSH keys from host to container

## Pre-installed software

- Common development tools
- SSH/SFTP server
- Cron
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

## Connect via SSH

The container allows SSH connections to the `ubuntu` user with no password. No
SSH keys are needed.

The docker compose file will set up the container to listen for SSH connections
on port 22 by default. Start an SSH session:

```
ssh ubuntu@localhost
```

If different port is specified in `.env`:

```
ssh ubuntu@localhost -p 2200
```

After updating the image to a new version, the connection may fail with this
warning:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
...
```

Add the following to your `~/.ssh/config` to skip host key checking for
localhost:

```
NoHostAuthenticationForLocalhost yes
```

## Connect using WinSCP

WinSCP does not support empty password authentication. Use the following
to connect using WinSCP:

| Host | Username | Password |
| --- | --- | --- |
| localhost | ubuntu | ubuntu |
