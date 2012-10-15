define([
    'underscore', 'backbone', 'models/person', 'namespace', 'helpers'
], function ( _, Backbone, PersonModel, ns, Helpers) {
           
    var PersonView = Backbone.View.extend({

        //hook into section#about
        insertPoint: $('#about'),

        //and the main welcome bar
        welcomeBar: $('.welcome'),

        //slogan of the week
        welcomeSlogans: [
          'Good to see you',
          'I like you the best'
        ],

        events: {
            'click .image': 'openface'
        },

        template: _.template($('#person-template').html()),
        templateWelcomeBar: _.template($('#welcome-bar-template').html()),

        initialize: function () {
            this.render();
        },

        render: function() {

            Helpers.debug('rendering the person details...');
            this.insertPoint.html(
                this.template(this.model.toJSON())
            );

            this.welcomeBar.html(
                this.templateWelcomeBar(
                    _.extend(
                        {'slogan': this.getSlogan()}, 
                        this.model.toJSON()
                    )
                )
            );

        },

        openface: function() {
            Helpers.debug('click on face!');
        },

        //returns a random slogan
        getSlogan: function() {
            var random = (function (max) {

                return Math.floor(Math.random() * (max));

            }(this.welcomeSlogans.length));

            return this.welcomeSlogans[random];

        }

    });

    ns.PersonView = PersonView;

    return PersonView;

});