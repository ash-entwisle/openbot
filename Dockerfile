# image for building bun
FROM frolvlad/alpine-glibc:latest as build

# set working directory
WORKDIR /tmp

# install unzip
RUN apk --no-cache add unzip

# download bun binary
ADD https://github.com/oven-sh/bun/releases/latest/download/bun-linux-x64.zip bun-linux-x64.zip

# unzip bun binary
RUN unzip bun-linux-x64.zip

# test bun binary
RUN ./bun-linux-x64/bun --version

# start building the main image
FROM frolvlad/alpine-glibc:latest

# deps for eval command, remove if needed # install app dependencies
# RUN apk add lua5.4
# RUN apk add python3
# RUN apk add nodejs-current

# copy bun binary
COPY --from=build /tmp/bun-linux-x64/bun /usr/local/bin/bun

# set app working directory
WORKDIR /app/

# Copy app source
COPY . .

# install bun dependencies
RUN bun install

# run unit tests
RUN bun test

# TODO: add non-root user for running the app, dk why its not working currently :(

# start app
CMD [ "bun", "start" ]