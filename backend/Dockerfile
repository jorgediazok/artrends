FROM node:24-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install && npm cache clean --force

COPY . ./

RUN npm run build

EXPOSE 3500

CMD ["node", "build/index.js"]