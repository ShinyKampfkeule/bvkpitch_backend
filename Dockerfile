FROM node
COPY . /app
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 3001
CMD ["npm", "run", "start"]