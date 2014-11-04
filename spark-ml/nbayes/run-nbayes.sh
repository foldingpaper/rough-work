#! /bin/sh

: ${SPARK_HOME?"Please set SPARK_HOME"}

$SPARK_HOME/bin/spark-submit nbayes.py 2>/dev/null
