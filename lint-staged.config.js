module.exports = {
  'source/*.+(js|ts)': [
    'eslint --fix',
    'prettier --write',
    // 'jest --findRelatedTests',
  ],
};
