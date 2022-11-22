FROM xenyo/ubuntu:latest

# Install PHP
RUN sudo add-apt-repository ppa:ondrej/php -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    php8.1 \
    php8.1-bcmath \
    php8.1-common \
    php8.1-curl \
    php8.1-fpm \
    php8.1-gd \
    php8.1-mbstring \
    php8.1-memcached \
    php8.1-mysql \
    php8.1-opcache \
    php8.1-readline \
    php8.1-xdebug \
    php8.1-xml \
  && sudo service php8.1-fpm start

# Install Apache
RUN sudo add-apt-repository ppa:ondrej/apache2 -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    apache2 \
    libapache2-mod-fcgid \
  && sudo a2enmod \
    proxy_fcgi \
    rewrite \
  && sudo a2enconf php8.1-fpm \
  && sudo a2dissite 000-default.conf \
  && sudo a2ensite drupal.conf \
  && sudo chown -R ubuntu:ubuntu /var/www \
  && sudo chmod -R ug+w /var/www \
  && sudo usermod -a -G www-data ubuntu \
  && sudo usermod -a -G ubuntu www-data \
  && sudo service apache2 start

# Install MySQL client
RUN sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    mysql-client

# Clean up apt cache
RUN sudo rm -rf /var/lib/apt/lists/*

# Copy supervisor config
COPY lamp.supervisord.conf /etc/supervisord/conf.d/lamp.supervisord.conf

# Install Composer
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www
