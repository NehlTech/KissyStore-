module.exports = (myFunc) => (request, result, next) => {
  Promise.resolve(myFunc(request, result, next)).catch(next);
};
