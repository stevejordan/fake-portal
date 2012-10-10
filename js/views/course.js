define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers'
], function ( $, _, Backbone, ns, Helpers) {

    var CourseView = Backbone.View.extend({

        tagName: 'div', // don't want a wrap at all really

        template: _.template($('#course-template').html()),

        initialize: function () {
            this.render();
        },

        render: function () {

            Helpers.debug('rendering a course...');
            //Helpers.debug(this.model.toJSON());

            this.$el
                .html(this.template(this.model.toJSON()))
                .appendTo(ns.courses.$el);

            //if debug also append to table
            Helpers.showTableView('course', this.model);

            return this;
        }

    });

    //also store in namespace
    ns.CourseView = CourseView;

    return CourseView;

});