FROM node:16.13.1-alpine as builder
WORKDIR /app
COPY package*.json /app/
RUN yarn 
COPY . /app/
RUN yarn build && yarn --production

FROM node:16.13.1-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
USER node
EXPOSE 3000
ENTRYPOINT [ "node", "/app/dist/main" ]
