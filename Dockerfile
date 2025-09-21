# FROM node:20-alpine as development
FROM node:20-alpine as development
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
RUN yarn build


FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --prod
RUN mkdir -p /app/src/protos
COPY ./src/protos/* /app/src/protos/

COPY --from=development /app/dist ./dist
CMD ["yarn", "start:prod"]