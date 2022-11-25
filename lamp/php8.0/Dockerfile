FROM xenyo/ubuntu:22.04

# Install PHP
RUN sudo add-apt-repository ppa:ondrej/php -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    php8.0 \
    php8.0-apcu \
    php8.0-bcmath \
    php8.0-bz2 \
    php8.0-cli \
    php8.0-common \
    php8.0-curl \
    php8.0-fpm \
    php8.0-gd \
    php8.0-iconv \
    php8.0-intl \
    php8.0-mbstring \
    php8.0-mysql \
    php8.0-opcache \
    php8.0-readline \
    php8.0-xdebug \
    php8.0-xml \
    php8.0-zip \
  && sudo service php8.0-fpm start

# Configure PHP
COPY php.ini /etc/php/8.0/fpm/conf.d/30-docker.ini

# Install Composer
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer \
  && composer config --global use-parent-dir true

# Install Apache
RUN sudo add-apt-repository ppa:ondrej/apache2 -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    apache2 \
    libapache2-mod-fcgid \
  && sudo a2enmod \
    proxy_fcgi \
  && sudo a2enconf php8.0-fpm \
  && sudo chown -R ubuntu:ubuntu /var/www \
  && sudo chmod -R ug+w /var/www \
  && sudo usermod -a -G www-data ubuntu \
  && sudo usermod -a -G ubuntu www-data \
  && sudo service apache2 start

# Install MariaDB client
RUN sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    mariadb-client

# Clean up apt cache
RUN sudo rm -rf /var/lib/apt/lists/*

# Copy supervisor config
COPY lamp.supervisord.conf /etc/supervisor/conf.d/lamp.supervisord.conf

# Set working directory
WORKDIR /var/www
