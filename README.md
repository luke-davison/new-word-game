# Getting started

This repo contains two projects.  The outer project (with the package.json alongside this readme) is the front end application built with React and TypeScript.  The inner project (in the /api folder) is the server built with Node and TypeScript.

## Running in development mode

First install all required node modules by running `npm install` in both this and the /api folder.

Next in a command prompt run `npm run dev` in the /api folder to start the Node server.

Finally in a separate command prompt run `npm start` in this directory to start a separate server that will allow the app to be run at [http://localhost:3000](http://localhost:3000).

There probably would have been a way to have both these servers start with just one command, but I had already spent enough time configuring TypeScript that this was not high on my priority to try to do.

## Running in production mode

To do.