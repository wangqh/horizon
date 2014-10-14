'use strict';

/**
 * @ngdoc overview
 * @name horizonApp
 * @description
 * # horizonApp
 *
 * Main module of the application.
 */
angular
  .module('horizonApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/horizon', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl',
        resolve: {
            home: ['Homeloader', function(Homeloader){
                return Homeloader();
            }]
        }
      })
      .when('/horizon/instances', {
        templateUrl: '/views/instances.html',
        controller: 'InstancesCtrl'
      })

      .when('/horizon/instances/:id', {
        templateUrl: '/views/instancedetail.html',
        controller: 'InstancedetailCtrl',
        resolve: {
            detail: ['Instancedetailloader', function(Instancedetailloader){
                return Instancedetailloader();
            }]
        }
      })
      .when('/horizon/networks', {
            redirectTo: '/horizon/networks/vxnets'
      })
      .when('horizon/admin/images/create', {
            redirectTo: '/horizon/images'
      })
      .when('/horizon/networks/routers', {
        templateUrl: '/views/routers.html',
        controller: 'RoutersCtrl'
      })
      .when('/horizon/networks/routers/:id', {
        templateUrl: '/views/detail.html',
        controller: 'DetailCtrl',
        resolve: {
            detail: ['Routerdetailloader', function(Routerdetailloader){
                return Routerdetailloader();
            }]
        }
      })
      .when('/horizon/tenants', {
          templateUrl: '/views/tenants.html',
            controller: 'TenantsCtrl'
      })
      .when('/horizon/tenants/:id/usage', {
          templateUrl: '/views/tenantUsage.html',
            controller: 'TenantusageCtrl',
            resolve: {
                data: ['Tenantusageloader', function(Tenantusageloader){
                    return Tenantusageloader();
                }]
            }
      })
      .when('/horizon/networks/vxnets', {
        templateUrl: '/views/vxnets.html',
        controller: 'VxnetsCtrl'
      })
      .when('/horizon/networks/topology', {
        templateUrl: '/views/topology.html',
        controller: 'TopologyCtrl',
        resolve: {
            topologyData: ['Topologyloader', function(Topologyloader){
                return Topologyloader();
            }]
        }
      })
        .when('/horizon/networks/vxnets/:id', {
            templateUrl: '/views/detail.html',
            controller: 'DetailCtrl',
            resolve: {
                detail: ['Vxnetdetailloader', function(Vxnetdetailloader){
                    return Vxnetdetailloader();
                }]
            }
        })
        .when('/horizon/networks/ports/:id', {
            templateUrl: '/views/detail.html',
            controller: 'DetailCtrl',
            resolve: {
                detail: ['Interfacedetailloader', function(Interfacedetailloader){
                    return Interfacedetailloader();
                }]
            }
        })
        .when('/horizon/networks/subnets/:id', {
            templateUrl: '/views/detail.html',
            controller: 'DetailCtrl',
            resolve: {
                detail: ['Subnetloader', function(Subnetloader){
                    return Subnetloader();
                }]
            }
        })
        .when('/horizon/images', {
            redirectTo: '/horizon/images/system'
        })
        .when('/horizon/images/:op', {
            templateUrl: '/views/images.html',
            controller: 'ImagesCtrl',
            resolve: {
                user: ['Userloader', function(Userloader){
                    return Userloader();
                }]
            }
        })
        .when('/horizon/images/:op/:id', {
            templateUrl: '/views/detail.html',
            controller: 'DetailCtrl',
            resolve: {
                detail: ['Imageloader', function(Imageloader){
                    return Imageloader();
                }]
            }
        })
        .otherwise({
          redirectTo: '/horizon'
        });

      $locationProvider.html5Mode(true);
  });
