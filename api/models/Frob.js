module.exports = {
    attributes: {
      name: { type: 'string', required: true },
      character: { model: 'Character' },
      description: { type: 'string', required: false },
    },
  };
