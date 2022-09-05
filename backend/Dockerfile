FROM node:16.14.0-alpine
ENV NODE_ENV=development
ENV PATH /app/node_modules/.bin/:$PATH
# ENV PATH /app/node_modules/node-dev/.bin:$PATH

WORKDIR /app

COPY ./backend/package.json .

COPY ./backend/package-lock.json .

RUN npm install && npm cache clean --force

copy . .

WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "run", "dev"]