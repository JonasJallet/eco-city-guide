FROM node:18-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

#CMD [ "executable", "npm run dev", "npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch"]

ENTRYPOINT npm run dev && \
npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch 