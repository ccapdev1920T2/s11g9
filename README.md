# Alyansang Tapat sa Lasallista Forum Website
This a forum website for the oldest political organization of De La Salle University, Alyansang Tapat sa Lasallista (TAPAT). Tapat values "freedom of speech", thus, a forum would be an avenue for anyone to express their opinions about current social issues in our society today. With this, we carry with us the common goal of Tapat, which is to build a Just and Free Society. 
## How to run the web application
### Option 1: Heroku Link
http://tapat-website.herokuapp.com/
### Option 2: Running locally
#### MongoDB
##### Prerequisities
- [MongoDB](https://www.mongodb.com/download-center/community)
- [MongoDB Compass](https://www.mongodb.com/download-center/compass)
##### Setting up the database
1. Run **mongod.exe**.
2. Make a DB named **nodekb** in MongoDB Compass.
3. Import the JSON files using MongoDB Compass found in `\model\data` with the respective names: nodekb-users, nodekb-posts, nodekb-tokens, and nodekb-counts.
#### Project Folder
1. Install dependencies on the **project** command line: `npm install`
2. Run index.js by executing `node index.js` on the command line. You should see the following:
```
App listening at port 3000
Connected to MongoDB
```
3. Go to http://localhost:3000/.

## Running the tests
### User Features
These features are located at the bottom of the home page, which can be accessed through the navigation bar by clicking **LOGIN** (not logged in) or **PROFILE** or scroll down at the bottom of the home page.
#### Register as Member/User
Click on **SIGN UP** and fill in the necessary information. Upon registration, you will be sent an email to verify your email address. The verification will allow you to log in. All new users will be given a **Regular** user type.
#### Login
After verification, login using the username and password you used to register, or choose one of the following to log in:
| Username | Password | Type |
| ----------- | ----------- | ----------- |
| carlobear | bear | Admin |
| gabosaur | 1234 | Admin
| katemagbitang | tapatccs | Regular |
#### Edit Profile
Click **EDIT PROFILE** and fill in the necessary information that you would want to change.
> This feature edits only the **first** and **last name**, as well as the **password**. To the information that you want to maintain, please input your original information or go back to the Home page.
#### Logout
Click **LOGOUT**.
### Admin User Features
These features are only applicable to the Admin users.
#### Promote to Admin
Click **PROMOTE TO ADMIN** and on the drop-down, select a Regular user to become an Admin User.
#### Resign as Admin
Click **PROMOTE TO ADMIN** and at the bottom of the drop-down, click the button labeled **RESIGN AS ADMIN**, making you a Regular user. It will direct you back to the Home page, and the **PROMOTE TO ADMIN** button is gone.

### Forum Features 
The forum is located above the Login/Profile section, which can be accessed through the navigation bar by clicking **FORUM** or scroll down at the bottom of the home page.
#### View a Post
Click on any of the posts displayed on the section.
#### View All Posts
Click on the **View All Posts** on the section.
#### Search Posts
Go to the **View All Posts**. You will see a search bar where you can find a specific post based on your search. The search result is based on the title of the posts.
#### Add discussion/post
Only users (whether Regular or Admin) can post. Click on the **Add a discussion** button and fill in the necessary information.
#### Edit Post
Users will go to their post's page, then click on **Edit** located at the bottom of the post.
#### Delete Post
Users will go to their post's page, then click on **Delete** located at the bottom of the post.
#### Add Comment
Users can comment on any post by typing their initial comment on the post and click **COMMENT**.
#### Edit Comment
> This feature was not implemented.
#### Delete Comment
Click on the **Delete** button to delete your comment on a post.
## Dependencies
- Bcryptjs
- Body Parser
- Crypto
- Express
- Express Session
- HBS
- Moment
- MongoDB
- Mongoose
- Nodemailer
- Passport
- Passport Local
- Passport Local Mongoose
- Validator

## Authors
- Julianne Magbitang
- Gabriel Marcelo
- Carlo Santos
