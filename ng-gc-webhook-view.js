(function(){ 'use strict';
'use strict';

angular.module('gc.webHookViewController', [
]).controller('WebHookViewController', [
  '$scope',
  function WebHookViewController($scope) {

    var REQUEST_TYPE = $scope.REQUEST_TYPE = 'request';
    var RESPONSE_TYPE = $scope.RESPONSE_TYPE = 'response';

    $scope.webHookType = REQUEST_TYPE;

    $scope.isRequestType = function isRequestType() {
      return $scope.webHookType === REQUEST_TYPE;
    };

    $scope.isResponseType = function isResponseType() {
      return $scope.webHookType === RESPONSE_TYPE;
    };

  }
]);

'use strict';

angular.module('gc.webHookViewDirective', [
  'gc.webHookViewController',
  'ngGcKeyvalueFilter',
  'ngGcPrettyJsonFilter',
  'webhook-view-template.html'
]).directive('webHookView', [
  function webHookViewDirective() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'webhook-view-template.html',
      scope: {
        webHook: '='
      },
      controller: 'WebHookViewController'
    };

  }
]);

angular.module('webhook-view-template.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('webhook-view-template.html',
    '<div><div class="well filter-bar u-cf"><div class="nav app-header-nav--subnav"><label class="nav__item app-header-nav__btn" ng-class="{ \'is-active\': isRequestType() }">Request<input type="radio" class="u-is-hidden-visually" ng-model="webHookType" ng-value="REQUEST_TYPE"></label><label class="nav__item app-header-nav__btn" ng-class="{ \'is-active\': isResponseType() }">Response<input type="radio" class="u-is-hidden-visually" ng-model="webHookType" ng-value="RESPONSE_TYPE"></label></div></div><div class="u-margin-Txs u-text-h6"><div ng-show="isRequestType()"><code class="well u-block u-margin-Bm"><pre class="u-margin-Vn code">{{ (webHook.request_headers | keyvalue) || "no request headers" }}</pre></code> <code class="well u-block"><pre class="u-margin-Vn code">{{ (webHook.request_body | prettyJson) || "no request body" }}</pre></code></div><div ng-show="isResponseType()"><code class="well u-block u-margin-Bm"><pre class="u-margin-Vn code">{{ (webHook.response_headers | keyvalue) || "no response headers" }}</pre></code> <code class="well u-block"><pre class="u-margin-Vn code">{{ (webHook.response_body | prettyJson) || "no response body" }}</pre></code></div></div></div>');
}]);

})();