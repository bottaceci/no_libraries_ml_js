# No Black Box Machine Learning Course – Learn Without Libraries
This repository contains a ML model written in JavaScript without using any libraries, following the tutorial at [No Black Box Machine Learning Course – Learn Without Libraries](https://www.youtube.com/watch?v=vDDjtwQDw2k&list=PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s&index=5). 
The model is an image recognition model which analyzes an image and classifies it as one of this 8 categories: tree, car, fish, house, bycicle, guitar, pencil, or clock. 
The data is collected through a JavaScript web application, also written in this folder.

## Data
Each data file in `data/raw` is a json dictionary with three keys:
- `session`: session ID
- `student`: name of the person who produced the data
- `drawings`: another dictionary with 8 keys, one for each subject.

Each drawing is a collection of paths, where each path is the collection of point that compose a curve drawn on the app's drawing pad with the mouse or your finger.

The data is then cleaned using `node dataset_generator.js` from the `node` folder. This script turns each raw file into 8 `json` files, one for each drawing, which contain a dictionary containing just the paths for that subject. Each drawing is also rendered as a `png` image for ease of visualization.

The `feature_extractor.js` script is used to extract features from the data. These features are then written into dedicated `.json` and `.js` files.

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
│   ├── constants.js
│   ├── draw.js
│   ├── js_objects
│   └── utils.js
├── node
│   ├── dataset_generator.js
│   ├── package-lock.json
│   └── package.json
└── web
    ├── creator.html
    ├── js
    │   └── sketchPad.js
    └── styles.css
```
Where
- `data` contains the data used to train the ML model. `raw` contains the raw data, while in `dataset` the data appears both in `json` format and in image format, in the `img` folder
- `web` contains all the files to build the web app to collect the data
- `node` contains the scripts used to manipulate the data from their raw form to their cleaned form, ready for training
- `common` contains scripts that are used both from the `web` frontend and the `node` backend
    - `js_objects` contains files we use to communicate between the node scripts and the web apps
        

## Useful Info
- To open html files from the WSL2 terminal, use `chrome "$(wslpath -w path/to/html/file)"`
- Data was not loaded into the repository, but was taken from https://github.com/gniziemazity/drawing-data
- `samples.js` is basically the content of the `data/samples.json` file put into a JavaScript constant. This is not really the normal procedure, but this was done in order to avoid CORS (Cross-Origin Resource Sharing) (??) and building a dedicated web server. Maybe try to implement it this way after finishing the project.