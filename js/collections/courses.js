define([
   'collections/abstract', 'views/fakeportal', 'models/course'
], function( AbstractCollection, FakePortal, Course ) {

    var CoursesCollection = AbstractCollection.extend({

        //tie into the Course model
        model: Course,

        //which view handles the models in this collection (as string)
        view: 'CourseView',

        //where to find the courses
        urlfragment: 'remote-services/moodle-api?request=courses',

        //where to put the model elements
        $el: $('#courses'),

        //how to parse the response
        parse: function (response) {

            //error checking here?

            //render any messages
            if (response.messages) {
                FakePortal.trigger('message', response.messages);
            }

            return response.main.courses.other;

        },

    });

    return CoursesCollection;

});