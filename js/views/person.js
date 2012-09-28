define([
    'underscore', 'backbone', 'namespace'
], function ( _, Backbone, ns) {
           
    var PersonView = Backbone.View.extend({

        //hook into section#about
        id: 'about',

        events: {
            'click .image': 'openface'
        },

        initialize: function () {
            this.render();
        },

        render: function() {
            ns.Helpers.debug(this.$e);
            this.$e.html(_.template('<h1 class="face"><%= name %></h1>', this.model.toJSON()));
        },

        openface: function() {
            ns.Helpers.debug('click on face!');
        }

    });

    return PersonView;

});