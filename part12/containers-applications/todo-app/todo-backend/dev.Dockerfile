FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install -g nodemon && npm ci

CMD ["nodemon", "index.js"]