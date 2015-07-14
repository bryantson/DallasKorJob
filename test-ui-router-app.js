var app = angular.module("TestUIRouterApp", ["ui.router"]);

app.config(["$stateProvider", 
            "$urlRouterProvider", 
function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "/home.html",
            controller: "HomeCtrl"
        })
        .state("news", {
            url: "/news",
            templateUrl: "/news.html",
            controller: "NewsCtrl"
        })
        .state("job", {
            url: "/job",
            templateUrl: "/job.html",
            controller: "JobCtrl"
        })
        .state("readJob", {
            url: "/readJob/{id}",
            templateUrl: "/readJob.html",
            controller: "ReadJobCtrl"
        });
    
    $urlRouterProvider.otherwise("/");
}]);

app.factory("listJobs", [function() {
    var objJob = {
        currentJobs: []  
    };
    return objJob;
}]);

app.controller("HomeCtrl", ["$scope", function($scope) {
    $scope.date = "July 12, 2015";
}]);

app.controller("JobCtrl", ["$scope", "listJobs", function($scope, listJobs) {
    
    $scope.listJobs = listJobs.currentJobs;
    
    $scope.addJob = function() {
      $scope.listJobs.push({
          title: $scope.title,
          description: $scope.description,
          author: $scope.author,
          datePosted: new Date(),
          numView: 0,
          comments: [
              {author: "Someone", text: "저 관심 있어요"},
              {author: "김유나", text: "안녕하세요"}
          ]
      });
    };
}]);

app.controller("ReadJobCtrl", ["$scope", "$stateParams","listJobs", 
    function($scope, $stateParams, listJobs) {
         
       $scope.jobPost = listJobs.currentJobs[$stateParams.id];
}]);

app.controller("NewsCtrl", ["$scope", function($scope) {
    $scope.listNews = [
        {name: "MERS Situation in South Korea", author: "Michael Grimm", url: "http://www.naver.com"},
        {name: "Hackathon Cancelled", author: "Soyoung Lee", url: "http://www.daum.net"},
        {name: "Highest Ferrari Sold", author: "Mina Kim", url: "http://www.google.com"}
    ];
    
    $scope.addNews = function() {
        $scope.listNews.push({
            name: $scope.name,
            url: $scope.url,
            author: $scope.author,
            datePosted: new Date()
        });
    };
}]);