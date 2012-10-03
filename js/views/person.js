define([
    'underscore', 'backbone', 'namespace', 'helpers'
], function ( _, Backbone, ns, Helpers) {
           
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
            Helpers.debug(this.$e);
            this.$e.html(_.template('<h1 class="face"><%= name %></h1>', this.model.toJSON()));
        },

        openface: function() {
            Helpers.debug('click on face!');
        }

    });

    ns.PersonView = PersonView;

    return PersonView;

});