# syntax=docker/dockerfile:1.7
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm install --no-audit --no-fund --prefer-offline

COPY . .

EXPOSE 5173 3001
