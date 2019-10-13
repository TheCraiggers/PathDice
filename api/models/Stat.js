module.exports = {
    attributes: {
      name: { type: 'string', required: true },
      character: { model: 'Character' },
      baseValue: { type: 'number', required: true },
      modifiers: { collection: 'Modifier', via: 'stat' },
    },
  };