FROM mcr.microsoft.com/playwright

WORKDIR /app/workers

COPY ./package.json ./package-lock.json ./

RUN npm install && npm cache clean --force

COPY . ./

CMD ["npm", "run", "start"]