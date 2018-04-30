
const limdu      = require( "limdu" );
const webdriver  = require( "selenium-webdriver" );

const driver     = new webdriver.Builder().forBrowser('chrome').build();

var dataset      = require("./dataset.js");
var database     = require("./database.js");

// ===============================================================================
// HELPER FUNCTIONS
// ===============================================================================

function addZero(n) {
  return n.toString().length == 1 ?  n = '0' + n: n;
}
function cleanup(d){
  d.departure = {
      day: Number(d.departure.split("-")[2]),
      month: Number(d.departure.split("-")[1]) - 1,
      year: Number(d.departure.split("-")[0])
  }

  d.arrival = {
      day: Number(d.arrival.split("-")[2]),
      month: Number(d.arrival.split("-")[1]) - 1,
      year: Number(d.arrival.split("-")[0])
  }
  return d;
}

// ===============================================================================
// MACHINE LEARNING BIT
// ===============================================================================

var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 100})
});
var WordExtractor = function(input, features) {
	input.split(" ").forEach(function(word) {
        features[word]=1;
	});
};
var intentClassifier = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});
intentClassifier.trainBatch(dataset);

module.exports.run = function(obj){
  obj = cleanup(obj);

  var final_data = {};
  obj["website"] = "akbar";
  return driver.sleep(2000).then(function(){
    return performGenesis(obj).then(function(data){
        final_data["akbar"] = data;
        obj["website"] = "happyeasygo";
        return performGenesis(obj).then(function(data){
            final_data["happyeasygo"] = data;
            obj["website"] = "cleartrip";
            return performGenesis(obj).then(function(data){
                final_data["cleartrip"] = data;

                var contents = JSON.stringify(final_data);
                console.log(contents);
                return contents;
            });
        });
    });
  });
}

