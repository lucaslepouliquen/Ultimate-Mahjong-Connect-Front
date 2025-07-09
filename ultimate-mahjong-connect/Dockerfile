# --- Build Stage ---
FROM node:23-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:23-alpine3.20

WORKDIR /app

RUN npm install -g http-server

COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD ["http-server", "dist/ultimate-mahjong-connect", "-p", "8080", "--disable-host-check"]