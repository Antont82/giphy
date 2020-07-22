#FROM node:alpine
FROM node:10

WORKDIR '/var/www/src'

COPY package.json ./

RUN npm install

COPY src .

CMD ["npm","start"]