const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');
    if(!userList) {
        res.status(500).json({ success: false});
    }
    res.sendStatus(userList);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if(!user){
        res
        .status(500)
        .json({ message: "The user with the given ID was not found." });
    }
    res.status(200).send(User);
})

router.post('/', async (req, res) =>{
    let user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    });
    user = await user.save();
    if (!user) return res.status(400).send("the user cannot be created!");
    res.send(user);
});

router.put("/:id", async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPassword = userExist.passwordHash;
    }
  
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: newPassword,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
      },
      { new: true }
    );
  
    if (!user) return res.status(400).send("the user cannot be created!");
  
    res.send(user);
  });

  router.post('/login', async (req, res) =>{
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;
    if (!user) {
      return res.status(400).send("The user not found");
    }
  
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1d" }
      );
  
      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(400).send("password is wrong!");
    }
  });

  router.post("/register", async (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    });
    user = await user.save();
  
    if (!user) return res.status(400).send("the user cannot be created!");
  
    res.send(user);
  });

  router.delete("/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, message: "the user is deleted!" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "user not found!" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ success: false, error: err });
      });
  });
  
  router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments();
  
    if (!userCount) {
      res.status(500).json({ success: false });
    }
    res.send({
      userCount: userCount,
    });
  });
  
export default router;