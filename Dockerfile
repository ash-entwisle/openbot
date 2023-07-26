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

# start building the main image
FROM frolvlad/alpine-glibc:latest

# install app dependencies
RUN apk add lua5.4
RUN apk add python3
RUN apk add nodejs-current

# copy bun binary
COPY --from=build /tmp/bun-linux-x64/bun /usr/local/bin/bun

# set app working directory
WORKDIR /usr/src/app

# Copy app source
COPY . .

# install bun dependencies
RUN bun install

# run unit tests
RUN bun test

# start app
CMD [ "bun", "start" ]