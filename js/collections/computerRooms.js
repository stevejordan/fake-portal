define([
    'jquery', 
    'backbone',
    'models/computerRoom', 
    'views/computerRoom',
    'helpers',
    'namespace'
], function( $, Backbone, computerRoom, ComputerRoomView, Helpers, ns ) {

    var ComputerRooms = Backbone.Collection.extend({

        model: computerRoom,

        $el: $('#computer-labs tbody'),
        $updatedEl: $('#computer-labs .updated'),

        initialize: function () {

            //clear out $el
            this.$el.empty();
            this.$updatedEl.empty();

            this.on('add', this.addOne);

        },

        addOne: function (model) {
            new ns['ComputerRoomView']({'model': model});
        },

        reset: function (models) {
            this.add(models);
        },

        parse: function (data) {

            var d = [];

            _.each(data, function (item) {
               d.push(_.pick(item, ['available', 'inUse', 'name']));
            });

            Helpers.debug(d);

            return d
        },
            
        sync: function (method, model, options) {
            _.extend(options, {
                'dataType': 'jsonp'
            });
            return Backbone.sync(method, model, options);
        },

        url: 'http://webapps.city.ac.uk/matrix/services/labstats.php'

    });

    return ComputerRooms;

});