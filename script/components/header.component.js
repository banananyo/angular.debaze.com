MainheaderController = function($scope){
    var ctrl = this;
    ctrl.htitle='headerTitle';
    // $scope.optionBox=true;
    $scope.tabSignInBox=false;
    $scope.tabSigUpBox=false;
    $scope.loggedIn=false;
    $scope.userLoggedIn=null;
    $scope.getCurrentDate = function(){
      var date = new Date();
      var y,m,d;
      if(date.getMonth()+1<10){
        m='0'+(date.getMonth()+1);
      }
      if(date.getDate()<10){
        d='0'+date.getDate();
      }
      y=date.getFullYear();
      var dateParam = '#/income?y='+y+'&m='+m+'&d='+d;
      return dateParam;
    }
    // $('#signInBox').hide();
    $scope.toggleSignIn = function(){
      // $scope.optionBox=!$scope.optionBox;
      $scope.tabSignInBox=! $scope.tabSignInBox;
    };

    $scope.toggleSignUp = function(){
      $scope.tabSignUpBox=! $scope.tabSignUpBox;
    };

    $scope.optionClose = function(){
      $scope.tabSignUpBox=false;
      $scope.tabSignInBox=false;
      $('#userEmailInput').val("");
      $('#userPasswordInput').val("");
      $('#upUserEmailInput').val("");
      $('#upUserPasswordInput1').val("");
    }

    $('#signInBox, #signUpBox').submit(function(e){
      e.preventDefault();
    });
    var promise=null;
    $scope.signInByEmailAndPassword = function(){
      var email = $('#userEmailInput').val();
      var password = $('#userPasswordInput').val();
      promise = firebase.auth().signInWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
    };
    $scope.signOut = function(){
      firebase.auth().signOut();
    };

    $scope.signUpByEmailAndPassword = function(){
      var email = $('#upUserEmailInput').val();
      var password = $('#upUserPasswordInput1').val();
      promise = firebase.auth().createUserWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
    };

    $scope.signOut = function(){
      firebase.auth().signOut();
    };

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        $scope.$apply(function(){
          $scope.loggedIn=true;
          $scope.userLoggedIn=firebaseUser.email;
          $scope.optionClose();
        });
      }else{
        console.log('not loged in');
        $scope.$apply(function(){
          $scope.loggedIn=false;
          $scope.userLoggedIn=null;
          $scope.optionClose();
        });
        
      }
    });
    
};

angular.module('debazeApp').component('mainHeader', {
  templateUrl: 'header.html',
  controller: MainheaderController
  ,
  bindings: {
    htitle: '='
  }
});
