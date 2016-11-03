
//require the necessary libraries to run the application
const express = require("express");
const app = express()
const pg = require('pg');

// the global variable to read the user and password
let connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

//setting the view engine to read from views and read pug
app.set("view engine", "pug")
app.set("views", __dirname + "/views")

// tell express to use the static folder
app.use(express.static('static'))



// reuqesting the form with a get request and rendering the pug form
app.get ("/form", (request, response) =>{
	console.log("Rendering a form ")

	response.render("form")
})

// doing a post request to post the data from the form
app.post('form', (request,response) => {

	pg.connect(connectionString, (err, client, done) => {

		client.query('insert values into messages'(title, body), function(err) {
			if (err) {
				throw err;
			}

			done();
			pg.end();
		})

	})
})










// tell the app to what port to listen to and console log a message when it is running
app.listen(4000, () => {
	console.log("Local server running")
});