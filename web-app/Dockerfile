FROM node:18-alpine as base

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN touch ./src/styles/output.css

FROM base as dev
CMD npm run dev && npm run tailwind:watch

FROM base as prod
RUN npm run build
CMD npm run start && npm run tailwind