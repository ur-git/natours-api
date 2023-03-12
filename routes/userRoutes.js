import express from 'express';

// route handlers
const getAllUsers = (req, res) => {};
const getUser = (res, req) => {};
const createUser = (res, req) => {};
const updateUser = (res, req) => {};
const deleteUser = (res, req) => {};

//create new router and save in a variable
const router = express.Router();

// '/' is root of this '/api/v1/users' url
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
