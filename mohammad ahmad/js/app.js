
var app = angular.module('app', ['ngCookies','ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router','ui.bootstrap'


])
app.value('JSON_DATA', {});

var app_cached_providers = {};

app.config(['$controllerProvider',
    function (controllerProvider) {
        app_cached_providers.$controllerProvider = controllerProvider;
    }
]);
var loadController = function (controllerName) {
    return ["$q", "$stateParams", function ($q, $stateParams) {
        var deferred = $q.defer();
        if ($stateParams.entityName) {
            controllerName = $stateParams.entityName;
        }
        require([controllerName], function () {
            deferred.resolve();
        });
        return deferred.promise;
    }];
};
app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', function ($stateProvider, $urlRouterProvider, $compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

    /*$urlRouterProvider.otherwise('/chargestemplate/initiate');*/
}]);
