(function() {
  'use strict';
  angular.module('folio.unit-testing.authToken', [])
        .value('authToken', {
          jwtToken: 'OScXVCiBOzmrVLYz11VJGGtcNI5RvUSyNGhLIPGGAqtiNFWwPR4w3SfQCJHo3Slq2Q4FR16FJQWj2QXRCNVVF7xOkYh17daWkoyJxsiyhS5KaYrIYH07FZ3l27WSEPVX0t5akP111zwaBSgZHn2NrSQqQjmZT2S8xxaV8lIffD2kGk9KJWFFG.cyYFPp0NSJSzrysy4FLwie6mWy6FerRXf8eO6KLlhQzNyTUEqOLP7snfVv3VOjQoNhWa7kcihSJ3l6tcvK45T4hmMJLgLIfHqk5U4QNSzVN.wtXNiFTfU1y3FKU4xD3HWHVg8KhciP',
          refreshToken: 'A24CC60E-8247-4A73-BC9E-C1F656B3B4B5',
          timeOfAuthentication: Math.floor((new Date()).valueOf() / 1000),
          refreshTokenTimeout: 1,
          tokenTimeout: 1
        });
})();
