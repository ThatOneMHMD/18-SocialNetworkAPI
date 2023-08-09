# Back-End-Based Social Network API

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

These are the code files for the corresponding back-end application (leveraging Express.js and NoSQL DB) that functions as a professional Social Network App/API. Once run according to the instructions in the [Installation](#installation) and the [Usage](#usage) sections below, the user will be able to view and add Thoughts or Reactions to others' Thoughts, Friends, and much more! The idea behind this is to demonstrate that if this API is added to a website, then that website is then able to handle large amounts of unstructured data!

## Table of Contents

- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Demo Video](#demo-video)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)

## Demo Video

This video is approximately 10 mins long. Through it, examples of leveraging the API with Insomnia to view, add, update, and delete Thoughts, view, add, delete Reactions and Friends are shown. Please note that his video has no audio.

Link: [https://youtu.be/6xgIx0mrsjU](https://www.youtube.com/watch?v=6h9UkT0QHSo)

## Features

- When the user enters the command to invoke the application, then their server is started, and the Mongoose models are synced to the MongoDB database
- When the user opens API GET routes in Insomnia for users and thoughts, then the data for each of these routes is displayed in a formatted JSON
- When the user tests API POST, PUT, and DELETE routes in Insomnia, then they can successfully create, update, and delete users and thoughts in my database
- When the user tests API POST and DELETE routes in Insomnia, then they can successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Installation

To use your professional Social Network API, "git clone" the repo down to your local so you have the Express/NoSQL project on your local. Then you can follow the usage instruction below in the Usage section.

## Usage

To start the application, follow these steps carefully:

1. Open Integrated Terminal and make sure you are in the right (root) directory
2. Type in "mongod" to start the NoSQL database
3. Open another integrated terminal and type: "npm install" to install all dependencies
4. Once that is done, type in "npm run seed" to seed the data
5. And once that is also done, type in "npm run start" and with that, your API is running on the specified PORT! (shown in the console!
6. Lastly, go into Insomnia (or any other back-end app) and start running the API calls to manage your products! (be careful to follow the same PORT as specified in the Server.js file, and follow the same routes specified and explained in the routes folder!

## License

MIT

## Credits

ThatOneMHMD - The creator of this website!
(Link: https://github.com/ThatOneMHMD)