function performGenesis(d){
    return getElementsDB(d).then(function(page_info){
        return fillForm(d, page_info).then(function(){
            driver.wait(function() {
                return driver.getCurrentUrl().then(function(url) {
                    return (url.toLowerCase().indexOf('results') !== -1) || (url.toLowerCase().indexOf('search') !== -1) || (url.toLowerCase().indexOf('flights') !== -1);
                });
            });
            return driver.sleep(6000).then(function(){
                return returnData(d.website).then(function(obj){
                    return Promise.resolve(obj);
                });
            });
        });
    });
}
function getElementsML(data){
    var url = database[data.website].url;
    driver.get(url);
    var page_info = {};

    return driver.executeScript(`
    var arr = [];
    var inputs = document.getElementsByTagName('input');
    var selects = document.getElementsByTagName('select');
    var divs = document.querySelectorAll('[contenteditable]');

    for(var j = 0; j < inputs.length; j++) {
        var el = inputs[j];
        var values=[];
        for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++)
            values.push(atts[i].nodeValue);
        arr.push({
            element: el,
            attributes: values.join(" ")
        });
    }

    for(var j = 0; j < selects.length; j++) {
        var el = selects[j];
        var values=[];
        for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++)
            values.push(atts[i].nodeValue);
        arr.push({
            element: el,
            attributes: values.join(" ")
        });
    }

    for(var j = 0; j < divs.length; j++) {
        var el = divs[j];
        var values=[];
        for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++)
            values.push(atts[i].nodeValue);
        arr.push({
            element: el,
            attributes: values.join(" ")
        });
    }

    return arr;
    `).then(function(obj){
        var promises = obj.map(function(el){
            return el.element.isDisplayed().then(function(flag) {
                if(flag){
                    var classification = intentClassifier.classify(el.attributes);
                    if(classification.length > 0){
                        if(classification[0] == "from_airport"){
                            page_info["originElement"] = el.element;
                        }
                        if(classification[0] == "to_airport"){
                            page_info["destinationElement"] = el.element;
                        }

                        if(classification[0] == "from_date"){
                            page_info["departureElement"] = el.element;
                        }
                        if(classification[0] == "to_date"){
                            page_info["arrivalElement"] = el.element;
                        }
                    }
                }
            }, function(err) {
                console.log('Element not found');
            }).catch(function(err){

            });
        });
        return Promise.all(promises).then(function(){
            return Promise.resolve(page_info);
        });
    });
}
function getElementsDB(data){
    var url = database[data.website].url;
    var page_info = database[data.website];

    driver.get(url);

    var promises = [];
    for(key in page_info){
        if(key != "url" && key != "return"){
            var xpath = page_info[key];
            xpath = xpath.replace("$.departure.day", data.departure.day);
            xpath = xpath.replace("$.departure.month", data.departure.month);
            xpath = xpath.replace("$.departure.year", data.departure.year);

            xpath = xpath.replace("$0.departure.day", addZero(data.departure.day));
            xpath = xpath.replace("$0.departure.month", addZero(data.departure.month));

            xpath = xpath.replace("$.arrival.day", data.departure.day);
            xpath = xpath.replace("$.arrival.month", data.departure.month);
            xpath = xpath.replace("$.arrival.year", data.departure.year);

            xpath = xpath.replace("$.passengers", data.passengers);
            page_info[key] = xpath;
        }
    }
    return Promise.resolve(page_info);
}
function fillForm(data, elements){

    if(elements.originElement && typeof(elements.originElement) == "string"){
        driver.findElement(webdriver.By.xpath(elements.originElement)).click();
        driver.findElement(webdriver.By.xpath(elements.originElement)).clear();
        driver.findElement(webdriver.By.xpath(elements.originElement)).sendKeys(data.origin);
        return driver.sleep(3000).then(function(){
            driver.findElement(webdriver.By.xpath(elements.originElement)).sendKeys(webdriver.Key.ENTER);

            if(elements.destinationElement && typeof(elements.destinationElement) == "string"){
                driver.findElement(webdriver.By.xpath(elements.destinationElement)).click();
                driver.findElement(webdriver.By.xpath(elements.destinationElement)).clear();
                return driver.sleep(1000).then(function(){
                    driver.findElement(webdriver.By.xpath(elements.destinationElement)).sendKeys(data.destination);
                    return driver.sleep(3000).then(function(){
                        driver.findElement(webdriver.By.xpath(elements.destinationElement)).sendKeys(webdriver.Key.ENTER);

                        if(elements.departureElement && typeof(elements.departureElement) == "string"){
                            driver.findElement(webdriver.By.xpath(elements.departureElement)).click();
                            driver.findElement(webdriver.By.xpath(elements.departureXpath)).click();
                        }
                        return driver.sleep(2000).then(function(){
                            if(elements.passengersElement && typeof(elements.passengersElement) == "string"){
                                driver.findElement(webdriver.By.xpath(elements.passengersElement)).click();
                                driver.findElement(webdriver.By.xpath(elements.passengersXpath)).click();
                            }
                            if(elements.submitElement){
                                return driver.findElement(webdriver.By.xpath(elements.submitElement)).click();
                            }
                        });
                    });
                });
            }
        });
    }
}
function returnData(website){
    var els = {};

    var paths = database[website]["return"];

    els = driver.findElements(webdriver.By.xpath(paths["xpath"]));

    return els.then(function(obj){

        var objs = [];
        var promises = [];

        for(var i=0; i<obj.length; ++i){
            var o = [];

            var promises2 = [];
            promises2.push(obj[i].findElement(webdriver.By.css(paths["imageCSS"])).then(function(b){
                if(paths["imageCSS"].indexOf("img") >= 0){
                    return b.getAttribute("src").then(function(c){
                        return Promise.resolve(c);
                    });
                }
                else{
                    return b.getCssValue("background-image").then(function(c){
                        return Promise.resolve(c.slice(5, -2));
                    });
                }
            }).catch((err) => {
                  return Promise.resolve("");
            }));

            promises2.push(obj[i].findElement(webdriver.By.css(paths["airlineNameCSS"])).then(function(b){
                return b.getText().then(function(c){
                    return Promise.resolve(c);
                });
            }).catch((err) => {
                  return Promise.resolve("");
            }));

            promises2.push(obj[i].findElement(webdriver.By.css(paths["departCSS"])).then(function(b){
                return b.getText().then(function(c){
                    return Promise.resolve(c);
                });
            }).catch((err) => {
                  return Promise.resolve("");
            }));

            promises2.push(obj[i].findElement(webdriver.By.css(paths["arriveCSS"])).then(function(b){
                return b.getText().then(function(c){
                    return Promise.resolve(c);
                });
            }).catch((err) => {
                  return Promise.resolve("");
            }));

            promises2.push(obj[i].findElement(webdriver.By.css(paths["durationCSS"])).then(function(b){
                return b.getText().then(function(c){
                    return Promise.resolve(c);
                });
            }).catch((err) => {
                  return Promise.resolve("");
            }));

            promises2.push(obj[i].findElement(webdriver.By.css(paths["priceCSS"])).then(function(b){
                return b.getText().then(function(c){
                    return Promise.resolve(c);
                });
            }).catch((err) => {
                  return Promise.resolve("");
            }));

            promises.push(Promise.all(promises2).then(function(final){
                return Promise.resolve({
                    "image": final[0],
                    "airline": final[1],
                    "departure": final[2],
                    "arrival": final[3],
                    "duration": final[4],
                    "price": final[5]
                });
            }));
        }

        return Promise.all(promises).then(function(final){
            final = final.filter(function(obj) {
                return obj.airline != "" && obj.price != "";
            });
            return Promise.resolve(final);
        });
    });
}