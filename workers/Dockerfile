FROM mcr.microsoft.com/playwright

ENV NODE_ENV=development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

ENV PATH /app/node_modules/.bin/:$PATH
ENV PATH /app/node_modules/node-dev/.bin:$PATH

copy . .

CMD ["npm", "run", "dev"]