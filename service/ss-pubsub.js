// pulled from socketstream-angular seed project
.factory('pubsub', function ($log, $rootScope) {
    console.log('pubsub service created');

    // override the $on function
    var ng$on = $rootScope.$on, json;
    Object.getPrototypeOf($rootScope).$on = function (name, listener) {
        var scope = this;
        ss.event.on(name, function (message) {
            scope.$apply(function (s) {
                if (message) {
                    try {
                        // broadcast with json payload
                        json = JSON.parse(message);
                        scope.$broadcast(name, message);
                    } catch (err) {
                        // broadcast with non-json payload
                        scope.$broadcast(name, message);
                    }
                } else {
                    // broadcast with no payload (i.e. event happened)
                    scope.$broadcast(name);
                }
            });
        });

        // call angular's $on version
        ng$on.apply(this, arguments);
    }; // end $on redefinition
})