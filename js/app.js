(function() {

    var app = angular.module('app', []);

    app.controller('MainController', MainController);

    MainController.$inject = ['$scope', '$http'];

    function MainController($scope, $http) {
        var main = this;

        main.params = {
            urlbase: 'http://api.datosabiertos.msi.gob.pe/datastreams/invoke/',
            //main.guid: 'CONSO-INTER-SEREN-31211',
            guid: 'ACTIV-CULTU-86315',
            key: '36bbab417f3b3b13d76b45a8fc30c39e652e2cca',
            limit: 10
        };

        $scope.url = main.params.urlbase + main.params.guid + '?callback=JSON_CALLBACK&auth_key=' + main.params.key + '&limit=' + main.params.limit;

        main.onSubmit = function() {

            main.title = 'Cargando...';

            var url = $scope.url;

            $http.jsonp(url).then(function successCallback(response) {
                console.log('response: ', response);
                var data = response.data;
                if (data.error) {
                    main.title = 'Error';
                    return;
                }

                main.title = data.title;
                var i = 0;
                main.header = [];
                for (var col = 0; col < data.result.fCols; col++) {
                    main.header[col] = data.result.fArray[i].fStr;
                    i++;
                }
                main.rows = [];
                for (var row = 1; row < data.result.fRows; row++) {
                    main.rows[row] = [];
                    for (col = 0; col < data.result.fCols; col++) {
                        main.rows[row][col] = data.result.fArray[i].fStr;
                        i++;
                    }
                }
            }, function errorCallback(response) {
                console.log('error response: ', response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };



    }

})();