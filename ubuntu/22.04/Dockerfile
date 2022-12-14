FROM ubuntu:22.04

# Set timezone
ENV TZ=Asia/Hong_Kong

# Set ubuntu mirror
RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//http:\/\/mirror.xtom.com.hk\/ubuntu\//' /etc/apt/sources.list

# Install packages
RUN apt-get update; \
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
    cron \
    curl \
    git \
    less \
    locales \
    nano \
    patch \
    rename \
    rsync \
    software-properties-common \
    ssh \
    sudo \
    supervisor \
    tzdata \
    unzip \
    vim \
    wget \
    zip

# Clean up apt cache
RUN rm -rf /var/lib/apt/lists/*

# Set up locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Set up supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set up sshd
COPY sshd.conf /etc/ssh/sshd_config.d/sshd.conf

# Set up startup script
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

# Start services
RUN service ssh start \
  && service cron start

# Create ubuntu user
RUN adduser --disabled-password --gecos '' ubuntu \
  && echo 'ubuntu:ubuntu' | chpasswd \
  && usermod -a -G sudo ubuntu \
  && echo 'ubuntu ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/ubuntu

# Switch to ubuntu user
USER ubuntu
WORKDIR /home/ubuntu

# Extend .bashrc
RUN echo 'export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ "' >> .bashrc \
  && echo 'umask 0002' >> .bashrc

# Install Node.js
ENV NVM_DIR /home/ubuntu/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
  && . .nvm/nvm.sh \
  && nvm install --lts \
  && npm config set -g audit false \
  && npm config set -g fund false \
  && npm i -g npm

# Set entrypoint
ENTRYPOINT [ "sudo", "supervisord" ]
