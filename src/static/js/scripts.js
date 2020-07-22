var app = angular.module('myApp',['ngSanitize']);

app.controller("myCtrl",function($scope, $sce,  $http){

    $scope.results={};
    $scope.error='';
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };
    $scope.submit = function () {
        $scope.results={};
        $scope.error='';

        if(($scope.searchtext ||'').trim()=='') {
            $scope.error='Please type...';
            return false;
        }
        console.log('Searching for '+$scope.searchtext);
        var request = {
            method: 'get',
            url: '/search?search='+$scope.searchtext,
            dataType: 'json',
            contentType: "application/json"
        };
        $http(request).then(function (response) {
            if(response.status!=200) {
                $scope.error='Error in connection';
                return false;
            }
            if(response.data.meta && response.data.meta.status!=200) {
                $scope.error='Error in data';
                return false;
            }
            if(response.data.data.length<1) {
                $scope.error = 'Sorry no results';
                return false;
            }
            $scope.results =  response.data.data;
        });
    };

});