# Install dependencies only when needed
FROM node:16-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app/frontend

# Install dependencies based on the preferred package manager
COPY ./frontend/package.json ./frontend/package-lock.json* ./
RUN npm ci

COPY ./frontend .

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "dev"]