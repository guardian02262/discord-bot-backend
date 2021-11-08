const app = require("express").Router();

//api for admin to creat role
app.post("/create", async (req, res) => {
  try {
    let { role } = req.body;
    role = await guild.createRole(role);
    if (!role) {
      res.json({ result: false, msg: message.FAILD_CREATE_ROLE });
    }
    const userRole = await Role.create(role);
    if (!userRole) {
      res.json({ result: false, msg: message.FAILD_CREATE_ROLE });
    }

    userRole.save();
  }
  catch(error) {
    console.log("error", error);
    res.json({ result: false, msg: err });
  }
})

//api for client to buy role
app.post("/buy", async(req, res) => {
  let { userId, role } = req.body;
  try {
    const user = await User.findOne({ discordId: userId });
    const member = guild.members.get(userId);
    let userRole = Array.from(guild.roles.values())
      .find(r => r.name === role);

    if (userRole) {
      res.json({ result: false, msg: message.ROLE_NOT_FOUND });
    }
    await member.addRole(userRole.id, 'Buyed new role');
    user.update({ ...user, role: userRole });
    res.json({ result: true, msg: message.ROLE_BUYED });
  } 
  catch (err) {
    console.log(err);
    res.json({ result: false, msg: err});
  }
})

module.exports = app;