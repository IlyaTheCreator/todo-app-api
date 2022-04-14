const errors = {
  cards: {
    filter: {
      statusCode: 1,
      message: 'property is not defined',
    },
    fk_added: {
      statusCode: 19,
      message: 'FOREIGN KEY constraint failed. There is no list with this Id',
    },
  },
  lists: {
    uniqueName: {
      statusCode: 2,
      message: "Name must be unique",
    }
  },
  types: {
    boolean: {
      statusCode: 3,
      message: 'The value of IsCompleted can be either true(1) or false(0)',
    },
    string: {
      statusCode: 4,
      message: 'The name value must be String',
    },
    number: {
      statusCode: 5,
      message: 'The listId value must be Number',
    }
  }

};

module.exports = { errors };