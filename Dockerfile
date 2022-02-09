FROM node:16-alpine

# Add sources
ADD . /app
WORKDIR /app

# Build app
RUN npm install
RUN npm run build

# Define entrypoint
ENTRYPOINT ["npm", "start"]
