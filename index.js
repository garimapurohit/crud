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
app.route("/api/users")
  .get((req, res) => {
    // all users bhej deta hai
const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));

    return res.json(users);
  })
  .post((req, res) => {
    // new user create -- abhi pending
    const body = req.body;
    users.push({...body,id : users.length +1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
  if (err) console.log(err);
});

    // console.log(body); // undefined becoz express dk what kind of data it is and how to handle it 

    return res.json({ status: "sucessfully added " });
  });

/* 
    /api/users/:id ke liye GET, PATCH, DELETE ek sath 
*/
app.route("/api/users/:id")
  .get((req, res) => {
    // url me jo value hoti h usko params bolte hainn
    const id = Number(req.params.id);

    // ek specific user find kar rhe
    const user = users.find((u) => u.id === id);

    return res.json(user);
  })
  .patch((req, res) => {
    // Edit user -- abhi pending
     const id = Number(req.params.id);
  const body = req.body;

  // find user index
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "User not found" });
  }

  // update fields
  users[index] = { ...users[index], ...body };

  // save to file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "error writing file" });
    }
  });

  return res.json({ status: "User updated", user: users[index] });
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

const PORT = 8000;

// start server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
