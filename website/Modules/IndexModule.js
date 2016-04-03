var indexModule = angular.module("IndexModule", []);

indexModule.directive("ngEnter", [ngEnter]);
indexModule.directive("barsChart", [barsChart]);
indexModule.directive("networkGraph", [networkGraph]);

indexModule.controller("IndexController", ["$scope", "$http", "$interval", indexController]);
