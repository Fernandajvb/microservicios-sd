FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN apk add --no-cache openssl
RUN npm ci

COPY . .

# Argumento para saber qué app construir (por defecto backend)
ARG APP_NAME=backend
RUN npx nest build ${APP_NAME}

FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN apk add --no-cache openssl
RUN npm ci --only=production
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

ARG APP_NAME=backend
ENV APP_MAIN_FILE=dist/apps/${APP_NAME}/main.js

CMD node ${APP_MAIN_FILE}
