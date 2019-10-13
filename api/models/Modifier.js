module.exports = {
    attributes: {
      name: { type: 'string', required: true },
      frob: { model: 'Frob' },
      stat: { model: 'Stat', required: true },
      statMod: { type: 'string', required: true },
      type: { type: 'string', required: true },
      
    },
  };
