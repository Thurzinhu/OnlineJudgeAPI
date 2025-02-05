FROM node:18-bullseye AS base
WORKDIR /usr/src/app
COPY package* .
RUN npm install
EXPOSE 3500

FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS production
COPY . .
RUN npm prune --production
CMD ["npm", "run", "start"]