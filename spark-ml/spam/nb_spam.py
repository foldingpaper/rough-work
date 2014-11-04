#!/usr/bin/env python

import sys
from pyspark import SparkConf, SparkContext
from pyspark.mllib.regression import LabeledPoint
from pyspark.mllib.classification import NaiveBayes


def parseTrainingDataLine(line):
    '''Parse Training Data Line
    Parse a line from training data file into a 
    labeled point as label followed by features as:

    spam  f1  f2  ... f48 (features)
    1|0   1.0 2.0     1.48
    '''

    fields = line.split(",")
    return LabeledPoint(fields[-1], [float(f) for f in fields[0:48]])


def readTrainingData(filename):
    '''Read training data
    Reads every line and forms the training data list of LabeledPoints.
    Calls parseTrainingDataLine to convert line into a LabeledPoint.
    '''
    print "Reading data file: " + filename
    file = open(filename, "r")
    data = [parseTrainingDataLine(line) for line in file]
    file.close()
    return data


def readTest(filename):
    '''Read Test Data
    Read the candidate data file to test for spam.
    '''
    print "Reading test file: " + filename
    file = open(filename, "r")
    text = file.read();
    file.close()
    return text


def prepareWords(filename, wordList, wordDict):
    '''Parse Words
    Read corpus feature words into the list and
    initialize dict for word counts.
    '''
    print "Preparing feature attributes"
    file = open(filename, "r")
    for w in file:
        word = w.strip()
        wordList.append(word)
        wordDict[word] = 0


def processTest(wordList, wordCountDict, text):
    '''Process test data
    Read the test text and prepare the feature vector
    that represents that text.
    '''
    print "Processing test input into feature vector"
    textWords = [t.strip() for t in text.split()]
    for w in textWords:
        if w not in wordList:
            continue
        if w in wordCountDict:
            wordCountDict[w] += 1
        else:
            wordCountDict[w] = 1
    total = len(textWords)

    return [wordCountDict[w]*100.0/total for w in wordList]


def main():
    '''
    '''
    # set up environment
    conf = SparkConf() \
      .setAppName("NB Spam") \
      .set("spark.executor.memory", "2g")
    sc = SparkContext(conf=conf)

    dataFile = sys.argv[1]
    wordFile = sys.argv[2]
    testFile = sys.argv[3]

    print "Using data file: " + dataFile
    print "Using word file: " + wordFile
    print "Using test file: " + testFile

    labeledPoints = readTrainingData(dataFile)
    print "Training data size: " + str(len(labeledPoints))
    data = sc.parallelize(labeledPoints)

    # Train a naive Bayes model.
    print "Training Naive Bayes model"
    model = NaiveBayes.train(data, 1.0)

    wordList = []
    wordDict = {}
    prepareWords(wordFile, wordList, wordDict)

    # Make prediction.
    testPoint = processTest(wordList, wordDict, readTest(testFile))
    print "Predicting..."
    prediction = model.predict(testPoint)
    if prediction:
        predictionStr = "SPAM"
    else:
        predictionStr = "HAM"
    print "Prediction: " + predictionStr


if __name__ == "__main__":
    main()
