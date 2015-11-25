/*CALOR MODEL-VIEW-CONTROLLER*/

$(function () {
    var model = {
        summary: [],
        init: function (city_filter) {
            model.getWeekForecast(city_filter);
        },

        /*CALCOLO LA TEMPERATURA MIN E MAX PER OGNI GIORNO*/

        getWeekForecast: function (city_filter) {
            model.summary = [];
            for (var i = 0; i < data.length; i++) {
                // do we have summary for the current day? 
                if (model.summary[data[i].day] == undefined && data[i].city==city_filter) {
                    model.summary[data[i].day] = {
                        min: data[i],
                        max: data[i]
                    };
                } 
                else if(model.summary[data[i].day] != undefined && data[i].city==city_filter){ // We already have a summary for the current day, so let's see if the measure should replace the min / max
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

        init: function (city_filter) {
            if (city_filter != undefined) {
                model.init(city_filter);
                dayListView.init();
            }
            else{
                dayListView.get_city();
            }
        },

        getAllDays: function () {
            return model.getAllDays();
        },

    };

    var dayListView = {
        init: function () {
            this.dayList = $('#summary');
            dayListView.render('trento');
        },

        render: function () {
            var htmlStr = '';
            var allDays = octopus.getAllDays();
            this.dayList.html('');
            for (var item in allDays) {
                htmlStr += '<li>' +
                    '<div class="icon">' +
                    '<img src="img/icons/' + allDays[item].max.condition + '.png">' +
                    '</div>' +
                    '<div class="stats">' +
                    '<h2>' + allDays[item].max.day + '</h2>' +
                    '<strong> min: </strong> ' + allDays[item].min.temperature + 'ºC' +
                    '<strong> max: </strong> ' + allDays[item].max.temperature + 'ºC' +
                    '<strong> city: </strong> ' + allDays[item].max.city +
                    '</div>' +
                    '</li>';
            }

            //console.log(htmlStr);
            this.dayList.append(htmlStr);
        },

        get_city: function () {
            var city_filter = '';
            $(".options").change(function () {
                city_filter = $("select option:selected").val();
                console.log(city_filter);
            });
            $("#btn-filter").click(function () {
                if (city_filter != '') {
                    octopus.init(city_filter);
                } else {
                    alert('Choose a city');
                }
            });
        }

    };
    octopus.init();
});
