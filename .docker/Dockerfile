FROM node:14.20.0
 
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ADD . .

COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

RUN npm install

CMD [ "npm", "run", "dev" ]