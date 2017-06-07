MusicController = function($scope, $sce){
    var ctrl = this;
    this.title = 'enjoy';
};

angular.module('debazeApp').component('music', {
  templateUrl: 'music.html',
  controller: MusicController
});
