##################################################################
# API Spots - BDD Testing API 
# 
# Description
# -----------
# Installs a RESTful API that can be used for executing BDD
# test scenarios written in the Gherkin3 language against
# RESTful APIs.
#
# Author: Chris Spiliotopoulos (@chefArchitect)
##################################################################

# Use latest Ubuntu image
FROM ubuntu:latest

# Install nodejs from repos
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y nodejs-legacy

# Install latest 'npm' service
RUN apt-get install -y npm 

# Install 'forever' service
RUN npm install forever -g

# Install 'wget'
RUN apt-get install -y wget

# Copy sources to a new folder called 'app'
COPY . /app

# Install app dependencies
RUN cd app && npm install

# Set the work directory
WORKDIR /app

# Expose port 3000 (API)
EXPOSE 3000

# Start the app using 'forever' service
CMD node rest/server.js

