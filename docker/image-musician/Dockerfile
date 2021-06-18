FROM node:14.17.1

WORKDIR /opt/app

COPY src /opt/app
RUN npm i
ENTRYPOINT ["node", "/opt/app/musician.js"]