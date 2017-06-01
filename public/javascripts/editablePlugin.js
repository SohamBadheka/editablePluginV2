/**
 * Created by soham on 5/31/17.
 */

/* Injecting 'editingPlugin' as a dependency which will handle the view for the directive 'edit-me'
 * and the controller has two services that will handle the logic to interact with the db
 */
app = angular.module("editablePlugin", ['editingPlugin']);

app.controller('PluginCtrl',['$scope', 'getUserService', 'saveUserInfoService',
    function($scope, getUserService, saveUserInfoService){

        $scope.editing = false;

        //call getUserService to get the data from db

        getDetails = getUserService.getData();

        getDetails.then(function(result) {


            $scope.name = result.data.data.name;
            $scope.level = result.data.data.userType;

        });


        // call this when edit button is clicked

        $scope.edit = function () {

            $scope.editing = true;
        }

        // call this when save button is clicked

        $scope.save = function (name, level) {

            saveDetails = saveUserInfoService.saveData(name, level);
            saveDetails.then(function(result) {

                $scope.level = result.data.data.userType;

            });


        };

        // call this when cancel is clicked

        $scope.cancel = function (index) {

            getDetails = getUserService.getData();
            getDetails.then(function(result) {

                $scope.name = result.data.data.name;
                $scope.level = result.data.data.userType;

            });

        };
    }]);

// custom service to get the information
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
            return err;
        })
    }

}]);

//custom service to save the user information
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


