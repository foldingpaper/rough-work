var solrService = angular.module('SolrService', ['ngResource']);

solrService.constant('URL', {
  'priceRange': 'http://localhost:8983/solr/select?q=*:*&facet=true&facet.query=price:[*+TO+10]&facet.query=price:[10+TO+100]&facet.query=price:[100+TO+1000]&facet.query=price:[1000+TO+*]&rows=0&indent=true&facet.query&wt=json&json.wrf=JSON_CALLBACK',
  'category': 'http://localhost:8983/solr/select?q=*:*&facet=true&facet.&facet.field=cat&rows=0&indent=true&facet.query&wt=json&json.wrf=JSON_CALLBACK',
});

solrService.factory('PriceRange', ['$resource', 'URL',
  function($resource, URL) {
    return $resource(URL.priceRange,
      { 'json.wrf' : 'JSON_CALLBACK'}, 
      { 'query' : {method: 'JSONP'}}
    );
  }
]);

solrService.factory('Category', ['$resource', 'URL',
  function($resource, URL) {
    return $resource(URL.category,
      { 'json.wrf' : 'JSON_CALLBACK'}, 
      { 'query' : {method: 'JSONP'}}
    );
  }
]);

/*

var solrPriceUrl = 'http://localhost:8983/solr/select?q=*:*&facet=true&facet.field=price&facet.field=cat&rows=0&indent=true&facet.query&wt=json';

var solrPriceUrl = 'http://localhost:8983/solr/select?q=*:*&facet=true&facet.query=price:[*+TO+10]&facet.query=price:[10+TO+100]&facet.query=price:[100+TO+1000]&facet.query=price:[1000+TO+*]&rows=0&indent=true&facet.query&wt=json&json.wrf=JSON_CALLBACK';

var solrCategoryUrl = 'http://localhost:8983/solr/select?q=*:*&facet=true&facet.&facet.field=cat&rows=0&indent=true&facet.query&wt=json&json.wrf=JSON_CALLBACK';

http://localhost:8983/solr/select?q=*:*&facet=true&facet.query=price:[*+TO+10]&facet.query=price:[10+TO+100]&facet.query=price:[100+TO+1000]&facet.query=price:[1000+TO+*]&rows=0&indent=true&facet.query&wt=json&json.wrf=JSON_CALLBACK

&facet.range=price
&f.price.facet.range.start=0.0
&f.price.facet.range.end=1000.0
&f.price.facet.range.gap=100

&facet.interval=price&f.price.facet.interval.set=[0,10]&f.price.facet.interval.set=(10,100]&f.price.facet.interval.set=(100,1000]&f.price.facet.interval.set=(1000,*]

 */
