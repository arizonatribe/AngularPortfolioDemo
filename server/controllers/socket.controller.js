var utilities = require('../services/utilities.js'),
    applicants = require('../services/applicant.service.js'),
    messages = require('../services/messages.service.js');

module.exports = function(io) {
    return {
        emitNewMessage: function(req, res, next) {
            var self = this,
                ms = Math.floor((Math.random() * 30000)) + 1;

            setTimeout(function() {
                io.emit('NewMessage', messages.createMessage(req.body));

                self.emitNewMessage(io);
            }, ms);
        },
        emitNewApplicant: function(req, res, next) {
            var self = this,
                ms = Math.floor((Math.random() * 30000)) + 1;

            setTimeout(function() {
                io.emit('NewApplicant', applicants.createApplicant(req.body));

                self.emitNewApplicant(io);
            }, ms);
        }
    };
};