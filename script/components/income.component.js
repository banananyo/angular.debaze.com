IncomeController = function($scope, $sce, $location, $timeout, $routeParams){
    var ctrl = this;
    this.title = 'incomeeeee';
    $scope.isLogin=false;
    $scope.isLoading=true;
    $scope.imgSrc = {
        datePickIcon: $sce.trustAsResourceUrl('resources/icon/datePick32.png'),
    };
    $scope.firebaseObject=null;
    $scope.dateToFetch = ($routeParams===null) ? null : $routeParams;
    // $.getJSON('config/config.json',{
        // async: false
    // }).done(function(json){
        // console.log('config');
        // console.log(json);
        // config(json);
    // });

    // var config = function(json){
    //     appUrl=json.appUrl;
    // };

    $(document).ready(function(){
        $( "#income_date_field, #dateToFetchInput" ).datepicker({
            dateFormat: "yy/mm/dd",
            showOtherMonths: true,
            selectOtherMonths: true,
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            showOn: "button",
            buttonImage: $scope.imgSrc.datePickIcon,
            buttonImageOnly: true,
            buttonText: "Select date"
        });
    });
    $scope.isDateNull = function(){
        // return !!($scope.dateToFetch = null);
        return !($scope.dateToFetch === null);
    };
    $scope.getDateString = function(){
        if($scope.dateToFetch!==null){
            return dateObjectToString($scope.dateToFetch);
        }
        return "select date...";
    };
    var dateObjectToString = function(obj){
        return (obj.y+'/'+obj.m+'/'+obj.d);
    };
    var dateStringToObject = function(str){
        var s = (str+'').split('/');
        return {
            y:s[0],
            m:s[1],
            d:s[2]
        };
    };
    var callbackFirebase = function(snapshot){
        if($scope.dateToFetch!==null){
            // console.log(snapshot.val());
            var obj={};
            obj[snapshot.key] = snapshot.val();
            // console.log(obj);
            $timeout(function() {
                $scope.$apply(function(){
                    $scope.isLoading = false;
                    $scope.firebaseObject = obj;
                });
            }, 0);
        }

    };

    firebase.database().ref('income').on("child_changed", function(snapshot) {
        console.log('event: child_changed');
        callbackFirebase(snapshot);
    });
    firebase.database().ref('income').on("child_removed", function(snapshot) {
        // console.log('event: child_removed');
        callbackFirebase(snapshot);
    });
    firebase.database().ref('income').on("child_added", function(snapshot) {
        // console.log('event: child_added');
        callbackFirebase(snapshot);
    });

    var notEmpty = function(variable){
        return (variable!==null && variable!==undefined && variable.length!==0 && variable!=='');
    };

    //#formInsertIncome
    var insertIncome = function(){
        // A post entry.
        var money = $('#income_money_field').val();
        var topic = $('#income_topic_field').val();
        var type = $('#income_type_field').val();
        var postData = {
          money: money,
          topic: topic,
          type: type
        };

        if(notEmpty(money)&&notEmpty(type)&&notEmpty(topic)){
            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('income/'+$('#income_date_filed').val()).push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/income/'+$('#income_date_field').val()+'/' + newPostKey] = postData;
            // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

            return (firebase.database().ref().update(updates));
        }else{
            console.log('have insert empty filed');
            alert('empty field');
        }
    };

    var refreshPage = function(dayParams){
        $scope.$apply($location.path('/income/'+dayParams.y+'/'+dayParams.m+'/'+dayParams.d).replace());
    };

    $('#insertBut').click(function(){
      var promise = insertIncome();
      if(promise){
        promise.then(function(){
            // var dateObj = dateStringToObject($('#income_date_field').val());
            // $scope.$apply($location.path('/income/'+$scope.dateToFetch.y+'/'+$scope.dateToFetch.m+'/'+$scope.dateToFetch.d).replace());
            // refreshPage($scope.dateToFetch);
        });
      }
    });

    $('#submitDate').submit(function(e){
        e.preventDefault();
        // $timeout(function() {
            // $scope.dateToFetch=dateStringToObject($('#dateToFetchInput').val());
            // $scope.$apply($location.path('/income').search({y: $scope.dateToFetch.y, m:$scope.dateToFetch.m, d:$scope.dateToFetch.d}).replace());
            refreshPage(dateStringToObject($('#dateToFetchInput').val()));
        // }, 0);
        // var path = 'http://' + window.location.hostname + window.location.pathname+'#/income';
        // window.location.replace(path+'?y=2560&m=05&d=23');
    });



    firebase.auth().onAuthStateChanged(function(firebaseUser){
      if(firebaseUser){
        $scope.$apply(function(){
            $scope.isLogin=true;
        });
      }else{
        $scope.$apply(function(){
            $scope.isLogin=false;
        });
      }
    });
};

angular.module('debazeApp').component('income', {
  templateUrl: 'income.html',
  controller: IncomeController
});
