FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
