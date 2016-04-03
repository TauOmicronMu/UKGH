/*
Node {
	Index
	Name
	AvatarUrl
	Size/Importance
}
Link {
	Source node index
	Target node index
}
*/
var networkGraph = function(){
	var directiveDefinitionObject = {
		scope: {
			"userData": "="
		},
		restrict: 'E',
		replace: false,
		link: function (scope, element, attrs) {
			var width = 960, height = 500;

			var color = d3.scale.category20();

			var chart = d3.select(element[0])
				.append("svg")
				.attr("width", width)
				.attr("height", height);
				
			function reDraw(){
				var graph = scope.userData;
				var force = d3.layout.force()
					.charge(-120)
					.linkDistance(30)
					.size([width, height])
					.nodes(graph.nodes)
					.links(graph.links)
					.start();

				var link = chart
					.selectAll(".link")
					.data(graph.links)
					.enter()
					.append("line")
					.attr("class", "link")
					.style("stroke-width", 2);

				var node = chart
					.selectAll(".node")
					.data(graph.nodes)
					.enter()
					.append("circle")
					.attr("class", "node")
					.attr("r", function(d){ return 20 * (d.layer + 2);})
					.call(force.drag);
				
				node.append("image")
					.attr("xlink:href", function(d){ return d.avatar; });

				node.append("title").text(function(d) { return d.name; });

				force.on("tick", function() {
					link.attr("x1", function(d) { return d.source.x; })
					.attr("y1", function(d) { return d.source.y; })
					.attr("x2", function(d) { return d.target.x; })
					.attr("y2", function(d) { return d.target.y; });

					node.attr("cx", function(d) { return d.x; })
					.attr("cy", function(d) { return d.y; });
				});
			}
			
			scope.$watch("userData", function(newValue, oldValue){
				if(newValue === oldValue){
					return;
				}
				
				reDraw();
			}, true);
			
			reDraw();
		} 
	};
	return directiveDefinitionObject;
}
