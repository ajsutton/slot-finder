# Choose alpine base image
FROM node:alpine3.17
# Set working directory
WORKDIR /usr/src/app
# Copy package.json and yarn.lock to working directory
COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install
# Copy ARG to ENV
ARG NODE_ARG
# Set docker ARG to ENV
ENV NODE_ENV $NODE_ARG
# Copy all files to working directory
COPY . .
# Build the app
RUN yarn build
# Expose port 8080
EXPOSE 8080
# Run the app
CMD [ "yarn", "serve" ]



