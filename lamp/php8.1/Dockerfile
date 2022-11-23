FROM xenyo/ubuntu:22.04

# Install PHP
RUN sudo add-apt-repository ppa:ondrej/php -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    php8.1 \
    php8.1-apcu \
    php8.1-bcmath \
    php8.1-bz2 \
    php8.1-cli \
    php8.1-common \
    php8.1-curl \
    php8.1-fpm \
    php8.1-gd \
    php8.1-iconv \
    php8.1-intl \
    php8.1-mbstring \
    php8.1-mysql \
    php8.1-opcache \
    php8.1-readline \
    php8.1-xdebug \
    php8.1-xml \
    php8.1-zip \
  && sudo service php8.1-fpm start

# Configure PHP
COPY php.ini /etc/php/8.1/fpm/conf.d/30-docker.ini

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
  && sudo a2enconf php8.1-fpm \
  && sudo chown -R ubuntu:ubuntu /var/www \
  && sudo chmod -R ug+w /var/www \
  && sudo usermod -a -G www-data ubuntu \
  && sudo usermod -a -G ubuntu www-data \
  && sudo service apache2 start

# Install MariaDB
RUN sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    mariadb-server \
  && sudo service mariadb start \
  && sudo mysqladmin -uroot password ''

# Clean up apt cache
RUN sudo rm -rf /var/lib/apt/lists/*

# Copy supervisor config
COPY lamp.supervisord.conf /etc/supervisor/conf.d/lamp.supervisord.conf

# Set working directory
WORKDIR /var/www
