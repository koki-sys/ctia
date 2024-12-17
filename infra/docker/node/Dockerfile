FROM node:22-slim AS app_common
WORKDIR /app
COPY package.json .
COPY ./src /app/src
EXPOSE 8080

FROM app_common AS app_dev
RUN yarn install
CMD ["yarn", "dev"]

FROM app_common AS app_prod
RUN yarn install --production
CMD ["yarn", "start"]