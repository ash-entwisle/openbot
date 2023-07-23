FROM node:slim

# once bun has an official alpine image, we can use that instead of node:slim

# set working directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install -g bun

# Copy app source
COPY . .

# install bun dependencies
RUN bun install

# start app
CMD [ "bun", "start" ]