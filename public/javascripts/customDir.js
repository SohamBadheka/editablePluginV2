/**
 * Created by soham on 5/31/17.
 */

/*
 * Handles the view/template for the edit utility!
 */
angular.module('editingPlugin', [])

    .directive('editMe', function() {
        return {
            restrict: 'AE',
            require: 'ngModel',
            template :
                        '<select class=\"form-control\" name=\"level\" ng-model=\"level\" ng-show=\"editMode\">'+
                        '<option value="Manager\">Level 3 - Manager</option>'+
                        '<option value="Recruiter">Level 2 - Recruiter</option>'+
                        '<option value="Employee">Level 1 - Employee</option>'+
                        '</select>'+
                        '<button type="submit" ng-hide="editMode" ng-click="editMode = true; edit(entry)" class="btn btn-default">Edit</button>'+
                        '<button type="submit" ng-show="editMode" ng-click="editMode = false; save(name, level)" class="btn btn-default">Save</button>'+
                        '<button type="submit" ng-show="editMode" ng-click="editMode = false; cancel()" class="btn btn-default">Cancel</button>'

       };

    });