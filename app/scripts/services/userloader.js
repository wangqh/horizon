'use strict';

/**
 * @ngdoc service
 * @name horizonApp.userloader
 * @description
 * # userloader
 * Service in the horizonApp.
 */
angular.module('horizonApp')
  .service('Userloader', function Userloader($q, User) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var mock = {
            data: {
                name: 'wpqh888',
                avatar: 'https://www.gravatar.com/avatar/7d1f7b7f7785b0d3fd2ad75abbebfab5',
                isAdmin: true
            }
        };

        return function(){
            var delay = $q.defer();

            User.get(function(result){
                delay.resolve(result.data);
            },function(){
                delay.resolve(mock.data);
            });
            return delay.promise;
        }
  });
