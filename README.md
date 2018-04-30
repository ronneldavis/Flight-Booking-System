# Flight Booking System
The purpose of the project is to apply natural language processing, pattern recognition and machine learning to make it easier to fill forms on the web. We approach the problem using web automation tools to emulate a human and we use Natural Language Processing to gain user intent and parameters required to fill forms. The use of machine learning means the tool to be language agnostic and hence can be applied to help a speakers of regional languages fill up forms on the web with ease. We start by working with flight booking websites to reduce complexity and to make sure we have a single data model to work with.

## Getting started
Download the folder and run 
```npm install``` 
to install all the required dependencies. To run the program enter 
```npm start```
Enter the URL displayed in the Chrome browser on your computer or on another computer to remotely access the server.
To run a test enter 
``` npm test```

## Adding new website data
To manually add a new website, modify the database.js file with the required metadata. Then update the run method in the core.js file.

## Work done
### Data Acquisition
Data of form elements were acquired from 10 different travel booking web- sites. For each website, HTML elements for departure airport, arrival airport, departure data, arrival date and number of passengers were acquired. In ad- dition to these fields, a few other fields like search, email and so on were also taken to reduce bias towards non essential tag names like class and id.

### Preprocessing
For our data processing, we take html tags like input, select and div and get their attribute values. In HTML, attributes are values in XML to give certain attributes like styling, classes and IDs to elements. We then process these tags by:
1. Replacing all non-alphabet symbols with spaces
2. Splitting camel case strings
3. Replacing multiple spaces and other whitespace characters with a single space
We now get a string separated by spaces with only alphabet symbols with all attribute values.

```
i/p: <input type = t e x t class = form field departure.airport placeholder = Departure
airport />

o/p: text form field departure airport departure airport
```

### Machine Learning
We first build a simple feature extractor that takes every word in the string to be a feature. We also use a lower case normaliser to make sure that the neural net is case insensitive. The machine learning technique we use is called a multi label classifier.
We use a binary relevance multilevel classifier with a Winnow binary classifier. We set a retrain count of 100 for higher accuracy.


## License
Copyright (c) 2018 Ronnel Davis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
