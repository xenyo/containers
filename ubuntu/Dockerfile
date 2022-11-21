FROM ubuntu:latest

# Build image non-interactively
ARG DEBIAN_FRONTEND=noninteractive

# Set ubuntu mirror
RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//http:\/\/mirror.xtom.com.hk\/ubuntu\//' /etc/apt/sources.list

# Install packages
RUN apt-get update; \
  apt-get install -y \
    curl \
    git \
    less \
    nano \
    openssh-client \
    openssh-server \
    openssh-sftp-server \
    patch \
    python3 \
    rename \
    rsync \
    software-properties-common \
    ssh-import-id \
    sudo \
    supervisor \
    tzdata \
    unzip \
    vim \
    wget \
    zip

# Create user
RUN adduser --disabled-password --gecos '' ubuntu \
  && usermod -a -G sudo ubuntu \
  && echo 'ubuntu ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/ubuntu
USER ubuntu
WORKDIR /home/ubuntu

# Customize prompt
RUN echo 'export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ "' >> .bashrc
