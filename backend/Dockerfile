FROM node:16.14.0-alpine

ENV NODE_ENV=development
ENV PATH /app/node_modules/.bin/:$PATH
ENV PATH /app/node_modules/node-dev/.bin:$PATH

WORKDIR /app/backend

COPY ./package.json ./package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3500

CMD ["npm", "run", "dev"]