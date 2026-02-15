const express = require("express");
const router = express.Router();



router.get((req, res) => {
    res.setHeader("x-myName","garima"); // here we make custom  header in the response :) 
    //while making custom header try to include x as prefix standard way of writing to denote to custom ones 
    // all users bhej deta hai
// const allusers = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));

    return res.json(allusers); 
  })
router.post("/api/users",async (req, res) => {
    try {
      const body = req.body;

      if (!body || !body.firstName ||!body.lastName|| !body.email || !body.jobTittle) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const user = await User.create({
        firstName: body.firstName,
        lastName :body.lastName,
        email : body.email,
        jobTittle : body.jobTittle,
        
      }); 

      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

router.route("/api/users/:id")
  .patch(async(req, res) => {
  await User.findByIdAndUpdate(req.params.id, {lastName:"changed"});
  return res.json({status : "success"});
   
  })
  router.delete((req, res) => {
    const id = Number(req.params.id);

    const data = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));
    const userIndex = data.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    data.splice(userIndex, 1);

    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(data, null, 2));

    return res.json({ status: "User is deleted from the records!" });3
  });

/*
  Normal HTML page for users
*/
router.get('/users', async(req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
      ${allDbUsers.map(u => `<li>${User.firstName}-${User.email}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

const PORT = 8001;

