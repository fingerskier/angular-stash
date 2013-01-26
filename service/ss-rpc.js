.factory('rpc', function ($log, $q, $rootScope) {
    console.log('rpc service created');

    return {
        exec: function (command) {
            var args = Array.prototype.slice.apply(arguments),
                deferred = $q.defer();

            // apply ss.rpc with array ['demoRpc.foobar', arg2, arg3], {callback}]
            ss.rpc.apply(ss, [command].concat(args.slice(1, args.length)).concat(function (err, res) {
                $rootScope.$apply(function (scope) {
                    if (err) {
                        return deferred.reject(err);
                    }
                    return deferred.resolve(res);
                });
            }));

            return deferred.promise;
        },
        cache: {} // use cache across controllers for client-side caching
    };
})
