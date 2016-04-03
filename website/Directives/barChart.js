// <bars-chart chart-data="{{userData}}" user-data="userData"></bars-chart>
var barsChart = function(){
	var directiveDefinitionObject = {
		scope: {
			"userData": "="
		},
		restrict: 'E',
		replace: false,
		link: function (scope, element, attrs) {
			var chart = d3.select(element[0]);
			chart
				.append("div").attr("class", "chart")
				.selectAll('div')
				.data(scope.userData).enter().append("div")
				.transition().ease("elastic")
				.style("width", function(d) { return d + "%"; })
				.text(function(d) { return d + "%"; });
		} 
	};
	return directiveDefinitionObject;
}
