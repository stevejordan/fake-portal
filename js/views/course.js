define([
    'jquery', 'underscore', 'backbone', 'namespace'
], function ( $, _, Backbone, ns) {
           
    var CourseView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('#course-template').html()),

        initialize: function () {
            this.render();
        },

        render: function () {

            ns.Helpers.debug('rendering a course...');
            //ns.Helpers.debug(this.model.toJSON());

            this.$el
                .html(this.template(this.model.toJSON()))
                .appendTo(ns.courses.$el);

            //if debug also append to table
            ns.Helpers.showTableView('course', this.model);

            return this;
        }

    });

    return CourseView;

});