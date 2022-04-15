const errors = {
  cards: {
    filter: {
      statusCode: 1,
      name: 'undefined-property',
      message: 'property is not defined',
    },
    fk_added: {
      statusCode: 10,
      name: 'no-such-entity',
      message: 'FOREIGN KEY constraint failed. There is no entity with this Id',
    },
    notDefined: {
      statusCode: 7,
      name: 'undefined-card',
      message: 'Card in not defined',
    }
  },
  lists: {
    uniqueName: {
      statusCode: 2,
      name: 'list-name-exist',
      message: "Name must be unique",
    },
    notDefined: {
      statusCode: 9,
      name: 'undefined-list',
      message: 'List in not defined',
    }
  },
  types: {
    string: {
      statusCode: 4,
      name: 'not-string-type',
      message: 'The value must be String',
    },
    number: {
      statusCode: 5,
      name: 'not-number-type',
      message: 'The value must be Number',
    },
    general(field) {
      return {
        statusCode: 6,
        name: 'incorrect-type',
        message: `The '${field}' type is incorrectly set`,
      }
    },
  },
  field: {
    isNotEmpty(field) {
      return {
        statusCode: 8,
        name: 'empty-field',
        message: `The '${field}' field cannot be empty`
      }
    }
  }

};

module.exports = { errors };