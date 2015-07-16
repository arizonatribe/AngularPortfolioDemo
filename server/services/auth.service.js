var _ = require('underscore'),
		_s = require('underscore.string'),
		utilities = require('./utilities.js');

exports.getAuthType = function(req) {
  var headers = req.headers,
  authorization;

  if (headers && typeof headers.authorization === 'string' && headers.authorization.replace(/ /g, '')) {
    authorization = headers.authorization.split(' ');

    if (authorization && authorization.length && authorization.length > 1) {
      return authorization[0];
    }
  }
  return '';
};

exports.getAuthorization = function(req) {
  var authorizationObject = {},
  headers = req.headers,
  authorization,
  authValues,
  propertyNameAndValue;

  if (headers && typeof headers.authorization === 'string' && headers.authorization.replace(/ /g, '')) {
    authorization = headers.authorization.split(' ');

    if (authorization && authorization.length && authorization.length > 1) {
      authValues = authorization[1].split('&');

      if (authValues && authValues.length) {
        authValues.forEach(function(value) {
          propertyNameAndValue = value.split('=');

          if (propertyNameAndValue && propertyNameAndValue.length === 2) {
            authorizationObject[propertyNameAndValue[0]] = propertyNameAndValue[1];
          }
        });
      }
    }
  }

  return authorizationObject;
};

exports.getUser = function(req) {
  var authorization = this.getAuthorization(req);

  if (authorization) {
    return _.findWhere(utilities.getItems('users'), { username:  _s.trim(authorization.username) });
  }
};

exports.validateToken = function(req, tokenType) {
  var $this = this,
  username = '',
  users,
  foundUser,
  accessToken = '',
  parseTimestamp,
  errorMessages = [],
  authType = $this.getAuthType(req),
  authorization;

  tokenType = tokenType ? tokenType.toLowerCase() : 'basic';

  console.log('validating ' + tokenType + ' authentication');

  // Make sure it is an authType of basic
  if (authType && _s.trim(authType.toLowerCase()) === tokenType) {
    authorization = $this.getAuthorization(req);

    if (authorization) {
      // Make sure has happened recently
      if ((_.isString(authorization.timestamp) && !_s.isBlank(authorization.timestamp)) || (_.isNumber(authorization.timestamp))) {
        parseTimestamp = parseInt(_s.trim(authorization.timestamp), 10);
        if (!isNaN(parseTimestamp)) {
          if ((Date.now() - parseTimestamp) < 90000) {
            errorMessages.push('It has been too long since the Authentication attempt was made, retry');
          }
        } else {
          errorMessages.push('Invalid timestamp');
        }
      } else {
        errorMessages.push('Missing timestamp');
      }

      // Make sure the client id matches
      if (authorization.client_id && !_s.isBlank(authorization.client_id)) {
        if (!_.contains(utilities.getItems('clientIds'), _s.trim(authorization.client_id).toUpperCase())) {
          errorMessages.push('Invalid Client Id');
        }
      } else {
        errorMessages.push('Missing Client Id');
      }

      // Make sure this is the right grant type
      if (authorization.grant_type && !_s.isBlank(authorization.grant_type)) {
        switch (authorization.grant_type.toLowerCase()) {
          case 'password':

            // Check the username
            if (authorization.username && !_s.isBlank(authorization.username)) {
              users = utilities.getItems('users');
              if (!users || !users.length) {
                errorMessages.push('No users found');
              } else {
                foundUser = utilities.getUser(req);
                if (!foundUser) {
                  errorMessages.push('Invalid Username');
                } else {
                  username = foundUser.username;
                  accessToken = foundUser.access_token;
                }
              }
            } else {
              errorMessages.push('Missing Username');
            }

            // Check the password
            if (authorization.password && !_s.isBlank(authorization.password)) {
              users = utilities.getItems('users');
              if (!users || !users.length) {
                errorMessages.push('No users found');
              } else {
                if (!_.some(users, function(user) { return _.isMatch(user, { password: _s.trim(authorization.password) }); })) {
                  errorMessages.push('Invalid Password');
                }
              }
            } else {
              errorMessages.push('Missing Password');
            }
            break;
          case 'protected_resource':

            // Make sure we have an access token
            if (_.isString(authorization.access_token)) {
              if (!(authorization.access_token).match(/^[0-9a-z_\.\-]+$/i)) {
                errorMessages.push('Invalid characters in access token');
              }
            } else {
              errorMessages.push('Missing access token');
            }

            // Make sure we a refresh token
            if (_.isString(authorization.refresh_token)) {
              if (!(authorization.refresh_token).match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
                errorMessages.push('Invalid characters in refresh token');
              }
            } else {
              errorMessages.push('Missing refresh token');
            }
            break;
          case 'refresh_token':

            // Make sure we a refresh token
            if (_.isString(authorization.refresh_token)) {
              if (!(authorization.refresh_token).match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
                errorMessages.push('Invalid characters in refresh token');
              }
            } else {
              errorMessages.push('Missing refresh token');
            }
            break;
          default:
            errorMessages.push('Invalid Grant Type value');
            break;
        }
      } else {
        errorMessages.push('Missing Grant Type');
      }
    } else {
      errorMessages.push('Missing Authorization data');
    }
  } else {
    errorMessages.push('Invalid Authorization type');
  }

  return errorMessages;
};
