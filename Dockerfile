FROM node:18-bullseye AS base
WORKDIR /usr/src/app
COPY package* .
RUN npm install

FROM base AS development
COPY ./apps/web ./web
COPY ./apps/problems ./problems
EXPOSE 3500
CMD ["npm", "run", "dev"]

FROM base AS production
RUN npm prune --production
COPY ./apps/web ./web
COPY ./apps/problems ./problems
EXPOSE 3500
CMD ["npm", "run", "start"]

FROM base AS submission-webhook-development
COPY ./apps/submission-webhook ./submission-webhook
CMD ["npm", "run", "submission-webhook"]

FROM base AS submission-webhook-production
RUN npm prune --production
COPY ./apps/submission-webhook ./submission-webhook
CMD ["npm", "run", "submission-webhook-production"]