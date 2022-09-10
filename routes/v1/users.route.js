const express = require("express");
const router = express.Router();
const usersControllers = require("../../controllers/v1/users.controller");

router

  /**
   * @api{get} /user all users
   * @apiDescription get All users
   * @apiQuery {Number} [limit=number] limit user
   *@apiSuccess {[Object]} all the users
   */
  .get("/all", usersControllers.getAllUsers)

  /**
   * @api {get} /user random user
   * @apiSuccess {Object} random user
   */
  .get("/random", usersControllers.randomUser)

  /**
   * @api {Post} /user create user
   * @apiSuccess {Object} user create
   */
  .post("/save", usersControllers.createUser)

  /**
   * @api {patch} /user update user
   * @apiDescription update an user via user id
   * @apiParams {Number} user id
   */
  .patch("/update/:id", usersControllers.updateUser)

  /**
   * @api {patch} /user update user
   * @apiDescription update multiple user at a time
   * @apiBody {[Number]} multiple user id in array
   */
  .patch("/bulk-update", usersControllers.bulkUpdate)

  /**
   * @api {delete} /user delete user
   * @apiDescription delete an user via user id
   * @apiParams {Number} valid user id
   */
  .delete("/delete/:id", usersControllers.deleteUser);
module.exports = router;
