FROM node:14.17.3-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY /prisma/* /app/prisma/
RUN npx prisma generate /app/prisma/schema.prisma
COPY . ./
RUN yarn build && yarn --production

FROM node:14.17.3-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 3000
EXPOSE 4000
ENTRYPOINT [ "node", "dist/main.js" ]
