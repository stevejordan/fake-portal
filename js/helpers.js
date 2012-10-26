define([
    'jquery', 'namespace'
], function ( $, ns ) {

    var Helpers = {

        atomDateParser : function (datestr) {

            if (!datestr) { return false; }

            //borrowed from http://stackoverflow.com/questions/1416296
            var yy   = parseInt(datestr.substring(0, 4), 10),
                mo   = parseInt(datestr.substring(5, 7), 10),
                dd   = parseInt(datestr.substring(8, 10), 10),
                hh   = parseInt(datestr.substring(11, 13), 10),
                mi   = parseInt(datestr.substring(14, 16), 10),
                ss   = parseInt(datestr.substring(17, 19), 10),
                //tzs  = parseInt(datestr.substring(19,20), 10),
                //tzhh = parseInt(datestr.substring(20,22), 10),
                //tzmi = parseInt(datestr.substring(23,25), 10),
                myutc = Date.UTC(yy, mo - 1, dd, hh, mi, ss);
                //tzos = (tzs+(tzhh * 60 + tzmi * 1)) * 60000;

            return (new Date(myutc)).toLocaleDateString();

        },

        debug: function (message) {
            if (ns.debugging) { console.log(message); }
        },

        parseIcal: function (icalData) {

            //'borrowed' from github.com/thybag/JavaScript-Ical-Parser

            if (!icalData) { return false; }

            //Clean string and split the file so we can handle it (line by line)
            //var cal_array = icalData.replace(new RegExp("\\r", "g"), "").split("\n"),
            var cal_array = icalData.replace(/\r/g, "").split("\n"),

                //Keep track of when we are activly parsing an event
                in_event = false,

                //Use as a holder for the current event being proccessed.
                cur_event = null,

                //store the events
                events = [],

                makeDate = function (ical_date) {

                    //break date apart
                    var dt =  {
                        year: ical_date.substr(0, 4),
                        month: ical_date.substr(4, 2),
                        day: ical_date.substr(6, 2),
                        hour: ical_date.substr(9, 2),
                        minute: ical_date.substr(11, 2)
                    };

                    //Create JS date (months start at 0 in JS - don't ask)
                    dt.date = new Date(dt.year, (dt.month - 1), dt.day, dt.hour, dt.minute);

                    //Get the full name of the given day
                    dt.dayname = [
                        "Sunday", "Monday", "Tuesday", "Wednesday",
                        "Thursday", "Friday", "Saturday"
                    ][dt.date.getDay()];

                    return dt;

                },

                lines = cal_array.length,

                //following are small loop vars
                i,
                ln,
                idx,
                type,
                val,
                dt;

            for (i = 0; i < lines; i++) {

                ln = cal_array[i];

                //If we encounted a new Event, create a blank event 
                //object + set in event options.
                if (!in_event && ln === 'BEGIN:VEVENT') {
                    in_event = true;
                    cur_event = {};
                }

                //If we encounter end event, complete the object and 
                //add it to our events array then clear it for reuse.
                if (in_event && ln === 'END:VEVENT') {
                    in_event = false;
                    events.push(cur_event);
                    cur_event = null;
                }

                //If we are in an event
                if (in_event) {

                    //Split the item based on the first ":"
                    idx = ln.indexOf(':');

                    //Apply trimming to values to reduce risks of badly 
                    //formatted ical files.
                    type = ln.substr(0, idx)
                               .replace(/^\s\s*/, '')
                               .replace(/\s\s*$/, '');

                    val = ln.substr(idx + 1, ln.length - (idx + 1))
                              .replace(/^\s\s*/, '')
                              .replace(/\s\s*$/, '');

                    //If the type is a start date, proccess it and store details
                    if (type === 'DTSTART') {
                        dt = makeDate(val);
                        val = dt.date;
                        //These are helpful for display
                        cur_event.start_time = dt.hour + ':' + dt.minute;
                        cur_event.start_date = dt.day+'/'+dt.month+'/'+dt.year;
                        cur_event.day = dt.dayname;
                    }
                    //If the type is an end date, do the same as above
                    if (type === 'DTEND') {
                        dt = makeDate(val);
                        val = dt.date;
                        //These are helpful for display
                        cur_event.end_time = dt.hour + ':' + dt.minute;
                        cur_event.end_date = dt.day+'/'+dt.month+'/'+dt.year;
                        cur_event.day = dt.dayname;
                    }
                    //Convert timestamp
                    if (type === 'DTSTAMP') { val = makeDate(val).date; }

                    //Add the value to our event object.
                    cur_event[type] = val;

                }
            } //end for

            return events;

        }, //end parseIcal

        //in debug mode it's useful to show the raw data in a table
        showTableView: function (modelName, model) {

            if (ns.debugging) {
                $('<tr />', { html: _.template($('#' + modelName + '-table-template').html(), model.toJSON()) })
                    .appendTo($('#' + modelName + '-table tbody'));
            }

        },

        parseServicenowPage : function (number) {

            var url = (number.indexOf('INC') !== -1)? 'incident' : 'sc_request';        

            return url;

        },

    };

    ns.Helpers = Helpers; 

    return Helpers;

});