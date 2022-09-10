const fs = require("fs");
const path = require("path");
const validate = require("../../utils/validate");

const dbDir = path.resolve("database/v1/users.json");

let users;
let usersLength;

fs.readFile(dbDir, (err, data) => {
  if (err) {
    console.log(err);
  }
  users = JSON.parse(data);
  usersLength = users.length;
});

module.exports.getAllUsers = (req, res) => {
  const { limit } = req.query;
  res.send(limit ? users.slice(0, limit) : users);
};

module.exports.randomUser = (req, res) => {
  const random = Math.floor(Math.random() * usersLength);
  res.send(users[random]);
};

module.exports.createUser = (req, res) => {
  const { name, gender, contact, address, photoUrl } = req.body;
  const id = usersLength === 0 ? 1 : users[usersLength - 1].id + 1;

  if (id && name && gender && contact && address && photoUrl) {
    users.push({ id, name, gender, contact, address, photoUrl });
    fs.writeFile(dbDir, JSON.stringify(users), (err) => {
      res.send("User Created Successfully!!!");
    });
  } else {
    res.send("Please fill up all the blanks!!!");
  }
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, gender, contact, address, photoUrl } = req.body;

  if (validate.validateParams(id)) {
    const updateData = users.find((user) => user.id == id);
    if (updateData) {
      updateData.name = name || updateData.name;
      updateData.gender = gender || updateData.gender;
      updateData.contact = contact || updateData.contact;
      updateData.address = address || updateData.address;
      updateData.photoUrl = photoUrl || updateData.photoUrl;

      fs.writeFile(dbDir, JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
        }
        res.send("Successfully Created User");
      });
    } else {
      res.send("Cannot find user!!!");
    }
  } else {
    res.send("Please use right parameter");
  }
};

module.exports.bulkUpdate = (req, res) => {
  const { id, name, gender, contact, address, photoUrl } = req.body;

  users.map((user) => {
    id.map((id) => {
      if (user.id === Number(id)) {
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.contact = contact || user.contact;
        user.address = address || user.address;
        user.photoUrl = photoUrl || user.photoUrl;
      }
    });
  });

  fs.writeFile(dbDir, JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
    res.send("Successfully Updated!!!");
  });
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  if (validate.validateParams(id)) {
    if (validate.validateUser(id, users)) {
      const filter = users.filter((user) => user.id != id);

      fs.writeFile(dbDir, JSON.stringify(filter), (err) => {
        if (err) {
          console.log(err);
        }
        res.send("Successfully Deleted User");
      });
    } else {
      res.send("User Not Found!!!");
    }
  } else {
    res.send("Invalid Request!!!");
  }
};
