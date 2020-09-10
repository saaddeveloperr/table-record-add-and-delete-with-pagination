/**
 * Created by Mohammad.Ahmad on 09-09-2020.
 */

var KORU_APP_CONSTANTS =
    {
        GET_CATEGORY_lIST :"dummyajax/Koru/customerMainService/private/getCustomerCategoryList.json",
        GET_SEARCH_lIST :"dummyajax/Koru/customerMainService/private/getCustomerSearchList.json",

    };

define(['js/app-dynamic'], function (app) {
    app_cached_providers.$controllerProvider.register('koruController', ['$scope', '$timeout', '$filter', '$http',

        function ($scope, $timeout, $filter, $http) {
            $http.get(KORU_APP_CONSTANTS.GET_CATEGORY_lIST).success(function (response) {
                $scope.customers = response; //get response from dummy json
            });

            $http.get(KORU_APP_CONSTANTS.GET_SEARCH_lIST).success(function (response) {
                $scope.serachCustomer = response; //get response from dummy json
                /*for pagination*/
                $scope.totalItems = $scope.serachCustomer.length; //total item is the length of response we get
                console.log($scope.totalItems);
                $scope.currentPage = 1; //bootstrap pagination scope for in which page you want to stay
                $scope.itemsPerPage = 7;//how many record you want to show on page
                $scope.$watch("currentPage", function() {
                    setPagingData($scope.currentPage);//passing page no as a parameter
                });

                function setPagingData(page) {
                    var pagedData = $scope.serachCustomer.slice(
                        (page - 1) * $scope.itemsPerPage,
                        page * $scope.itemsPerPage
                    );
                    $scope.aserachCustomer = pagedData; //assign filter data to scope checkIfAllSelected
                    $scope.searchCheckIfAllSelected()// for each time checking if all row is selected or not(when i change the page)
                }
                /*pagination end*/
            });

            $scope.koru ={};
            $scope.customers = [];
            /*for add record*/
            $scope.addCustomer = function(data){
                $scope.customers.push(data);
                $scope.koru ={};

            };

            $scope.editCustomer = function(index, data) {
                if($scope.koru.name!=undefined){
                    return /*this code is for check the input field if any value assign to those input field then do not edit*/
                }
                $scope.authIndex = index;//assign index
                $scope.isEditAuthRule=true; //for update button
                $scope.koru = data; //assign data to object i.e. data to input field
                $scope.deleteCustomer(index,data);//delete the data from table
                $scope.addNewParameter()
            };
            /*delete the record*/
            $scope.deleteCustomer = function(index,data){
                 $scope.customers.splice(index, 1);
            };
            /*update the record at same index*/
            $scope.updateCustomer = function(data) {
                $scope.isEditAuthRule=false;
                $scope.customers.splice($scope.authIndex, 0, data);
                $scope.koru ={};

            };

            $scope.addParamlink=true; //initially add parameter button/link show (this is for add new parameter)
            $scope.collapseparam=false; //initially collapse button/link hide
            /* expand the div and hide add new parameter link*/
            $scope.addNewParameter=function () {
                $scope.addparameter=true; //show the add inputs
                $scope.collapseparam=true; //show collapse button/link
                $scope.addParamlink=false;//hide add parameter
            };


            $scope.hideParam=function () {
                $scope.addparameter=false; //hide the add inputs
                $scope.addParamlink=true;//show add parameter button/link
                $scope.collapseparam=false; //hide collapse button/link
            };
            //for form validation

            $scope.validateForm = function () {
                return  this.form.Koru.$valid;
            };
            $scope.submitData=function(){



            }

            $scope.selectAll = function() {
                angular.forEach($scope.customers, function(row) {
                    row.Selected = $scope.selectedAll;
                });
            };

            $scope.checkIfAllSelected = function() {
                $scope.selectedAll = $scope.customers.every(function(row) {
                    return row.Selected == true;
                })
            };
            $scope.searchSelectAll = function() {
                angular.forEach($scope.aserachCustomer, function(row) {
                    row.searchSelected = $scope.koru.searchSelectedAll; //iterate  aserachCustomer as select all return true so we make scope Seleccted true
                });

            };

            $scope.searchCheckIfAllSelected = function() {
                $scope.koru.searchSelectedAll = $scope.aserachCustomer.every(function(row) {
                    return row.searchSelected == true; //return the row checkbox as true and vice versa
                })
            };

        }]);
});
