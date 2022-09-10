FROM mcr.microsoft.com/playwright

WORKDIR /app/workers

COPY ./workers/package.json ./workers/package-lock.json .

RUN npm install && npm cache clean --force

COPY ./workers .

CMD ["npm", "run", "dev"]