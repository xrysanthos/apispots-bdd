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

# Use latest Node image
FROM node:latest

# Install 'forever' service
RUN npm install forever -g

# Copy sources to a new folder called 'app'
COPY . /app

RUN node --version

# Install app dependencies
RUN cd app && npm install

# Set the work directory
WORKDIR /app

# Expose port 3000 (API)
EXPOSE 3000

# Start the app using 'forever' service
CMD forever rest/server.js
