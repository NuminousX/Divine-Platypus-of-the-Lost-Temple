
//require the necessary libraries to run the application
const express = require("express");
const app = express()
const pg = require('pg');
const bodyParser = require('body-parser');

// the global variable to read the user and password
let connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';
console.log(connectionString)

//setting the view engine to read from views and read pug
app.set("view engine", "pug")
app.set("views", __dirname + "/views")

// tell express to use the static folder
app.use(express.static('static'))

app.use(bodyParser.urlencoded({ extended: true }))


// reuqesting the form with a get request and rendering the pug form
app.get ("/", (request, response) =>{
	console.log("Rendering a form ")

	response.render("index")
})

app.get('/blog', (request, response) => {
	console.log("Rendered the page where all the comments are posted")

	pg.connect(connectionString, (err, client, done) => {
		console.log("connection to the database succesfull")

		client.query("select * from messages", (err, result) => {
			if (err) throw err;

			
			console.log(result)
			done();
			pg.end();
			response.render("blog", {data: result.rows}) 
		})

	})

})


// doing a post request to post the data from the form
app.post('/index', (request,response) => {

	pg.connect(connectionString, (err, client, done) => {

		console.log ("database up and running")
		

		client.query("insert into messages (title, body) values ($1, $2)", [request.body.title, request.body.body], (err, result) => {
			if (err) throw err;
			
			
			done();
			pg.end();	
			response.redirect("/blog")
		})

	})

})








// tell the app to what port to listen to and console log a message when it is running
app.listen(4000, () => {
	console.log("Local server running")
});