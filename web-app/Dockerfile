FROM node:18-alpine as base

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN touch ./src/styles/output.css

FROM base as dev
CMD npm run dev

FROM base as prod
RUN npm run build && npm run tailwind
CMD npm run start 