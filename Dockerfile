FROM node:15.8.0

WORKDIR /usr/src/app

COPY packages*.json ./

RUN npm install

COPY . .

USER node

CMD ["node", "index.js"]
