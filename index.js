
// ===============================================================================
// GET NEW REQUESTS HERE
// ===============================================================================

const http          = require( "http" );
const url           = require( "url" );
const queryString   = require( "querystring" );
const express       = require( "express" );
const limdu         = require( "limdu" );
const webdriver     = require( "selenium-webdriver" );

const driver        = new webdriver.Builder().forBrowser('chrome').build();
const port          = 8000;

var app = express();
app.use(express.static('static'))
app.get('/request', function (request, response) {
    console.log("Got request");
    var queryObj = queryString.parse(url.parse(request.url).query);
    var obj = JSON.parse( queryObj.jsonData );
    performMain(obj).then(function(data){
        console.log(data);
        response.end(data);
    });
});
app.listen(process.env.PORT || port);

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

var dataset = [
    { input: 'text gosuggest input src form control input txt large input src from city or airport off combobox list react autosuggest false',
    output: [ 'from_airport' ] },
  { input: 'text flight origin typeahead typeahead list false off off flight origin typeahead list typeahead list flight origin value true city or airport f l i g h t s',
    output: [ 'from_airport' ] },
  { input: 'input fromto ui autocomplete input text hp widget sfrom check special characters event off',
    output: [ 'from_airport' ] },
  { input: 'off none flight origin city text select origin required field city pad right ac input b e flight origin city please enter origin false',
    output: [ 'from_airport' ] },
  { input: 'text any worldwide city or airport off off off from tag any worldwide city or airport true key value span span required arabic chars ui autocomplete input from from true origin origin airline selection handler places airports search string response modifier flight',
    output: [ 'from_airport' ] },
  { input: 'text seldcity suggest seldcity suggest blue outline input with icon predictive search departure airport off off inline',
    output: [ 'from_airport' ] },
  { input: ' airline data from text home fieldwidth field brd right ui autocomplete input error type departure location here from if this value this value type departure location here if this value type departure location here this value from on focus this off please select a valid departure airport',
    output: [ 'from_airport' ] },
  { input: 'ctl main body i w o v i d item auto origin txt country ctl main body i w o v i d item auto origin txt country inline from type the few characters of the city name and use down arrow to select the city frm textbox has mapicon return is alphabet key with white space event text combobox origin origin off',
    output: [ 'from_airport' ] },
  { input: 'om m y origin text common widgets text text input size l select text on focus input flat smarty incomplete kochi c o k origin from where flight origin input true off off off combobox list false ap c o k ',
    output: [ 'from_airport' ] },
  { input: 'text js origin input off off off false auto',
    output: [ 'from_airport' ] },

  { input: 'text gosuggest input dest form control input txt large input dest to city or airport off combobox list react autosuggest false',
    output: [ 'to_airport' ] },
  { input: 'text flight destination typeahead typeahead list false off off flight dest typeahead list typeahead list flight destination value true city or airport f l i g h t s',
    output: [ 'to_airport' ] },
  { input: 'input fromto ui autocomplete input check special characters event text hp widget s to off',
    output: [ 'to_airport' ] },
  { input: 'off none field b e flight origin city msg please enter different from and to city please enter destination flight destination city text select destination required field city pad left ac input b e flight arrival city false',
    output: [ 'to_airport' ] },
  { input: ' to tag any worldwide city or airport off off off text any worldwide city or airport true to to key value span span required arabic chars ui autocomplete input true destination true destination airline selection handler places airports search string response modifier flight',
    output: [ 'to_airport' ] },
  { input: 'text selacity suggest selacity suggest blue outline input with icon predictive search arrival airport off off inline',
    output: [ 'to_airport' ] },
  { input: ' airline data to to text home fieldwidth field brd right ui autocomplete input error type arrival location here if this value this value type arrival location here if this value type arrival location here this value to on focus this off please select a valid arrival airport',
    output: [ 'to_airport' ] },
  { input: 'ctl main body i w o v i d item auto destination txt country ctl main body i w o v i d item auto destination txt country inline to type the few characters of the city name and use down arrow to select the city frm textbox has mapicon return is alphabet key with white space event text combobox destination destination off',
    output: [ 'to_airport' ] },
  { input: 'om m y destination text common widgets text text input size l select text on focus input flat destination to where flight destination input true off off off combobox list true date from om m y date picker plus minus three depart select exact om m y date picker flex depart label type required ',
    output: [ 'to_airport' ] },
  { input: 'text js destination input enter a country city or airport off off off false auto',
    output: [ 'to_airport' ] },

  { input: 'text form control input txt large widget calender txt choose date ',
    output: [ 'from_date' ] },
  { input: 'flight departing start date value datepicker trigger input text dd mm yyyy touch keyboard true flight departing departing date in d d m m y y y y format expanded enter a date or choose one from the table below expanded enter a date or choose one from the table below showing n o v d e c ',
    output: [ 'from_date' ] },
  { input: ' check special characters event text hp widget depart depart date readonly',
    output: [ 'from_date' ] },
  { input: 'none false flight depart date text depart date required field blur class please enter departure date b e flight depart date',
    output: [ 'from_date' ] },
  { input: 'text true return date click off d d m yy highlight days after show from handler true y depart date key value span span required has datepicker depart date pick a date depart date depart date true',
    output: [ 'from_date' ] },
  { input: 'selddate text selddate blue outline input with icon fare datepicker from to javascript focus calendar this event if typeof e k calendar v undefined e k calendar v click true e k calendar v display document forms selddate new date new date document forms seladate false false false oneway javascript keydown calendar this event departure date readonly ',
    output: [ 'from_date' ] },
  { input: 'text calendarfield flt lft has datepicker error readonly airline data departure departure dd mm yyyy if this value this value dd mm yyyy if this value dd mm yyyy this value invalid date',
    output: [ 'from_date' ] },
  { input: 'ctl main body i w o v i d item txt start date text txt start date frm textbox js datepicker has datepicker readonly depart date to ctl main body i w o v i d item txt end date text txt end date frm textbox js datepicker has datepicker readonly return',
    output: [ 'from_date' ] },
  { input: 'om m y date picker plus minus three depart select exact om m y date picker flex depart label type required ',
    output: [ 'from_date' ] },
  { input: 'text js depart input off off off false',
    output: [ 'from_date' ] },

  { input: 'text form control input txt large widget calender txt choose date',
    output: [ 'to_date' ] },
  { input: 'flight returning end date value datepicker trigger input text dd mm yyyy touch keyboard true returning date in d d m m y y y y format expanded enter a date or choose one from the table below expanded enter a date or choose one from the table below showing n o v d e c ',
    output: [ 'to_date' ] },
  { input: ' check special characters event text hp widget return return date readonly',
    output: [ 'to_date' ] },
  { input: 'none false flight return date text return date required field blur class please enter return date b e flight return date',
    output: [ 'to_date' ] },
  { input: 'text true click off d d m yy highlight days to handler true y return date key value span span required has datepicker return date pick a date return date return date true',
    output: [ 'to_date' ] },
  { input: 'seladate text seladate blue outline input with icon fare datepicker from to aa click javascript focus calendar this event if typeof e k calendar v undefined e k calendar v click true e k calendar v display document forms seladate new date new date document forms selddate true true false oneway javascript keydown calendar this event return date readonly ',
    output: [ 'to_date' ] },
  { input: 'text flt rt has datepicker calendarfield error readonly return return dd mm yyyy if this value this value dd mm yyyy if this value dd mm yyyy this value invalid date',
    output: [ 'to_date' ] },
  { input: 'ctl main body i w o v i d item txt end date text txt end date frm textbox js datepicker has datepicker readonly return',
    output: [ 'to_date' ] },
  { input: 'om m y date picker plus minus three return select exact om m y date picker flex return label type required ',
    output: [ 'to_date' ] },
  { input: 'text js return input off off off false',
    output: [ 'to_date' ] },

  { input: 'pax box mobdn javascript void pax link common ',
    output: [ 'passenger_count' ] },
  { input: 'flight adults rooms adults value number of travellers true adults adults',
    output: [ 'passenger_count' ] },
  { input: ' check special characters event text hp widget pax counter pass count readonly',
    output: [ 'passenger_count' ] },
  { input: ' b e flight pax info box pax details ddn parent',
    output: [ 'passenger_count' ] },
  { input: ' adults adults span span ',
    output: [ 'passenger_count' ] },
  { input: 'chosen single chosen default combobox false please select your preferred cabin class for your flight economy selected false',
    output: [ 'passenger_count' ] },
  { input: 'adult homestyle adults adults height px position absolute opacity zoom font size px ',
    output: [ 'passenger_count' ] },
  { input: 'ctl main body i w o v i d item ddl adult ddl adult frm selectbox',
    output: [ 'passenger_count' ] },
  { input: 'om m y travelers javascript void om m y travelers content om m y travelers content button false select number of travellers and cabin class true false right common widgets dropdown dropdown dialog select size l input flat has value',
    output: [ 'passenger_count' ] },
  { input: 'button js trad cabin class travellers toggle cabin class travellers trigger ',
    output: [ 'passenger_count' ] },

    { input: 'text where do you want to go from enter locality landmark city or hotel false tags dest code response modifier hotel off hotel selection handler true key value span span required ui autocomplete input true city off ',
    output: [ 'none' ] },
  { input: 'localities text span span enter your location',
    output: [ 'none' ] },
  { input: 'go g b pickup text common widgets text text input size l select text on focus input flat pickup where pick up location true off off off combobox list',
    output: [ 'none' ] },
  { input: 'go g b pickup date input text ui text input date input false pick up date',
    output: [ 'none' ] },
  { input: 'go g b dropoff date input text ui text input date input false drop off date',
    output: [ 'none' ] },
  { input: 'c iu g location text common widgets text text input size l select text on focus input flat where are you going destination input true off off off combobox list true city ',
    output: [ 'none' ] },
  { input: 'text gosuggest input l form control input txt large city name off combobox list react autosuggest false',
    output: [ 'none' ] },
  { input: 'text gosuggest input l form control input txt large pickup location area street landmark off combobox list react autosuggest false',
    output: [ 'none' ] },
  { input: 'text choose checkout end date hp form control input txt large widget calender txt position relative top auto right auto bottom auto left auto',
    output: [ 'none' ] },
  { input: 'home text hook ico grey pad t pad l fl',
    output: [ 'none' ] },
  { input: 'text email your email address', output: [ 'none' ] },
  { input: 'text hotel destination typeahead typeahead list false off off hotel typeahead list typeahead list flight destination value true destination hotel name airport train station landmark or address h o t e l s',
    output: [ 'none' ] },
  { input: 'hotel checkout end date value check in out datepicker trigger input text dd mm yyyy touch keyboard hotel check out date in d d m m y y y y format expanded enter a date or choose one from the table below expanded enter a date or choose one from the table below showing n o v d e c ',
    output: [ 'none' ] },
  { input: 'text car dropoff same as pick up typeahead car dest typeahead c a r s v flights static default default handlebars typeahead default htm handlebars car return value list off off false typeahead list category typeahead list category car dropoff label same as pick up car return input',
    output: [ 'none' ] },
  { input: 'select car pickup time start time value a m',
    output: [ 'none' ] }];
