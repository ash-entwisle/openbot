FROM node:slim

# once bun has an official alpine image, we can use that instead of node:slim

# set working directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install -g bun

# Copy app source
COPY . .

# Issue with bun build/install, once fixed, use this

# # install dependencies
# RUN bun install
# # Bundle app source
# RUN bun pack
# # move target folder to root
# RUN mv target /target   
# # remove source code
# RUN rm -rf /usr/src/app
# # set working directory
# WORKDIR /target

# start app
CMD [ "bun", "start" ]