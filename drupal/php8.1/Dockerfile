FROM xenyo/lamp:php8.1

# Set up apache
RUN rm -r /var/www/html
COPY --chown=ubuntu:ubuntu web /var/www/html/web
COPY drupal.conf /etc/apache2/sites-available/drupal.conf
RUN sudo a2enmod rewrite \
  && sudo a2dissite 000-default.conf \
  && sudo a2ensite drupal.conf

# Install Drush Launcher
RUN curl -OL https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar \
  && chmod +x drush.phar \
  && sudo mv drush.phar /usr/local/bin/drush

# Set working directory
WORKDIR /var/www/html
