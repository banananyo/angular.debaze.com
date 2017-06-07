CardController = function($scope, $sce){
    var ctrl = this;
    $scope.imgSrc = {
        pokemon_all1: $sce.trustAsResourceUrl('resources/images/pokemon_all1.jpg'),
    }
};

angular.module('debazeApp').component('card', {
  templateUrl: 'card.html',
  controller: CardController
});
