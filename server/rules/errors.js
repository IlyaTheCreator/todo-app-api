const errors = {
  cards: {
    filter: {
      statusCode: 1,
      name: 'undefined-property',
      message: 'property is not defined',
    },
    fk_added: {
      statusCode: 9,
      name: 'no-such-entity',
      message: 'FOREIGN KEY constraint failed. There is no entity with this Id',
    },
    notDefined: {
      statusCode: 6,
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
      statusCode: 8,
      name: 'undefined-list',
      message: 'List in not defined',
    }
  },
  types: {
    string: {
      statusCode: 3,
      name: 'not-string-type',
      message: 'The value must be String',
    },
    number: {
      statusCode: 4,
      name: 'not-number-type',
      message: 'The value must be Number',
    },
    general(field) {
      return {
        statusCode: 5,
        name: 'incorrect-type',
        message: `The '${field}' type is incorrectly set`,
      }
    },
  },
  field: {
    isNotEmpty(field) {
      return {
        statusCode: 7,
        name: 'empty-field',
        message: `The '${field}' field cannot be empty`
      }
    }
  }

};

const messages = {
  list: {
    added: {message: 'List added'},
    deleted: {message: 'List deleted'},
    updated: {message: 'List updated'},
    noData: {message: 'There are no lists'}
  },
  card: {
    added: {message: 'Card added'},
    deleted: {message: 'Card deleted'},
    updated: {message: 'Card updated'},
    noData: {message: 'There are no cards'}
  }
}

module.exports = { errors, messages };