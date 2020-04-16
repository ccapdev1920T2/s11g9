# Alyansang Tapat sa Lasallista Forum Website
This a forum website for the oldest political organization of De La Salle University, Alyansang Tapat sa Lasallista (TAPAT). Tapat values "freedom of speech", thus, a forum would be an avenue for anyone to express their opinions about current social issues in our society today. With this, we carry with us the common goal of Tapat, which is to build a Just and Free Society. 

## How to run the web application
### MongoDB
#### Prerequisities
- [MongoDB](https://www.mongodb.com/download-center/community)
- [MongoDB Compass](https://www.mongodb.com/download-center/compass)
#### Setting up the database
1. Run **mongod.exe**.
2. Make a DB named **nodekb** in MongoDB Compass.
3. Import the JSON files using MongoDB Compass found in `\model` with the respective names: nodekb-users, and nodekb-posts.
### Project Folder
1. Install dependencies on the **project** command line: `npm install`
2. Run index.js by executing `node index.js` on the command line. You should see the following:
```
App listening at port 3000
Connected to MongoDB
```
3. Go to http://localhost:3000/.

## Running the tests
### Register/Login/Edit Profile/Logout
These features are located at the bottom of the home page, which can be accessed through the navigation bar by clicking **LOGIN** (not logged in) or **PROFILE** or scroll down at the bottom of the home page.
#### Register as Member/User
Click on **SIGN UP** and fill in the necessary information.
#### Login
Login using the username and password you used to register or choose one of the following:
| Username | Password | Type |
| ----------- | ----------- | ----------- |
| carlobear | 1234 | Admin |
| gabosaur | 1234 | Admin |
| mamakate | asdf | Regular |
#### Edit Profile
Click **EDIT PROFILE** and fill in the necessary information that you would want to change.
> This feature edits all the details of your profile, except username. To the information that you want to maintain, please input your original information.
#### Logout
Click **LOGOUT**.

### Forum
The forum is located above the Login/Profile section, which can be accessed through the navigation bar by clicking **FORUM** or scroll down at the bottom of the home page.
#### View a Post
Click on any of the posts displayed on the section.
#### View All Posts
Click on the **View All Posts** on the section.
#### Add discussion/post
Only users (whether regular or admin) can post. Click on the **Add a discussion** button and fill in the necessary information.

## Dependencies
- Body Parser
- Express
- Express Session
- HBS
- Moment
- MongoDB
- Mongoose
- Passport
- Passport Local
- Passport Local Mongoose
- Validator

## Authors
- Julianne Magbitang
- Gabriel Marcelo
- Carlo Santos
