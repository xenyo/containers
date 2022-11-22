FROM ubuntu:22.04

# Set timezone
ENV TZ=Asia/Hong_Kong

# Set ubuntu mirror
RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//http:\/\/mirror.xtom.com.hk\/ubuntu\//' /etc/apt/sources.list

# Install packages
RUN apt-get update; \
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
    build-essential \
    curl \
    git \
    less \
    memcached \
    nano \
    openssh-client \
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

# Clean up apt cache
RUN rm -rf /var/lib/apt/lists/*

# Set up supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ENTRYPOINT [ "sudo", "supervisord" ]

# Add startup script
COPY startup.sh /startup.sh

# Create ubuntu user
RUN adduser --disabled-password --gecos '' ubuntu \
  && usermod -a -G sudo ubuntu \
  && echo 'ubuntu ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/ubuntu
USER ubuntu
WORKDIR /home/ubuntu

# Customize prompt
RUN echo 'export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ "' >> .bashrc

# Install nvm, node, npm and pnpm
ENV NVM_DIR /home/ubuntu/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
  && . .nvm/nvm.sh \
  && nvm install --lts \
  && npm i -g npm pnpm
