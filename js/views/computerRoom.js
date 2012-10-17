define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers', 'highcharts'
], function ( $, _, Backbone, ns, Helpers, Highcharts) {

    var ComputerRoomView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template($('#computer-room-template').html()),

        initialize: function () {

            //update "updated" date
            ns.computerRooms
                .$updatedEl
                    .html('Last updated at ' +
                          (new Date).toLocaleTimeString());

            this.render();
        },

        render: function () {

            this.$el
                .html(this.template(this.model.toJSON()))
                .appendTo(ns.computerRooms.$el);

            this.chart = new Highcharts.Chart({
                chart: {
                    renderTo: this.$el.find('.chart')[0],
                    type: 'pie',
                    width: 60,
                    height: 60
                },
                series: [{
                    data: [
                        {
                            name: 'In Use',
                            y: this.model.get('inUse')
                        },
                        {
                            name: 'Free',
                            y: this.model.get('available')
                        }
                    ]
                }],
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                title: {
                    text: null
                }
            });
        }

    });

    ns.ComputerRoomView = ComputerRoomView;

    return ComputerRoomView;

});