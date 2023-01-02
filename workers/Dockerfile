FROM mcr.microsoft.com/playwright

WORKDIR /app
COPY ./package.json ./package-lock.json ./

RUN npm install && npm cache clean --force

COPY . ./

RUN npm i -g pm2

CMD ["pm2", "start", "build/index.js", "--max-memory-restart 200M"]