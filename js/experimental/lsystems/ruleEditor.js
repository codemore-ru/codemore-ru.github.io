/**
 * Created by alexeynurgaliev on 21.07.14.
 */

(function() {
    var app = angular.module('RuleEditor', []);

    app.directive('ruleEditor', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/experimental/lsystems/ruleEditor.html',
            scope: {
                modalId: '='
            },
            controller: ['$rootScope', '$scope', function($rootScope, $scope) {

                $scope.ruleOperators = ['nothing', 'move', 'draw', 'rotate', 'push', 'pop'];

                $scope.ruleNames = {
                    nothing: 'Ничего',
                    move: 'Переместиться',
                    draw: 'Нарисовать',
                    rotate: 'Повернуться',
                    push: 'Добавить в стек',
                    pop: 'Убрать из стека'
                };

                $scope.addRule = function() {
                    $rootScope.$broadcast('addRule', {
                        liter: $scope.liter,
                        rule: {
                            rule: $scope.rule,
                            operator: $scope.operator,
                            value: $scope.value
                        }
                    });
                };

                $scope.validate = function() {
                    if($scope.liter.length != 1) return false;
                    if(['draw', 'move', 'rotate'].indexOf($scope.operator) != -1 && !$scope.value) return false;
                    return true;
                };

                $scope.setOperator = function(operator) {
                    $scope.operator = operator;
                };

                $scope.reset = function() {
                    $scope.liter = '';
                    $scope.rule = '';
                    $scope.value = 0;
                    $scope.operator = 'nothing';

                    $scope.windowTitle = "Добавить";
                    $scope.okTitle = 'Добавить';
                    $scope.editing = false;
                };

                $scope.reset();

                $scope.$on('newRule', function() {
                    $scope.reset();
                });

                $scope.$on('editRule', function(event, entry) {
                    $scope.reset();
                    $scope.windowTitle = 'Редактировать';
                    $scope.okTitle = 'Сохранить';
                    $scope.editing = true;

                    $scope.liter = entry.liter;
                    $scope.value = entry.rule.value;
                    $scope.rule = entry.rule.rule;
                    $scope.operator = entry.rule.operator;
                });
            }]
        };
    });

})();
