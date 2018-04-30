# Flight-Booking-System
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
