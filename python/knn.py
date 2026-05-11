from sklearn.neighbors import KNeighborsClassifier
from functions import readFeatureFile

knn = KNeighborsClassifier(
    n_neighbors=50,
    algorithm="brute",
    weights="uniform"
)

X,y = readFeatureFile('../data/dataset/training.csv')

knn.fit(X,y)

X,y = readFeatureFile('../data/dataset/testing.csv')

accuracy = knn.score(X,y)
print('Accuracy: ', accuracy)

