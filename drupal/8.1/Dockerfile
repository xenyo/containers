# Install Drush Launcher
RUN curl -OL https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar \
  && chmod +x drush.phar \
  && sudo mv drush.phar /usr/local/bin/drush

# Set working directory
WORKDIR /var/www/drupal
