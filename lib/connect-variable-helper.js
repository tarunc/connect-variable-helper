/**
 * Expose a function which returns the `VaribleHelper` function.
 */
module.exports = function (cookieOpts) {
  /**
   * This higher level function is a connect-middleware function that helps
   * define helpers getVarible and setVarible which help get and set variables
   * in both the session and cookie at the same time
   *
   * @param {request} req - the request handler
   * @param {response} res - the response handler
   * @param {next} next - The next function to run
   */
  return function varibleHelper(req, res, next) {
    req.getVariable = function getVariable_(variableName, defaultVal) {
      return req.session[variableName] || req.cookies[variableName] || req.signedCookies[variableName] || defaultVal;
    };

    req.setVariable = res.setVariable = function setVariable_(variableName, val) {
      req.session[variableName] = val;
      res.cookie(variableName, val, cookieOpts);
    };

    return next();
  };
};
