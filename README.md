# Getting Started with Tic Tac Toe

## Summary 
This project was made with CRA (Create React App). This App, Tic Tac Toe, is designed for the visually impared users. Tools such as NVDA were put into consideration for the UI/UX of this application. The features completed include allowing users to Login, Logout, Register an account, Create a game and Join a game. The features that are yet to complete are the playing and winning of actual game itself.

# Running the App

This project will require a frontend and backend setup. You can play the game on two accounts, simply open an incognito browser and paste the frontend URL (http://localhost:3000) to simulate a second player.
## Running the Frontend

In the project directory (./tictactoe), you can run this command>

### `npm i`

This installs the necessary packages for the application's frontend.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Running the Backend

### `.env file`

A text document labeled `env` file will be provided to you via email. This is the urlString required to connect to MongoDB which is the underlying database to CRUD features of the app.

1. Create a `.env` file in your backend folder.
2. Copy the contents from the text document into your backend folder.
3. Save the `.env` folder and close it.
4. Change directory to backend `cd ./backend`. Then run this command>
### `npm i`

This installs the necessary packages for the application's backend.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000], you can view this in your console.

# Required tools

## MongoDB (Mongoose)
This is the underlying database layer which is used to store User and Games details. Mongoose is used as the ODM (Object -Document Mapper) to help map Models defined in backend to the database. 

## Express
This is the network layer lying above MongoDB & Mongoose. This is used to handle request/response from your `server` in backend. 

## React.js
This is the front-end Javascript library responsible for the UI of the application.

## Node.js
This is the back-end which interlinks Express and MongoDB together, to form the back-end of your tic-tac-toe web application.

# Design Decisions
In assumption of users having NVDA installed, all the components within the application have labels on them. This way, when users navigate within a page using hotkeys, they can hear through audio indication, what the component is about. However, the caveat for this would be in the Tic-Tac-Toe game itself, the boxes/grids do not present as UI friendly. Perhaps, a walkaround would be to have the grids represented as the num-pad on keyboards 1 through 9. Alternatively, it can also be represented as keys on the keyboard (I.e. QWE, ASD, ZXC for each row).

## APIs

### User Routes/APIs
`GET ./` returns all users within the system.\
`POST ./create` takes in a User object (see userModel.js), which requires a username, password, first name and last name.\
`POST ./login` takes in a username and password as string, then compares with the database the username value, before retrieving the hashed password and comparing using bcrypt.\
`GET ./details/:username` takes in a username as the query params, then returns a User object.\

### Game Routes/APIs
`GET ./` returns all games within the system.\
`GET ./allGames/:firstPlayerUsername` takes in a username of the first player, then filters the games and returns all games where firstPlayerName <> the current user. This is to get a list of games that the current user can play.\
`POST ./join` takes in a room name, and secondPlayerUsername referring to the player joining another room. This updates the second player for the game room.\


## Design & Infrastructure Summary
- MongoDB was chosen due to the short time frame, where choosing a RDS database will not offer the same flexibility to setup and add additional fields towards the database. 
- Socket.io was used as the socket connection to facilitate two players joining a room. However, the playing of the game was not implemented due to a lack of technical knowledge on proper socket management.
- In the database, Games stored 2 attributes, `firstPlayerUsername` and `secondPlayerUsername`. This is used to manage the 2 players playing, wherein a room will not be 'joinable' if 2 players are in it already.
- Javascript was chosen over typescript as the project had several uncertainties which weren't clear. As a result, tight-coupling would set the project tempo back and slow it down due to the need to determine the typing if typescript was chosen. However, given better project management and a longer runway, perhaps typescript could be used.

## Architechture Diagram
 > User\
  >> username: String (unique)\
  >> password: String\
  >> firstName: String\
  >> lastName: String\

 > Game\
  >> roomName: String (Unique)\
  >> isActive: Boolean.true\
  >> firstPlayerUsername: String [join User.username]\
  >> secondPlayerUsername: String [join User.username]\
