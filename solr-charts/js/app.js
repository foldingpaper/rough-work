/* from https://github.com/pablojim/highcharts-ng */

'use strict';

var demoApp = angular.module('demoApp', ['highcharts-ng', 'SolrService']);

demoApp.controller('SolrAnalyticsController', ['$scope', 'PriceRange', 'Category',
  function ($scope, priceRangeResource, categoryResource) {


  $scope.chartTypes = [
    {"id": "line", "title": "Line"},
    {"id": "spline", "title": "Smooth line"},
    {"id": "area", "title": "Area"},
    {"id": "areaspline", "title": "Smooth area"},
    {"id": "column", "title": "Column"},
    {"id": "bar", "title": "Bar"},
    {"id": "pie", "title": "Pie"},
    {"id": "scatter", "title": "Scatter"}
  ];

  $scope.dashStyles = [
    {"id": "Solid", "title": "Solid"},
    {"id": "ShortDash", "title": "ShortDash"},
    {"id": "ShortDot", "title": "ShortDot"},
    {"id": "ShortDashDot", "title": "ShortDashDot"},
    {"id": "ShortDashDotDot", "title": "ShortDashDotDot"},
    {"id": "Dot", "title": "Dot"},
    {"id": "Dash", "title": "Dash"},
    {"id": "LongDash", "title": "LongDash"},
    {"id": "DashDot", "title": "DashDot"},
    {"id": "LongDashDot", "title": "LongDashDot"},
    {"id": "LongDashDotDot", "title": "LongDashDotDot"}
  ];

  $scope.chartStack = [
    {"id": '', "title": "No"},
    {"id": "normal", "title": "Normal"},
    {"id": "percent", "title": "Percent"}
  ];

  $scope.clearChart = function(chart) {
    chart.series = [];
  }

  $scope.priceChartSeries = [];

  $scope.priceChartConfig = {
    options: {
      chart: {
        // type: 'areaspline'
        type: 'line'
      },
      plotOptions: {
        series: {
          stacking: ''
        }
      }
    },
    series: $scope.priceChartSeries,
    title: {
      text: 'Price Range'
    },
    credits: {
      enabled: true
    },
    loading: false,
    size: {}
  }

  var priceRangeCategoryLabel = {
    '[* TO 10]': 'less than 10',
    '[10 TO 100]': '10 - 99',
    '[100 TO 1000]': '100 - 999',
    '[1000 TO *]': '1000 and above',
    'Other': 'Other',
  };

  $scope.addPriceRange = function () {
    $scope.priceChartConfig.loading = true;
    var result = priceRangeResource.query({}, 
      function() {
        var prices = result.facet_counts.facet_queries;
        var categories = []
        var pd = [];
        for (var k in prices) {
          var o = {};
          o.y = prices[k];
          o.name = k.substring(6);
          if (o.name == "") {
            o.name = "Other";
          }
          categories.push(priceRangeCategoryLabel[o.name]);
          pd.push(o);
        }
        $scope.priceChartConfig.loading = false;
        $scope.clearChart($scope.priceChartConfig);
        $scope.priceChartConfig.options.xAxis = {};
        $scope.priceChartConfig.options.xAxis.categories = categories;
        $scope.priceChartConfig.series.push({name: 'Item Count', data: pd});
      }, 
      function() {
        $scope.priceChartConfig.loading = false;
        error = 1
        console.log("error" + e);
      }
    );
  }


  $scope.catChartSeries = [];

  $scope.catChartConfig = {
    options: {
      chart: {
        type: 'bar'
      },
      plotOptions: {
        series: {
          stacking: ''
        }
      }
    },
    series: $scope.catChartSeries,
    title: {
      text: 'Categories'
    },
    credits: {
      enabled: true
    },
    loading: false,
    size: {}
  }


  $scope.addCatSeries = function () {
    $scope.catChartConfig.loading = true;
    var result = categoryResource.query({}, 
      function() {
        var cats = result.facet_counts.facet_fields.cat;
        var prices = result.facet_counts.facet_queries;
        var xlabels = []
        var cd = [];
        var catsCount = cats.length;
        for (var i=0; i<catsCount; i++) {
          var o = {};
          o.name = cats[i];
          o.y = cats[i+1];
          if (o.name == "") {
            o.name = "Other";
          }
          xlabels.push(o.name);
          cd.push(o);
        }
        $scope.catChartConfig.loading = false;
        $scope.clearChart($scope.catChartConfig);
        $scope.catChartConfig.options.xAxis = {};
        $scope.catChartConfig.options.xAxis.categories = xlabels;
        $scope.catChartConfig.series.push({name: 'Item Count', data: cd});
      }, 
      function(e) {
        $scope.catChartConfig.loading = false;
        error = 1
        console.log("error" + e);
      }
    );
  }


}]);
