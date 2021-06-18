FROM node:14.17.1

WORKDIR /opt/app

COPY src /opt/app

# install dependencies (node_modules dir)
RUN npm i

ENTRYPOINT [ "node", "/opt/app/auditor.js" ]