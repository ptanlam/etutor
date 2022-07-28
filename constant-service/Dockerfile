FROM node:16.13.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . ./
RUN yarn build && yarn --production

FROM node:16.13.1-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 3000
EXPOSE 4000
ENTRYPOINT [ "node", "dist/main.js" ]