FROM node:18

WORKDIR /app

COPY package.json .

COPY ./src /app/src

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
