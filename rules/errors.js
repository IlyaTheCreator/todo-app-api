const errors = {
  field: {
    isNotEmpty(field) {
      return {
        statusCode: 11,
        name: 'empty-field',
        message: `The '${field}' field cannot be empty`
      }
    }
  },
  types: {
    general(field) {
      return {
        statusCode: 21,
        name: 'incorrect-type',
        message: `The '${field}' type is incorrectly set`,
      }
    },
    string: {
      statusCode: 22,
      name: 'not-string-type',
      message: 'The value must be String',
    },
    number: {
      statusCode: 23,
      name: 'not-number-type',
      message: 'The value must be Number',
    }
  },
  cards: {
    filter: {
      statusCode: 31,
      name: 'undefined-property',
      message: 'property is not defined',
    },
    notDefined: {
      statusCode: 32,
      name: 'undefined-card',
      message: 'Card in not defined',
    },
    incorrectlyProp: {
      statusCode: 33,
      name: 'incorrect-property',
      message: 'The value can be either true or false',
    },
    noParent: {
      statusCode: 34,
      name: 'parent-not-found',
      message: 'A parent with this Id does not exist',
    }
  }
};

module.exports = { errors };
