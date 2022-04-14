const errors = {
  cards: {
    filter: {
      statusCode: 1,
      message: 'property is not defined',
    },
    fk_added: {
      statusCode: 19,
      message: 'FOREIGN KEY constraint failed. There is no list with this Id',
    }
  },
  lists: {
    uniqueName: {
      statusCode: 2,
      message: "Name must be unique",
    }
  }

};

module.exports = { errors };