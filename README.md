# No Black Box Machine Learning Course – Learn Without Libraries
This repository contains a ML model written in JavaScript without using any libraries.
The model is an image recognition model which analyzes an image and classifies it as one of this 8 categories: tree, car, fish, house, bycicle, guitar, pencil, or clock. 
The data is collected through a JavaScript web application, also written in this folder.

## Data
Each data file in `data/raw` is a json dictionary with three keys:
- `session`: session ID
- `student`: name of the person who produced the data
- `drawings`: another dictionary with 8 keys, one for each subject.

Each drawing is a collection of paths, where each path is the collection of point that compose a curve drawn on the app's drawing pad with the mouse or your finger.

The data is then cleaned using `node dataset_generator.js` from the `node` folder. This script turns each raw file into 8 `json` files, one for each drawing, which contain a dictionary containing just the paths for that subject. Each drawing is also rendered as a `png` image for ease of visualization.

The `feature_extractor.js` script is used to extract features from the data. These features are then written into dedicated `.json` and `.js` files. We are currently extracting
- Number of paths
- Number of points (sum over all the paths)
- Maximum height
- Maximum width

## Structure
The structure of the project is currently as follows:
```
No_Black_Box_ML
├── README.md
├── data
│   ├── dataset
│   │   ├── img
│   │   └── json
│   └── raw
├── common
│   ├── classifiers
│   │   └── knn.js
│   ├── constants.js
│   ├── draw.js
│   ├── featureFunctions.js
│   ├── js_objects
│   │   ├── features.js
│   │   ├── minMax.js
│   │   ├── samples.js
│   │   ├── testing.js
│   │   └── training.js
│   └── utils.js
├── node
│   ├── dataset_generator.js
│   ├── feature_extractor.js
│   └── run_evaluation.js
├── package-lock.json
├── package.json
├── python
|   └── knn.py
└── web
    ├── chart
    │   ├── chart.js
    │   ├── graphics.js
    │   └── math.js
    ├── creator.html
    ├── js
    │   ├── display.js
    │   └── sketchPad.js
    ├── styles.css
    └── viewer.html
```
Where
- `data` contains the data used to train the ML model. `raw` contains the raw data, while in `dataset` the data appears both in `json` format and in image format, in the `img` folder
- `web` contains all the files to build the web app to collect the data
- `node` contains the scripts used to manipulate the data from their raw form to their cleaned form, ready for training
- `common` contains scripts that are used both from the `web` frontend and the `node` backend
    - `js_objects` contains files we use to communicate between the node scripts and the web apps
- `python` contains a script to train and test the model on the KNN classifier using the `scikit-learn` library
        

## Useful Info
- To open html files from the WSL2 terminal, use `chrome "$(wslpath -w path/to/html/file)"`
- Data was not loaded into the repository, but was taken from https://github.com/gniziemazity/drawing-data
- `samples.js` is basically the content of the `data/samples.json` file put into a JavaScript constant. This is not really the normal procedure, but this was done in order to avoid CORS (Cross-Origin Resource Sharing) (??) and building a dedicated web server. Maybe try to implement it this way after finishing the project.

## Homework
- Try to calculate the probability for the classification to be correct based on the number `k` of neighbors used (??)
- Try to implement a k-neighbors algorithm with the importance of each neighbor weighted by its distance from the point
- restructure the code in order to eliminate duplicate code from `feature_extractor.js` and `viewer.html`
- implement a third feature (pixel density for example?), and make it possible to toggle it on and off for the sorting, switching between a 2d and 3d plot
- find the best `k`, meaning the `k` that gives the best accuracy, and create a line chart (k vs accuracy)
- in Python, use `matplotlib` to try and display the feature values and decision boundaries