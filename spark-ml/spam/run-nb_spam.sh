#! /bin/sh

: ${SPARK_HOME?"Please set SPARK_HOME"}

$SPARK_HOME/bin/spark-submit nb_spam.py \
  data/spambase.data \
  data/spambase.words \
  good.txt \
  2>/dev/null

