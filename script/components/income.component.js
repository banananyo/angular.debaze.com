IncomeController = function($scope, $sce, $location, $timeout){
    var ctrl = this;
    this.title = 'incomeeeee';
    $scope.isLoading=true;
    $scope.imgSrc = {
        datePickIcon: $sce.trustAsResourceUrl('resources/icon/datePick32.png'),
    }
    $scope.firebaseObject=null;
    if($location.search()==null){
        $scope.dateToFetch=null;
    }else{
        $scope.dateToFetch=$location.search();
    }
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
    // var innerOnload = function(outer,loadingBox){
    //     loadingBox.html("loading...");
    //     outer.show();
    // }
    // var innerLoaded = function(outer,loadingBox){
        // loadingBox.html("");
        // outer.hide();
    // }
    $(document).ready(function(){
        // innerOnload($('#outer_loading_box'),$('#loading_box'));
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
        if($scope.dateToFetch=null){
            return true;
        }else{
            return false;
        }
    };
    $scope.getDateString = function(){
        if($scope.dateToFetch!=null){
            return dateObjectToString($scope.dateToFetch);
        }
        return "select date...";
    };
    var dateObjectToString = function(obj){
        return (obj.y+'/'+obj.m+'/'+obj.d);
    };
    var dateStringToObject = function(str){
        var s = str.split('/');
        var obj = {
            y:s[0],
            m:s[1],
            d:s[2]
        };
        return obj;
    };
    var callbackFirebase = function(snapshot){
        if($scope.dateToFetch!=null){
            // console.log(snapshot.val());
            var obj={};
            obj[snapshot.key] = snapshot.val();
            // console.log(obj);
            $timeout(function() {
                $scope.$apply(function(){
                    $scope.isLoading=false;
                    $scope.firebaseObject = obj;
                });
            }, 0);
        }
        
    };
    // const auth = firebase.auth();
    // var email = "wazjakorn@gmail.com";
    // var password = "baze_8514";
    // const promise = auth.signInWithEmailAndPassword(email, password);
    // promise.catch(e => console.log(e.message));
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
        if(variable==null || variable==undefined || variable.length==0 || variable==''){
            return false;
        }
        return true;
    };
    
    //#formInsertIncome
    var insertIncome = function(){
        // A post entry.
        var postData = {
          money: $('#income_money_field').val(),
          topic: $('#income_topic_field').val(),
          type: $('#income_type_field').val()
        };

        if(notEmpty($('#income_money_field').val())&&notEmpty($('#income_topic_field').val())&&notEmpty($('#income_type_field').val())){
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
    }

    $('#insertBut').click(function(){
      var promise = insertIncome();
      if(promise){
        promise.then(function(){
            // window.location.reload();income_date_field
            var dateObj = dateStringToObject($('#income_date_field').val());
            $scope.$apply($location.path('/income').search({y: dateObj.y, m:dateObj.m, d:dateObj.d}).replace());
        });
      }
    });

    $('#submitDate').submit(function(e){
        e.preventDefault();
        $timeout(function() {
            $scope.dateToFetch=dateStringToObject($('#dateToFetchInput').val());
            $scope.$apply($location.path('/income').search({y: $scope.dateToFetch.y, m:$scope.dateToFetch.m, d:$scope.dateToFetch.d}).replace());
        }, 0);
        // var path = 'http://' + window.location.hostname + window.location.pathname+'#/income';
        // window.location.replace(path+'?y=2560&m=05&d=23');
    });
};

angular.module('debazeApp').component('income', {
  templateUrl: 'income.html',
  controller: IncomeController
});
