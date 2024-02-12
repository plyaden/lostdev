#!/bin/bash

# Schritt 1
cd ~/lost/docker

# Schritt 2

sudo service apache2 stop

# Schritt 3

docker-compose down

# Schritt 4

docker-compose up 

# Schritt 5

mamba activate lost

# Schritt 6

cd ~/Documents/Lost/lost/frontend/lost

# Schritt 7
npm start