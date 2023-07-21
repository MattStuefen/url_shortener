FROM node:16.15.1

ENV NODE_OPTIONS="--max_old_space_size=2048"

COPY ./server/package.json /srv/server/package.json
COPY ./server/package-lock.json /srv/server/package-lock.json
RUN cd /srv/server \
    && npm ci

COPY ./client/package.json /srv/client/package.json
COPY ./client/package-lock.json /srv/client/package-lock.json
RUN cd /srv/client \
    && npm ci

COPY ./client /srv/client
RUN cd /srv/client \
    && npm run lint \
    && npm run test \
    && npm run build

COPY ./server /srv/server
RUN cd /srv/server \
    && npm run lint \
    && npm run test \
    && npm run tsc

CMD ["node", "/srv/server/src/main"]