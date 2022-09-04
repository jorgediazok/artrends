FROM mcr.microsoft.com/playwright

ENV NODE_ENV=development
ENV PATH /app/node_modules/.bin/:$PATH
ENV PATH /app/node_modules/node-dev/.bin:$PATH

WORKDIR /app

COPY ./workers/package.json .

COPY ./workers/package-lock.json .

RUN npm install && npm cache clean --force

copy . .

WORKDIR /app/workers

CMD ["npm", "run", "dev"]