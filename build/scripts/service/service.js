/*======================================================================================
Name: server.js
Description: 封装angular内置函数
Author: Bob Gao
Date: 2016/02/16
=======================================================================================*/

angular.module('bsft.services', [])
.factory('httpHelper', ['$http', '$q', function($http, $q){
    return {
        get: function (url) {
            var deferred = $q.defer();
            $http({method: 'GET', url: url})
                .then(function (data) {
                    deferred.resolve(data);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        post: function (url, data) {
            var deferred = $q.defer();
            $http({method: 'POST', url: url, data: data})
                .then(function (data) {
                    deferred.resolve(data);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        put: function (url, data) {
            var deferred = $q.defer();
            $http({method: 'PUT', url: url, data: data})
                .then(function (data) {
                    deferred.resolve(data);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        delete: function (url) {
            var deferred = $q.defer();
            $http({method: 'DELETE', url: url})
                .then(function (data) {
                    deferred.resolve(data);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

    };        
}]);