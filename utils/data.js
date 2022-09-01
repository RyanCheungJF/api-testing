const initialData = [
  {
    id: 1,
    name: 'Ryan Cheung',
    age: 23,
  },
  {
    id: 2,
    name: 'Esther Sim',
    age: 22,
  },
  {
    id: 3,
    name: 'Lea Davis',
    age: 21,
  },
  {
    id: 4,
    name: 'Citizen Kane',
    age: 20,
  },
]

const newUser = {
  name: 'Vance Pays',
  age: 24,
}

const createdUser = {
  id: 5,
  name: 'Vance Pays',
  age: 24,
}

const invalidUser = {
  name: 'Vance Pays',
}

const editUser = {
  name: 'Vance Days',
}

const editedUser = {
  id: 5,
  name: 'Vance Days',
  age: 24,
}

module.exports = {
  initialData,
  newUser,
  createdUser,
  invalidUser,
  editUser,
  editedUser,
}
