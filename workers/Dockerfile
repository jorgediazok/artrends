FROM mcr.microsoft.com/playwright

WORKDIR /app
COPY ./package.json ./package-lock.json ./

RUN npm install && npm cache clean --force

COPY . ./

RUN npm i -g pm2

RUN npm run build

CMD ["pm2-runtime", "build/index.js", "--max-memory-restart 300M"]