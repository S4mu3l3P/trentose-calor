/*CALOR MODEL-VIEW-CONTROLLER*/

$(function () {
    var model = {
        summary: [],
        init: function () {
            model.getWeekForecast();
        },

        /*CALCOLO LA TEMPERATURA MIN E MAX PER OGNI GIORNO*/

        getWeekForecast: function () {

            for (var i = 0; i < data.length; i++) {
                // do we have summary for the current day? 
                if (model.summary[data[i].day] == undefined) {
                    model.summary[data[i].day] = {
                        min: data[i],
                        max: data[i]
                    };
                } else { // We already have a summary for the current day, so let's see if the measure should replace the min / max
                    var current = data[i];
                    // is the current measure lower than the minimun temperature for the day?
                    if (current.temperature < model.summary[current.day].min.temperature) {
                        model.summary[current.day].min = current;
                    } else if (current.temperature > model.summary[current.day].max.temperature) {
                        model.summary[current.day].max = current;
                    }

                }
            }
            console.log(model.summary);
        },

        getAllDays: function () {
            return model.summary;
        }

    };



    var octopus = {

        init: function () {
            model.init();
            dayListView.init();
        },

        getAllDays: function () {
            return model.getAllDays();
        },

    };

    var dayListView = {

        init: function () {
            this.dayList = $('#summary');
            dayListView.render();
        },

        render: function () {
            var htmlStr = '';
            var allDays = octopus.getAllDays();

            for (var item in allDays) {
                htmlStr += '<li>' +
                    '<div class="icon">' +
                    '<img src="img/icons/' + allDays[item].max.condition + '.png">' +
                    '</div>' +
                    '<div class="stats">' +
                    '<h2>' + allDays[item].max.day + '</h2>' +
                    '<strong>min</strong> ' + allDays[item].min.temperature + 'ºC' +
                    '<strong>max</strong> ' + allDays[item].max.temperature + 'ºC' +
                    '</div>' +
                    '</li>';
            }

            //console.log(htmlStr);
            this.dayList.append(htmlStr);
        }

    };

    octopus.init();
});
