FROM node:18-alpine
WORKDIR /app
RUN apk add openssl
RUN npm install --global serve

COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./public ./public
COPY ./src ./src
COPY ./src/config.js.prod ./src/config.js
COPY ./ssl ./ssl

WORKDIR /app/ssl
RUN sh ./regen.sh


WORKDIR /app
RUN npm run build

# s'il faut distribuer en http :
CMD ["serve", "-s", "build"]

# s'il faut distribuer en https :
# CMD ["serve", "--cors", "-s", "build", "--ssl-cert", "ssl/server.cert", "--ssl-key", "ssl/server.key"]
