#!/usr/bin/env python


from pyspark import SparkConf, SparkContext
from pyspark.mllib.regression import LabeledPoint
from pyspark.mllib.classification import NaiveBayes


def main():

    # set up environment
    conf = SparkConf() \
      .setAppName("NavieBayes") \
      .set("spark.executor.memory", "2g")
    sc = SparkContext(conf=conf)

    # an RDD of LabeledPoint
    data = sc.parallelize([
      LabeledPoint(0.0, [1.0, 0.0, 0.0]),
      LabeledPoint(0.0, [2.0, 0.0, 0.0]),
      LabeledPoint(1.0, [0.0, 1.0, 0.0]),
      LabeledPoint(1.0, [0.0, 2.0, 0.0]),
      LabeledPoint(2.0, [0.0, 0.0, 1.0]),
      LabeledPoint(2.0, [0.0, 0.0, 2.0])
    ])

    # Train a naive Bayes model.
    model = NaiveBayes.train(data, 1.0)

    # Make prediction.
    prediction = model.predict([0.0, 0.0, 0.0])
    print "prediction: " + str(prediction)


if __name__ == "__main__":
    main()
