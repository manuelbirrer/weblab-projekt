FROM node:20.11.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.11.0
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["node", "dist/server.js"]