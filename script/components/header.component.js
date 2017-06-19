MainheaderController = function($scope, $route){
    var ctrl = this;
    ctrl.htitle='headerTitle';
    // $scope.optionBox=true;
    $scope.avartar=null;
    $scope.tabSignInBox=false;
    $scope.tabSigUpBox=false;
    $scope.loggedIn=false;
    $scope.userLoggedIn=null;
    $scope.getCurrentDate = function(){
      var date = new Date();
      var y,m,d;
      m=(date.getMonth()+1<10)? ('0'+(date.getMonth()+1)):(date.getMonth()+1);
      d=(date.getDate()<10)? ('0'+date.getDate()):(date.getDate());
      y=date.getFullYear();
      return '#/income/'+y+'/'+m+'/'+d;
    };
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
    };

    $('#signInBox, #signUpBox').submit(function(e){
      e.preventDefault();
    });
    var promise=null;
    $scope.signInByEmailAndPassword = function(){
      var email = $('#userEmailInput').val();
      var password = $('#userPasswordInput').val();
      promise = firebase.auth().signInWithEmailAndPassword(email, password);
      promise.catch(function (e) {
          console.log(e.message);
      });
    };
    $scope.signOut = function(){
      firebase.auth().signOut();
    };

    $scope.signUpByEmailAndPassword = function(){
      var email = $('#upUserEmailInput').val();
      var password = $('#upUserPasswordInput1').val();
      promise = firebase.auth().createUserWithEmailAndPassword(email, password);
      promise.catch(function (e) {
          console.log(e.message);
      });
    };

    $scope.signOut = function(){
      firebase.auth().signOut();
    };

    $scope.log = function(){
      console.log($scope.avartar);
      firebase.storage().ref().child($scope.avartar).getDownloadURL().then(function(snapshot){
        console.log(snapshot);
      });
    }

    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser){
        console.log(firebaseUser);
        firebase.database().ref('users/'+firebaseUser.uid).once('value').then(function(snapshot){
           $scope.$apply(function(){
            $scope.avartar=(snapshot.val()).avartar;
           });
          });
        $scope.$apply(function(){
          $scope.loggedIn=true;
          $scope.userLoggedIn=firebaseUser;
          $scope.optionClose();
          $route.reload();
        });
      }else{
        console.log('not loged in');
        $scope.$apply(function(){
          $scope.loggedIn=false;
          $scope.userLoggedIn=null;
          $scope.avartar=null;
          $scope.optionClose();
        });
        
      }
    });
    var facebook_provider = new firebase.auth.FacebookAuthProvider();
    $scope.facebook_login = function(){
      firebase.auth().signInWithPopup(facebook_provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token);
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        //******************************************** */
        // An error happened.
        // if (error.code === 'auth/account-exists-with-different-credential') {
        //   // Step 2.
        //   // User's email already exists.
        //   // The pending Facebook credential.
        //   var pendingCred = error.credential;
        //   // The provider account's email address.
        //   var email = error.email;
        //   // Get registered providers for this email.
        //   firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
        //     // Step 3.
        //     // If the user has several providers,
        //     // the first provider in the list will be the "recommended" provider to use.
        //     if (providers[0] === 'password') {
        //       // Asks the user his password.
        //       // In real scenario, you should handle this asynchronously.
        //       // var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
        //       var password = 'baze_8514';
        //       firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        //         // Step 4a.
        //         // return user.link(pendingCred);
        //       }).then(function() {
        //         // Facebook account successfully linked to the existing Firebase user.
        //         // goToApp();
        //       });
        //       return;
        //     }
        //     // All the other cases are external providers.
        //     // Construct provider object for that provider.
        //     // TODO: implement getProviderForProviderId.
        //     var provider = getProviderForProviderId(providers[0]);
        //     // At this point, you should let the user know that he already has an account
        //     // but with a different provider, and let him validate the fact he wants to
        //     // sign in with this provider.
        //     // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        //     // so in real scenario you should ask the user to click on a "continue" button
        //     // that will trigger the signInWithPopup.
        //     firebase.auth().signInWithPopup(provider).then(function(result) {
        //       // Remember that the user may have signed in with an account that has a different email
        //       // address than the first one. This can happen as Firebase doesn't control the provider's
        //       // sign in flow and the user is free to login using whichever account he owns.
        //       // Step 4b.
        //       // Link to Facebook credential.
        //       // As we have access to the pending credential, we can directly call the link method.
        //       // result.user.link(pendingCred).then(function() {
        //         // Facebook account successfully linked to the existing Firebase user.
        //         // goToApp();
        //       // });
        //     });
        //   });
        // }
        //******************************************** */
      });
    };

    $scope.facebook_logout = function(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('logout facebook successful.');
      }).catch(function(error) {
        // An error happened.
        console.log('logout facebook error.');
      });
    };
};

angular.module('debazeApp').component('mainHeader', {
  templateUrl: 'header.html',
  controller: MainheaderController
  ,
  bindings: {
    htitle: '='
  }
});
