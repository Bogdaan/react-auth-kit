FROM node:5.10.1

MAINTAINER elliott ro <elliott@techsamurais.com>

# Add user
RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/react/
RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/react
RUN npm install


CMD ["npm", "start"]
