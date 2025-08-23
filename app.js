const Form = require('./models/form');
const View = require('./models/view'); 
const ViewSecond = require('./models/viewsecond'); 

require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/home', (req, res) => {
    res.render('home')
})
app.post('/form', async (req, res) => {
    const { name, mobile, project } = req.body.form;
    const form = new Form({ name, mobile, project });
    await form.save();
    res.render('thanksform');
})
app.post('/view', async (req, res) => {
    try {
      const { name, phoneNumber } = req.body;
      const form = new View({ name, mobile: phoneNumber });
      await form.save(); 
      res.render('thanksone');
    } catch (error) {
      console.error("Error saving View:", error);
      res.status(500).send("Error saving data");
    }
  })
  app.post('/viewsecond', async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        const form = new ViewSecond({ name, phoneNumber });
        await form.save();
        
        res.redirect('/#view-hidden');
    } catch (error) {
        console.error("Error saving ViewSecond:", error);
        res.status(500).json({ 
            success: false, 
            error: "Error saving data" 
        });
    }
});
const port = 3000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});
