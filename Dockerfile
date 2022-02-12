FROM node:16-alpine

LABEL maintainer="Edouard Demotes<edouard@tractr.net>"

# Add sources
ADD . /app
WORKDIR /app

# Build app
RUN npm install
RUN npm run build

# Define entrypoint
ENTRYPOINT ["npm", "start"]
