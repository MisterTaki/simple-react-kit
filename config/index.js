[
  'env',
  'devServer',
  'uglifyOptions',
].forEach(m => {
  Object.assign(exports, require(`./${m}`));
});
