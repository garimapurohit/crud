const express = require("express");
const users = require("./MOCK_DATA.json");
const fs =require("fs");
const app = express();

// req.body ko read karne ke liye
app.use(express.json());

/*  
   /api/users ke liye GET + POST at one place 
*/

// middle 
app.use(express.urlencoded({extended:false})); // koi bhii form data aaya usko body mein dalne mein help kregaa 
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



// WE CAN MAKE MIDDLWARE USING APP.USE
app.route("/api/users")
  .get((req, res) => {
    res.setHeader("x-myName","garima"); // here we make custom  header in the response :) 
    //while making custom header try to include x as prefix standard way of writing to denote to custom ones 
    // all users bhej deta hai
const allusers = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));

    return res.json(allusers); 
  })
  .post((req, res) => {
  const body = req.body; // <-- Add this line
  users.push({ ...body, id: users.length + 1 }); // <-- Add new user

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "Error writing file" });
    }
    return res.status(201).json({ status: "Successfully added", user: body });
  });
});

  ///api/users/:id ke liye GET, PATCH, DELETE ek sath 
app.route("/api/users/:id")
  .get((req, res) => {
    // url me jo value hoti h usko params bolte hainn
    const id = Number(req.params.id);

    // ek specific user find kar rhe
    const user = users.find((u) => u.id === id);
    if (!user) {
        return res.status(404).json({ status: "User not found" });
    }


    return res.status(200).json(user);
  })
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
    return res.status(200).json({ status: "User updated", user: users[index] });
  });
})
.delete((req, res) => {
    const id = Number(req.params.id);

    // read latest users from file
    const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));

    // find index
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // remove user
    users.splice(userIndex, 1);

    // rewrite file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));

    return res.json({ status: "User deleted!" });
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
