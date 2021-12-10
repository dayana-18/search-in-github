# search-in-github

# 00 Prélude
The purpose is to create a simple API using express and a showcase mobile app using Expo (React Native)
You'll have 2 separate projects in the same repository : A server and a client

# The server

Create a directory called server on the search-in-github directory

# 01 Bonjour, Github
Create a postgreSQL database called searchGithub

# 02 Structures
Take a look at the fields https://api.github.com/users/$USERNAME
Using prisma, create tables that we'll allow you to store these attributes.

# 03 Workflow
The purpose is to have a route /users/:username that will take a username string in params and then call the github api to fetch the public informations. On fetch, you must store all datas in your Postgress database using Prisma

Feel free to architect your database and table as you want. To fetch an external API take a look at the package request, isomorphic-fetch, etc.

On a new request, you MUST check before if you have the user informations in your database.

# The client

# 01 Yo, ui
Well, let's visuzalize github users datas !

You MUST initialize your client mobile application using Expo.
The purpose is to display a simple screen that allow a user to type a github username (input) and then validate and display all others informations.

The directory must be app

# Project Setup

cd client
npm start

cd server
yarn init
npm run dev

# Create db with Prisma

npm install prisma --save-dev
npm install @prisma/client   
npx prisma init
npx prisma migrate dev 
npx prisma generate

# Fetch API

npm install node-fetch@2.0.0
npm i --save-dev @types/node-fetch
npm install cors

# Ressources

https://github.com/Gi-jutsu/search-in-github-live-grp1
https://www.prisma.io/docs/getting-started
https://reactnative.dev/docs/getting-started
