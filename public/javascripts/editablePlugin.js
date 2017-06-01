/**
 * Created by soham on 5/31/17.
 */
app = angular.module("editablePlugin", ['editingPlugin']);

app.controller('PluginCtrl',['$scope', 'getUserService', 'saveUserInfoService',
    function($scope, getUserService, saveUserInfoService){

        $scope.newField = {};
        $scope.editing = false;


        getDetails = getUserService.getData();
        getDetails.then(function(result) {

            $scope.name = result.data.data.name;
            $scope.level = result.data.data.userType;

        });


        $scope.edit = function () {

            $scope.editing = true;
        }

        $scope.save = function (name, level) {

            saveDetails = saveUserInfoService.saveData(name, level);
            saveDetails.then(function(result) {

                $scope.level = result.data.data.userType;

            });


        };

        $scope.cancel = function (index) {

            getDetails = getUserService.getData();
            getDetails.then(function(result) {

                $scope.name = result.data.data.name;
                $scope.level = result.data.data.userType;

            });

        };
    }]);

app.service('getUserService',["$http", function($http){


    this.getData = function() {
        return $http({
            "url": "/getUsers",
            "method": "GET"
        }).success(function (data) {

            if (data.status == "200") {

                return data.data;
            }
        }).error(function (err) {
            alert('something went wrong');
        })
    }

}]);

app.service('saveUserInfoService', ["$http", function($http){


    this.saveData = function(name, level){
       return $http({

            "method": "POST",
            "url": "/saveData",
            "data": {
                name : name,
                level : level
            }

        }).success(function (data) {

            return data.data.userType;

        })
    }

}]);


