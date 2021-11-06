const app = require("express").Router();
const passport = require("passport");
const User = require("../../Models/User");
const Role = require("../../Models/Role");
const Guild = require("../../Models/GuildSchema");
const config = require("../../config");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const message = require("../../constants/msg");
const guild = require("../../bot/src/models/guild");

async function bGetGuilds() {
    const res = await fetch("http://discord.com/api/v9/users/@me/guilds", {
      method: "GET",
      headers: {
        Authorization: `Bot ${config.token}`,
      },
    });
    return res.json();
}
async function getMembers(id) {
  const res = await fetch(`http://discord.com/api/v9/guilds/${id}/members?limit=1000`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${config.token}`,
    },
  });
  return res.json();
}
async function getDetailsServer(id) {
  const res = await fetch(`http://discord.com/api/v9/guilds/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${config.token}`,
    },
  });
  return res.json();
}
async function getChannels(id) {
  const res = await fetch(`http://discord.com/api/v9/guilds/${id}/channels`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${config.token}`,
    },
  });
  return res.json();
}
function getServerPermission(ug) {
  return ug.filter((uguilds) => (uguilds.permissions & 0x20) === 0x20);
}
app.get("/", (req, res) => {
  res.send("good");
});
app.get("/guilds", async (req, res) => {
  if (req.user) {
    const user = await User.findOne({ discordId: req.user.discordId });
    const uguilds = user.guilds;
    const bguilds = await bGetGuilds();
    if (user) {
      let comservs = uguilds.filter((userguild) =>
        bguilds.find(
          (botguild) =>
            botguild.id === userguild.id &&
            (userguild.permissions & 0x20) === 0x20
        )
      );
      let data = getServerPermission(uguilds);
      let permnocom = data.filter((item) =>
        comservs.every((item2) => item2.id != item.id)
      );
      res.json({ permincom: permnocom, comservs, msg: "authorized" });
    }
  } else {
    res.json({ msg: "unauthorized" });
  }
});
app.get("/getguildinfo", async (req,res) => {
  let id = req.query.id;
  let data = await getMembers(id);
  let data1 = await getChannels(id)
  let data2 = await getDetailsServer(id)
  const membersfiltring = data.filter(d => !d.user.bot)
  return res.json({members: membersfiltring.length, channels: data1.length, region: data2.region, roles: data2.roles.length })
})
app.get("/prefixs", async (req, res) => {
  let id = req.query.id;
  Guild.findOne({ guildID: id }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      res.json({ prefix: data.prefix });
    }
  });
});
app.post("/prefixs", async (req, res) => {
  let {prefix, id } = req.body;
  try {
    const findUser = await Guild.findOneAndUpdate({guildID: id}, {
     prefix
  }, {new: true})
    res.json({msg: 'done', findUser})
  } catch(err) {
    console.log(err)
    res.json({msg: err})
  }
});

//api for admin to creat role
app.post("/createrole", async (req, res) => {
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
app.post("/buyrole", async(req, res) => {
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
