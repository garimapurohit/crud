const express = require("express"); // importing express framework 
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");// We store data in JSON files, but Express works with JavaScript objects/arrays,so we use require() to convert JSON data into JS arrays/objects.
const fs =require("fs");

const app = express();
// req.body ko read karne ke liye

// mongodb ko connect krne ke liyee 

mongoose
  .connect("mongodb://127.0.0.1:27017/learning1")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Mongo Error", err);
  });

// first we are defining schema for the user 
const userSchema = new mongoose.Schema({ 
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  jobTittle: String,
});

// schema bnngyaaa now we need to make a model :) 2
const User = mongoose.model("user",userSchema); 
app.use(express.json());
/*  
   /api/users ke liye GET + POST at one place 
*/
// middleware 
// Ye middleware HTML form se aane wale URL-encoded data ko parse karke req.body mein store karta hai.
app.use(express.urlencoded({extended:false}));
 // koi bhii form data aaya usko body mein dalne mein help kregaa 
app.use((req, res, next) => {
fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.url}\n`,
    (err) => {
      if (err) console.log(err);
      next();
    }
  );

});
// WE CAN MAKE MIDDLWARE USING APP.USE'

app.route("/api/users")
  .get((req, res) => {
    res.setHeader("x-myName","garima"); // here we make custom  header in the response :) 
    //while making custom header try to include x as prefix standard way of writing to denote to custom ones 
    // all users bhej deta hai
// const allusers = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));

    return res.json(allusers); 
  })
  // .post(async(req, res) => {
  // const body = req.body; // <-- Add this line
  // users.push({ ...body, id: users.length + 1 }); // <-- Add new user

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
  //   if (err) { 
  //     console.log(err);
  //     return res.status(500).json({ status: "Error writing file" });
  //   }
  //   return res.status(201).json({ status: "Successfully added", user: body });
  // });
//   const body = req.body;

//   if (
//     !body ||
//     !body.firstName ||
//     !body.lastName ||
//     !body.email || 
//     !body.jobTittle
//     )
//     {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//   //   const newUser = await User.create({
//   //     firstName: body.firstName,
//   //     lastName: body.lastName,
//   //     email: body.email,
//   //     gender: body.gender,
//   //     jobTittle: body.jobTittle,
//   //   });

//   //   return res.status(201).json({
//   //     message: "User created successfully",
//   //     user: newUser,
//   //   });
//   // } catch (error) {
//   //   return res.status(500).json({ error: error.message });
//   // }
//   const result =  await User.create({
//     firstName: body.firstName,
//     lastName : body.lastName,
//     email: body.email,
//     jobTittle: body.jobTittle

// });
// console.log(result);

//     return res.status(201).json({
//       message: "User created successfully",
//  });
// }

// .post(async (req, res) => {
//   try {
//     const body = req.body;

//     if (!body.first_name || !body.email || !body.job_tittle) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

// const user = await User.create({
//   firstName: body.first_name,
//   lastName: body.last_name,
//   email: body.email,
//   jobTittle: body.job_tittle,
// });

//     return res.status(201).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// });

//   ///api/users/:id ke liye GET, PATCH, DELETE ek sath 
// app.route("/api/users/:id")
//   .get((req, res) => {
//     // url me jo value hoti h usko params bolte hainn
//     const id = Number(req.params.id);

//     // ek specific user find kar rhe
//     const user = users.find((u) => u.id === id);
//     if (!user) {
//         return res.status(404).json({ status: "User not found" });
//     }
//     return res.status(200).json(user);
//   })
// .post(async (req, res) => {
//   try {
//     const body = req.body;

//     if (!body.firstName || !body.email || !body.jobTittle) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const user = await User.create(body);

//     return res.status(201).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });
.post(async (req, res) => {
    try {
      const body = req.body;

      if (!body.firstName || !body.email || !body.jobTittle) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const user = await User.create(body);

      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

// .patch((req, res) => {
//     // Edit user -- abhi pending
//      const id = Number(req.params.id);
//   const body = req.body;

//   // find user index
//   const index = users.findIndex((u) => u.id === id);
 
//   if (index === -1) {
//     return res.status(404).json({ status: "User not found" });
//   }

//   // update fields
//   users[index] = { ...users[index], ...body };

//   // save to file
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//   if (err) {
//     console.log(err);
//     return res.status(500).json({ status: "error writing file" });
//   } 
//   // send response only after file is written
//   return res.status(200).json({ status: "User updated", user: users[index] });
// })

// .patch((req, res) => {
//   const id = Number(req.params.id);
//   const body = req.body;
//   const index = users.findIndex((u) => u.id === id);

//   if (index === -1) {
//     return res.status(404).json({ status: "User not found" });
//   }

//   users[index] = { ...users[index], ...body };

//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//     if (err) {
//       console.log(err);
//       // added the status code 
//       return res.status(500).json({ status: "error writing file" });
    
//     }
//     return res.status(200).json({ status: "User updated", user: users[index] });
//   });
// })
// .delete((req, res) => {
//     const id = Number(req.params.id);

//     // read latest users from file
//     const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));

//     // find index
//     const userIndex = users.findIndex((u) => u.id === id);

//     if (userIndex === -1) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // remove user
//     users.splice(userIndex, 1);

//     // rewrite file
//     fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));

//     return res.json({ status : "User is deleted from the records!" });
//   });
app.route("/api/users/:id")
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    users[index] = { ...users[index], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "error writing file" });
      }
      return res.status(200).json({
        status: "User updated",
        user: users[index],
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const data = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));
    const userIndex = data.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    data.splice(userIndex, 1);

    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(data, null, 2));

    return res.json({ status: "User is deleted from the records!" });
  });

/*
  Normal HTML page for users
*/
app.get('/users', (req, res) => {
  const html = `
    <ul>
      ${users.map(u => `<li>${u.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

const PORT = 8001;

// start server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
