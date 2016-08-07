FROM node:4-onbuild
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN rm -rf node_modules && npm install && npm install -g bower && bower install --allow-root
EXPOSE 3000
CMD ["npm","start"]
