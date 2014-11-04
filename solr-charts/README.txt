Experimenting with the example from https://github.com/pablojim/highcharts-ng

Setup
-----
1.install solr4
2. run
   # java -jar start.jar
3. push sample data:
   # ./post.sh monitor.xml
   # java -jar post.jar *.xml
   # curl http://localhost:8983/solr/update/csv --data-binary @books.csv -H 'Content-type:text/plain; charset=utf-8'
   # curl 'http://localhost:8983/solr/update/json?commit=true' --data-binary @books.json -H 'Content-type:application/json' 

Run
---
Assuming solr from above setup is running...

1. Open file:///.../solr-charts/index.html in browser
2. Click Show Price Range Chart
3. Click Show Category Chart
