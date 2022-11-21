#!/bin/bash

set -e
cp -R /tmp/.ssh /home/ubuntu/.ssh
chown -R ubuntu:ubuntu /home/ubuntu/.ssh
find /home/ubuntu/.ssh -type d -exec chmod 700 {} \;
find /home/ubuntu/.ssh -type f -exec chmod 600 {} \;
