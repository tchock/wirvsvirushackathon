module.exports = (type, rules) =>
  // some editor plugins dont support object spread yet
  // eslint-disable-next-line prefer-object-spread
  Object.assign(
    {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
    },
    rules || {}
  );
