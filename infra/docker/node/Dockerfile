FROM node:18-alpine3.17 AS base

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
