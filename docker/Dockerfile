FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "start:prod"]
