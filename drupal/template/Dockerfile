FROM xenyo/lamp:php{{php_version}}

# Set up apache
RUN rm -r /var/www/html
COPY drupal.conf /etc/apache2/sites-available/drupal.conf
RUN sudo a2enmod rewrite \
  && sudo a2dissite 000-default.conf \
  && sudo a2ensite drupal.conf

# Install Drush Launcher
RUN curl -OL https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar \
  && chmod +x drush.phar \
  && sudo mv drush.phar /usr/local/bin/drush

# Set up Drupal cron job
COPY drush-cron /etc/cron.d/drush-cron

# Set working directory
WORKDIR /var/www/html
