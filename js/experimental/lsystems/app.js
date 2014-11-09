/**
 * Created by alexeynurgaliev on 17.07.14.
 */

(function() {

    //Angular part

    var app = angular.module('Lindenmayer', ['RuleEditor']);

    app.controller('LindenmayerCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
        var me = this;

        //methods

        me.draw = function() {
            var lsystem = evolution(me.axiom, me.rules, me.maxIterations);

            drawLSystem({
                startX: me.startX,
                startY: me.startY,
                rotation: me.rotation,
                color: me.color,
                lineWidth: me.lineWidth,

                lsystem: lsystem,
                rules: me.rules
            });
        };

        me.ruleDescription = function(liter, rule) {
            var ruleName = 'Неопределено';
            switch(rule.operator) {
                case 'draw': ruleName = 'Нарисовать'; break;
                case 'move': ruleName = 'Переместиться'; break;
                case 'nothing': ruleName = 'Ничего'; break;
                case 'rotate': ruleName = 'Повернуться'; break;
                case 'push': ruleName = 'Добавить в стек'; break;
                case 'pop': ruleName = 'Убрать из стека'; break;
            }
            return (ruleName ? '(' + ruleName + (rule.value ? ' '+rule.value : '') + ')' : 'NO');
        };

        me.deleteRule = function(ruleName) {
            delete me.rules[ruleName];
        };

        me.editRule = function(ruleName) {
            $rootScope.$broadcast('editRule', {
                'liter': ruleName,
                'rule': me.rules[ruleName]
            });
        };

        me.newRuleDialog = function() {
            $rootScope.$broadcast('newRule');
        };

        me.loadRules = function() {
            $http.get('/js/experimental/lsystems/rules.json').success(function(data) {
                me.presets = data;
            });
        };

        me.resetRules = function() {
            me.rules = {};
            me.currentPreset = null;
        };

        me.presetChanged = function() {
            if(!me.currentPreset) return;
            me.axiom = me.currentPreset.axiom;
            me.rules = me.currentPreset.rules;
            me.startX = me.currentPreset.startX !== undefined ? me.currentPreset.startX : 200;
            me.startY = me.currentPreset.startY !== undefined ? me.currentPreset.startY : 200;
            me.rotation = me.currentPreset.rotation !== undefined ? me.currentPreset.rotation : 0;
            me.maxIterations = me.currentPreset.iterations !== undefined ? me.currentPreset.iterations : 5;
        };

        //event listeners

        $scope.$on('addRule', function(event, rule) {
            if(!rule.liter) return;
            me.rules[rule.liter] = rule.rule;
        });

        //initialization

        me.startX = 0;
        me.startY = 400;
        me.rotation = -50;

        me.axiom = '';
        me.rules = {};
        me.maxIterations = 5;

        me.color = '#006600';
        me.lineWidth = 1;

        me.presets = [];

        me.loadRules();
    }]);

    //Canvas part

    var canvas, ctx;
    var state = {}, stack = [];

    $(function() {
        canvas = document.getElementById('drawingCanvas');
        ctx = canvas.getContext('2d');
    });

    function drawLSystem(cfg) {
        stack = [];
        state = {
            x: cfg.startX,
            y: cfg.startY,
            rot: degToRad(cfg.rotation)
        };

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = cfg.color;
        ctx.lineWidth = cfg.lineWidth;

        ctx.beginPath();
        ctx.moveTo(state.x, state.y);

        for(var i = 0; i < cfg.lsystem.length; i++) {
            var current = cfg.lsystem[i];
            var rule = cfg.rules[current];
            if(!rule) continue;

            executeRule(rule);
        }

        ctx.stroke();
    }

    function executeRule(rule) {
        switch(rule.operator) {
            case 'move':
                moveRule(rule.value);
                break;
            case 'draw':
                ctx.moveTo(state.x, state.y);
                moveRule(rule.value);
                ctx.lineTo(state.x, state.y);
                break;
            case 'rotate': state.rot += degToRad(rule.value); break;
            case 'push': stack.push(cloneState(state)); break;
            case 'pop': state = stack.pop(); break;
        }
    }

    function moveRule(value) {
        state.x += value * Math.cos(state.rot);
        state.y += value * Math.sin(state.rot);
    }

    //L-System part

    /*
     Rule structure:
     - rule
     - operator
     - value
     */

    var ruleOperators = ['nothing', 'move', 'draw', 'rotate', 'push', 'pop'];

    function evolution(axiom, rules, iterations) {
        var currentState = strToArray(axiom);

        for(var i = 0; i < iterations; i++) {
            var nextState = [];
            for(var j = 0; j < currentState.length; j++) {
                var liter = currentState[j];
                if(rules.hasOwnProperty(liter)) {
                    Array.prototype.push.apply(nextState, strToArray(rules[liter].rule));
                }
            }
            currentState = nextState;
        }
        return currentState;
    }

    //Utility functions

    function strToArray(str) {
        return str.split('');
    }

    function degToRad(deg) {
        return deg * Math.PI / 180;
    }

    function cloneState(state) {
        var newState = {};
        for(var key in state) {
            if(state.hasOwnProperty(key)) {
                newState[key] = state[key];
            }
        }
        return newState;
    }

})();
