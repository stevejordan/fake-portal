define([
   'collections/abstract', 'namespace', 'models/course', 'views/course'
], function( AbstractCollection, ns, Course, CourseView ) {

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

            if (!response.main.courses) {
                //there are no courses to render
                return [];
            }

            //render any messages
            if (response.messages) {
                ns.FakePortal.trigger('message', response.messages);
            }

            return response.main.courses.other;

        },

    });

    return CoursesCollection;

});