/*CALOR MODEL-VIEW-CONTROLLER*/

$(function () {
    var model = {
        day_of_w: [],

        init: function () {
            model.min_max();
        },

        /*CALCOLO LA TEMPERATURA MIN E MAX PER OGNI GIORNO*/

        min_max: function () {

            var count = 0;
            model.add(0);

            for (var j = 0; j < data.length - 1; j++) {
                if (model.day_of_w[count].day != data[j + 1].day) {
                    model.add(j + 1);
                    count++;
                } else {
                    if (data[j].temperature > model.day_of_w[count].max_tmp) {
                        model.day_of_w[count].max_tmp = data[j].temperature;
                    } else if (data[j].temperature > model.day_of_w[count].min_tmp) {
                        model.day_of_w[count].min_tmp = data[j].temperature;
                    }
                }

            }
        },

        add: function (i) {
            model.day_of_w.push({
                day: data[i].day,
                max_tmp: data[i].temperature,
                min_tmp: data[i].temperature,
                condition: data[i].condition
            });
        },

        getAllDays: function () {
            return model.day_of_w;
        }

    };



    var octopus = {

        init: function () {
            model.init();
            dayListView.init();;
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
            for(var i=0; i<allDays.length;i++){
                htmlStr +=  '<li>'+
                            '<div class="icon">' +
                            '<img src="img/icons/'+allDays[i].condition+'.png">' +
                            '</div>' +
                            '<div class="stats">' +
                            '<h2>'+allDays[i].day+'</h2>' +
                            '<strong>min</strong> '+allDays[i].min_tmp+'ºC' +
                            '<strong>max</strong> '+allDays[i].max_tmp+'ºC' +
                            '</div>'+
                            '</li>';
            }
            this.dayList.append(htmlStr);
        }

    };

    octopus.init();
});