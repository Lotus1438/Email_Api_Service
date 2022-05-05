import { v4  as uuidv4 } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    res.send(users);
};

export const createUser = (req, res) => {
    const user = req.body;
    console.log(user);

    users.push({...user, id: uuidv4() });

    res.send(`User ${user.email} is created!`);
};

export const getUsersId = (req, res) => {
    const {id} = req.params;

    const foundUsersId = users.find((user) => user.id == id);

    res.send(foundUsersId);
};

export const deleteUser = (req, res) => {
    const {id} = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User id: ${id} is Deleted!`);
};

export const updateUser = (req, res) => {
    const {id} = req.params;
    const {email, password} = req.body;

    const user = users.find((user) => user.id == id);

    if (email) user.email = email;
    if (password) user.password = password;

    res.send(`User id: ${id} has been Updated!`);
};

