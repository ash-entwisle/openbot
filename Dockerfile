# image for building bun
FROM oven/bun:alpine as builder

WORKDIR /app/

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
# RUN addgroup -S bot 
# RUN adduser -S bot -G bot
# RUN chown -R bot:bot /app

# switch to non priviledged user
# USER bot

# start app
CMD [ "bun", "run", "main.js" ]