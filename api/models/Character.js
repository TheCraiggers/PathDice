module.exports = {
    attributes: {
      name: { type: 'string', required: true },
      stats: {collection: 'Stat', via: 'character'}
    },
  };