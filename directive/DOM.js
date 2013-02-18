.directive(["focus", "blur", "keyup", "keydown", "keypress"].reduce(function(container, name) {
  var directiveName;
  directiveName = "ng" + name[0].toUpperCase() + name.substr(1);
  container[directiveName] = [
    "$parse", function($parse) {
      return function(scope, element, attr) {
        var fn;
        fn = $parse(attr[directiveName]);
        return element.bind(name, function(event) {
          return scope.$apply(function() {
            return fn(scope, {
              $event: event
            });
          });
        });
      };
    }
  ];
  return container;
}, {}));