var database = {
    makemytrip: {
        works:                  "true",
        url:                    "https://www.makemytrip.com/",
        originElement:          "//*[@id='hp-widget__sfrom']",
        destinationElement:     "//*[@id='hp-widget__sTo']",
        departureElement:       "//*[@id='hp-widget__depart']",
        departureXpath:         "//td[@data-month='$.departure.month' and @data-year='$.departure.year']/a[text() = '$.departure.day']",
        arrivalElement:         "//*[@id='hp-widget__return']",
        arrivalXpath:           "//td[@data-month='$.arrival.month' and @data-year='$.arrival.year']/a[text() = '$.arrival.day']",
        passengersElement:      "//*[@id='hp-widget__paxCounter_pot']",
        passengersXpath:        "//ul[@id='js-adult_counter']/li[text() = '$.passengers']",
        submitElement:          "//*[@id='searchBtn']",
        return: {
              xpath:          "//div[contains(@class, 'fli-list') or contains(@class, 'c-listing_row')]",
              imageCSS:       "span.airlogo",
              airlineNameCSS: "span.logo_name",
              departCSS:      "div.time_info_space span.timeCa",
              arriveCSS:      "//div[contains(@class, 'time_info') and not(contains(@class, 'time_info_space'))] span.timeCa",
              durationCSS:    "div.duratn span.timeCa",
              priceCSS:       "p.price_info"
        }
    },
    cleartrip: {
        works:                  "true",
        url:                    "https://www.cleartrip.com/flights",
        originElement:          "//*[@id='FromTag']",
        destinationElement:     "//*[@id='ToTag']",
        departureElement:       "//*[@id='DepartDate']",
        departureXpath:         "//td[@data-month='$.departure.month' and @data-year='$.departure.year']/a[text() = '$.departure.day']",
        arrivalElement:         "//*[@id='ReturnDate']",
        arrivalXpath:           "//td[@data-month='$.arrival.month' and @data-year='$.arrival.year']/a[text() = '$.arrival.day']",
        passengersElement:      "//*[@id='Adults']",
        passengersXpath:        "//select[@id='Adults']/option[@value = '$.passengers']",
        submitElement:          "//*[@id='SearchBtn']",
        return: {
              xpath :           "//li[contains(@class, 'listItem')]",
              imageCSS :        "img",
              airlineNameCSS :  "th.vendor small",
              departCSS :       "th.depart",
              arriveCSS :       "th.arrive",
              durationCSS :     "th.duration",
              priceCSS :        "th.price"
        }
      },
    yatra: {
        works:                  "false",
        url:                    "https://www.yatra.com/",
        originElement:          "//*[@id='BE_flight_origin_city']",
        destinationElement:     "//*[@id='BE_flight_arrival_city']",
        departureElement:       "//*[@id='BE_flight_origin_date']",
        departureXpath:         "//*[@id='$0.departure.day/$0.departure.month/$.departure.year']",
        arrivalElement:         "//*[@id='BE_flight_return_date']",
        arrivalXpath:           "//*[@id='a_$.arrival.year_$.departure.month_$.arrival.day']",
        passengersElement:      "//*[@id='BE_flight_paxInfoBox']",
        passengersXpath:        "//*[@id='BE_flight_paxInfoBox']",
        submitElement:          "//*[@id='BE_flight_flsearch_btn']",
        return: {
              xpath:          "//div[contains(@class, 'dispylist-main')]",
              imageCSS:       "div.jet-kot img",
              airlineNameCSS: "div.dspl-flgt-nm",
              departCSS:      "div.dep-flgt",
              arriveCSS:      "div.arvl-time",
              durationCSS:    "div.dep-time",
              priceCSS:       "div.totel-fare span"
        }
    },
    happyeasygo: {
        works:                  "true",
        url:                    "https://www.happyeasygo.com/flight/",
        originElement:          "//*[@id='D_city']",
        destinationElement:     "//*[@id='A_city']",
        departureElement:       "//*[@id='D_date']",
        departureXpath:         "//td[@data-month='$.departure.month' and @data-year='$.departure.year']/a[text() = '$.departure.day']",
        arrivalElement:         "//*[@id='flight-returning']",
        arrivalXpath:           "//button[@data-pika-month='$.arrival.month' and @data-pika-year='$.arrival.year' and @data-pika-day='$.arrival.day']",
        passengersElement:      "//select[@id='A_passenger']",
        passengersXpath:        "//select[@id='A_passenger']/option[@value = '$.passengers']",
        submitElement:          "//*[@id='search_flights']",
        return: {
            xpath: "//div[contains(@class, 'f-item')]",
            imageCSS: "img.logo",
            airlineNameCSS: "span.f-name",
            departCSS: "li.time-sort > div:nth-child(1) span",
            arriveCSS: "li.time-sort > div:nth-child(2) span",
            durationCSS: "li.time-sort > div:nth-child(3) span",
            priceCSS: "strong.fpr"
        }
    },
    akbar: {
        works:                  "true",
        url:                    "https://www.akbartravels.com",
        originElement:          "//*[@id='From']",
        destinationElement:     "//*[@id='To']",
        departureElement:       "//*[@id='Departure']",
        departureXpath:         "//td[@data-month='$.departure.month' and @data-year='$.departure.year']/a[text() = '$.departure.day']",
        arrivalElement:         "//*[@id='flight-returning']",
        arrivalXpath:           "//button[@data-month='$.arrival.month' and @data-year='$.arrival.year' and @data-day='$.arrival.day']",
        passengersElement:      "//*[@id='Adults']",
        passengersXpath:        "//select[@id='Adults']/option[@value = '$.passengers']",
        submitElement:          "//*[@id='FlightSearchBtn']",
        return: {
              xpath:          "//div[contains(@class, 'dispylist-main')]",
              imageCSS:       "div.jet-kot img",
              airlineNameCSS: "div.dspl-flgt-nm",
              departCSS:      "div.dep-flgt",
              arriveCSS:      "div.arvl-time",
              durationCSS:    "div.dep-time",
              priceCSS:       "div.totel-fare span"
        }
    }};
intentClassifier.trainBatch(dataset);

// ===============================================================================
// SELENIUM BIT
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
function performMain(obj){
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

// ===============================================================================
// TESTING BIT
// ===============================================================================

function runSingleTest(website){
   var obj = {
      arrival: '2018-05-28',
      departure: '2018-05-28',
      destination: 'Delhi',
      origin: 'Mumbai',
      passengers: 4
   }

   obj = cleanup(obj);

   obj["website"] = website;
   driver.sleep(2000).then(function(){
     performGenesis(obj).then(function(data){
         console.log(data);
     });
   });
}
function runMultiTest(){
    var obj = {
       arrival: '2018-05-28',
       departure: '2018-05-28',
       destination: 'Delhi',
       origin: 'Mumbai',
       passengers: 4
    }
    performMain(obj).then(function(data){
        console.log(data);
    });
}

// runSingleTest("makemytrip");
// runMultiTest();
