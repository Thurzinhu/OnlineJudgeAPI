FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package* .
COPY ./lib ./lib
RUN npm install

FROM base AS web-app
COPY ./apps/web ./web
COPY ./apps/problems ./problems
EXPOSE 3500

FROM web-app AS web-app-production
RUN npm prune --production
CMD ["npm", "run", "web-app"]

FROM web-app AS web-app-development
CMD ["npm", "run", "web-app-dev"]

FROM base AS submission-webhook
COPY ./apps/submission-webhook ./submission-webhook
EXPOSE 4000

FROM submission-webhook AS submission-webhook-production
RUN npm prune --production
CMD ["npm", "run", "submission-webhook"]

FROM submission-webhook AS submission-webhook-development
CMD ["npm", "run", "submission-webhook-dev"]

FROM base AS publish-problems
COPY ./apps/publish-problems ./publish-problems
COPY ./apps/boilerplate-generator ./boilerplate-generator
COPY ./apps/problems ./problems
CMD ["node", "./publish-problems/index.js"]