FROM xenyo/ubuntu:latest

# Install PHP
COPY supervisor/php8.1-fpm.conf /etc/supervisor/conf.d/php8.1-fpm.conf
RUN sudo add-apt-repository ppa:ondrej/php -y \
  && sudo apt-get update \
  && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y \
    php8.1-fpm \
  && sudo service php8.1-fpm start

# Install Apache
EXPOSE 80
COPY supervisor/apache2.conf /etc/supervisor/conf.d/apache2.conf
COPY apache2/drupal.conf /etc/apache2/sites-available/drupal.conf
COPY apache2/index.html /var/www/drupal/web/index.html
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
