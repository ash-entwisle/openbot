# image for building bun
FROM oven/bun:alpine as builder

WORKDIR /app/

RUN apk add --no-cache python3-dev
RUN apk add --no-cache build-base
RUN apk add --no-cache coreutils    
RUN apk add --no-cache pkgconf
RUN apk add --no-cache libtool
RUN apk add --no-cache make
RUN apk add --no-cache gcc
RUN apk add --no-cache clang
RUN apk add --no-cache libc-dev
RUN apk add --no-cache sqlite

# Copy app source
COPY . .

# install bun dependencies
RUN bun install

# run unit tests
# RUN bun test

# Build blob
RUN bun run build

# image for running bun
FROM oven/bun:alpine

WORKDIR /app/

# Copy blob
COPY --from=builder /app/dist/ .


# add non priviledged user
RUN addgroup -S bot 
RUN adduser -S bot -G bot
RUN chown -R bot:bot /app

# switch to non priviledged user
USER bot

# create non privelaged user for eval command
RUN addgroup -S eval
RUN adduser -S eval -G eval

# start app
CMD [ "bun", "run", "main.js" ]