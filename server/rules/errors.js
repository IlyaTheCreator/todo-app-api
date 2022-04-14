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
    notDefined: {
      statusCode: 7,
      message: 'Card in not defined'
    }
  },
  lists: {
    uniqueName: {
      statusCode: 2,
      message: "Name must be unique",
    },
    notDefined: {
      statusCode: 9,
      message: 'List in not defined'
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
    },
    general(field) {
      return {
        statusCode: 6,
        message: `The '${field}' type is incorrectly set`,
      }
    },
  },
  filed: {
    isNotEmpty(field) {
      return {
        statusCode: 8,
        message: `The '${field}' field cannot be empty`
      }
    }
  }

};

module.exports = { errors };