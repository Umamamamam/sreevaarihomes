// const Form = require('./models/form');
// const View = require('./models/view'); 
// const ViewSecond = require('./models/viewsecond'); 
// const Property = require("./models/Property");
// const SubmitContact = require('./models/SubmitContact');

// // require("dotenv").config();
// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// // const ejsMate = require('ejs-mate');
// const app = express();
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));
// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'));


// const dbUrl = process.env.DB_URL;
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// })


// // __dirname replacement for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve index.html at root
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// // app.get('/home', (req, res) => {
// //     res.render('home')
// // })
// app.post('/form', async (req, res) => {
//     const { name, mobile, project } = req.body.form;
//     const form = new Form({ name, mobile, project });
//     await form.save();
//     res.render('thanksform');
// })
// app.post("/submit-property", async (req, res) => {
//   try {
//     const { fullName, email, phone, propertyType, propertyAddress, propertyDescription } = req.body;

//     const newProperty = new Property({
//       fullName,
//       email,
//       phone,
//       propertyType,
//       propertyAddress,
//       propertyDescription,
//     });

//     await newProperty.save();
//     res.json({ success: true, message: "Property submitted successfully!" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// })
// app.post("/citiesproperty", async (req, res) => {
//   try {
//     const { fullName, email, phone, propertyType, propertyAddress, propertyDescription } = req.body;

//     const newProperty = new Property({
//       fullName,
//       email,
//       phone,
//       propertyType,
//       propertyAddress,
//       propertyDescription,
//     });

//     await newProperty.save();
//     res.json({ success: true, message: "Property submitted successfully!" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// })
// app.post('/view', async (req, res) => {
//     try {
//       const { name, phoneNumber } = req.body;
//       const form = new View({ name, mobile: phoneNumber });
//       await form.save(); 
//       res.render('thanksone');
//     } catch (error) {
//       console.error("Error saving View:", error);
//       res.status(500).send("Error saving data");
//     }
//   })
//   app.post('/viewsecond', async (req, res) => {
//     try {
//         const { name, phoneNumber } = req.body;
//         const form = new ViewSecond({ name, phoneNumber });
//         await form.save();
        
//         res.redirect('/#view-hidden');
//     } catch (error) {
//         console.error("Error saving ViewSecond:", error);
//         res.status(500).json({ 
//             success: false, 
//             error: "Error saving data" 
//         });
//     }
// })
// app.post("/submit-contact", async (req, res) => {
//   try {
//     const { name, phone, email, bhk, agree } = req.body;

//     // Create a new contact document
//     const newContact = new SubmitContact({
//       name,
//       phone,
//       email,
//       bhk,
//       agree
//     });

//     await newContact.save();

//     res.json({ success: true, message: "Contact submitted successfully!" });
//   } catch (err) {
//     console.error("Error saving contact:", err);
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// });


// // const port = 3000;

// // app.listen(port, '0.0.0.0', () => {
// //     console.log(`Listening on port ${port}`);
// // });
// module.exports = app;
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const Form = require("./models/form");
const View = require("./models/view");
const ViewSecond = require("./models/viewsecond");
const Property = require("./models/Property");
const SubmitContact = require("./models/SubmitContact");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // needed for JSON POST requests

// MongoDB connection
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/cities_property.html", (req, res) => {
  res.sendFile(path.join(__dirname, "cities_property.html"));
});
app.get('/property-details/:propertyId', (req, res) => {
  const propertyId = req.params.propertyId;
  res.sendFile(path.join(__dirname, 'public', 'property-details.html?propertyId=${propertyId}'));
});

app.get('/yelahankaabout.html', (req, res) => {
  res.sendFile(path.join(__dirname, "yelahankaabout.html"));
})
app.get('/jiganiabout.html', (req, res) => {
  res.sendFile(path.join(__dirname,"jiganiabout.html"));
})
app.get('/kolarabout.html', (req, res) => {
  res.sendFile(path.join(__dirname,"kolarabout.html"));
})
app.get('/chikkaballapurabout.html', (req, res) => {
  res.sendFile(path.join(__dirname,"chikkaballapurabout.html"));
})


// === Routes ===
app.post("/form", async (req, res) => {
  const { name, mobile, project } = req.body.form;
  const form = new Form({ name, mobile, project });
  await form.save();
  res.send("Thanks for submitting form!");
});

app.post("/submit-property", async (req, res) => {
  try {
    const { fullName, email, phone, propertyType, propertyAddress, propertyDescription } = req.body;

    const newProperty = new Property({
      fullName,
      email,
      phone,
      propertyType,
      propertyAddress,
      propertyDescription,
    });

    await newProperty.save();
    res.json({ success: true, message: "Property submitted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.post("/citiesproperty", async (req, res) => {
  try {
    const { fullName, email, phone, propertyType, propertyAddress, propertyDescription } = req.body;

    const newProperty = new Property({
      fullName,
      email,
      phone,
      propertyType,
      propertyAddress,
      propertyDescription,
    });

    await newProperty.save();
    res.json({ success: true, message: "Property submitted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.post("/view", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const form = new View({ name, mobile: phoneNumber });
    await form.save();
    res.send("Thanks for submitting view form!");
  } catch (error) {
    console.error("Error saving View:", error);
    res.status(500).send("Error saving data");
  }
});

app.post("/viewsecond", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const form = new ViewSecond({ name, phoneNumber });
    await form.save();
    res.redirect("/#view-hidden");
  } catch (error) {
    console.error("Error saving ViewSecond:", error);
    res.status(500).json({
      success: false,
      error: "Error saving data",
    });
  }
});

app.post("/submit-contact", async (req, res) => {
  try {
    const { name, phone, email, bhk, agree } = req.body;

    const newContact = new SubmitContact({
      name,
      phone,
      email,
      bhk,
      agree,
    });

    await newContact.save();
    res.json({ success: true, message: "Contact submitted successfully!" });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Export for Vercel
module.exports = app;
