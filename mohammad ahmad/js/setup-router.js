app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', function ($stateProvider, $urlRouterProvider, $compileProvider) {

    $stateProvider.state('korutask/initiate',
        {
            url: '/koru/korutask/initiate',
            templateUrl: 'templates/koru/korutask/html/initiate.html',
            authenticate: true,
            resolve: {
                loadCtrl: loadController("korucont")
            }
        });


}]);

