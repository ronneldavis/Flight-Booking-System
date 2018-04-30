
module.exports = {
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