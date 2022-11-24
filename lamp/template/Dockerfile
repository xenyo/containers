FROM xenyo/ubuntu:22.04

# Install PHP
RUN sudo add-apt-repository ppa:ondrej/php -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    php{{php_version}} \
    php{{php_version}}-apcu \
    php{{php_version}}-bcmath \
    php{{php_version}}-bz2 \
    php{{php_version}}-cli \
    php{{php_version}}-common \
    php{{php_version}}-curl \
    php{{php_version}}-fpm \
    php{{php_version}}-gd \
    php{{php_version}}-iconv \
    php{{php_version}}-intl \
    php{{php_version}}-mbstring \
    php{{php_version}}-mysql \
    php{{php_version}}-opcache \
    php{{php_version}}-readline \
    php{{php_version}}-xdebug \
    php{{php_version}}-xml \
    php{{php_version}}-zip \
  && sudo service php{{php_version}}-fpm start

# Configure PHP
COPY php.ini /etc/php/{{php_version}}/fpm/conf.d/30-docker.ini

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
  && sudo a2enconf php{{php_version}}-fpm \
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
