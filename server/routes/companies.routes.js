var companies = require('../controllers/companies.controller');

module.exports = function(app) {
  app.route('/companies')
  .get(companies.list)
  .post(companies.createCompany);

  app.route('/companies/:companyId')
  .get(companies.read)
  .put(companies.update)
  .delete(companies.remove);
};
