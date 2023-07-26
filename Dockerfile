FROM node:slim

# once bun has an official alpine image, we can use that instead of node:slim

# set working directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install -g bun
RUN apt install lua
RUN apt install python3

# Copy app source
COPY . .

# install bun dependencies
RUN bun install

# run unit tests
RUN bun test

# start app
CMD [ "bun", "start" ]