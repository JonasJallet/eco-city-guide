FROM node:18-alpine as base

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build
RUN touch ./src/styles/output.css

FROM base as dev
CMD npm run dev && npm run tailwind:watch

FROM base as prod
CMD npm run start && npm run tailwind