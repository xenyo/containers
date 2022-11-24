FROM xenyo/ubuntu:22.04

# Install PHP
RUN sudo add-apt-repository ppa:ondrej/php -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    php7.4 \
    php7.4-apcu \
    php7.4-bcmath \
    php7.4-bz2 \
    php7.4-cli \
    php7.4-common \
    php7.4-curl \
    php7.4-fpm \
    php7.4-gd \
    php7.4-iconv \
    php7.4-intl \
    php7.4-mbstring \
    php7.4-mysql \
    php7.4-opcache \
    php7.4-readline \
    php7.4-xdebug \
    php7.4-xml \
    php7.4-zip \
  && sudo service php7.4-fpm start

# Configure PHP
COPY php.ini /etc/php/7.4/fpm/conf.d/30-docker.ini

# Install Composer
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer \
  && composer config --global

# Install Apache
RUN sudo add-apt-repository ppa:ondrej/apache2 -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    apache2 \
    libapache2-mod-fcgid \
  && sudo a2enmod \
    proxy_fcgi \
  && sudo a2enconf php7.4-fpm \
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
