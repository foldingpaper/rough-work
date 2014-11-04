#!/usr/bin/env python


from pyspark import SparkConf, SparkContext
from pyspark.mllib.clustering import KMeans
from numpy import array
from math import sqrt


def error(clusters, point):
    '''
    '''
    # Evaluate clustering by computing Within Set Sum of Squared Errors
    center = clusters.centers[clusters.predict(point)]
    return sqrt(sum([x**2 for x in (point - center)]))


def main():
    '''
    '''
    # set up environment
    conf = SparkConf() \
            .setAppName("kMeans") \
            .set("spark.executor.memory", "2g")
    sc = SparkContext(conf=conf)

    # Load and parse the data
    data = sc.textFile("data/kmeans_data.txt")
    parsedData = data.map( \
            lambda line: array([float(x) for x in line.split(' ')]))

    # Build the model (cluster the data)
    clusters = KMeans.train(parsedData, 2, maxIterations=10, \
            runs=10, initializationMode="random")

    WSSSE = parsedData.map(lambda point: error(clusters, point)) \
            .reduce(lambda x, y: x + y)

    print("Within Set Sum of Squared Error = " + str(WSSSE))


if __name__ == '__main__':
    main()
