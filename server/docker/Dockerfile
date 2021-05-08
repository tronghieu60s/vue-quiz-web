FROM node:10-alpine

WORKDIR /app

COPY ./package*.json ./

RUN yarn install

COPY ./ ./

EXPOSE 4000

USER node

CMD [ "yarn", "dev" ]