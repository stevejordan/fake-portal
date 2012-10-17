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

        render: function () {

            var modelJson = this.model.toJSON();

            if (modelJson.udbschoolid) {
                modelJson.udbschoolid = 
                    this.convertUdbString(modelJson.udbschoolid);
            }

            if (modelJson.udbdepartmentid) {
                modelJson.udbdepartmentid =
                    this.convertUdbString(modelJson.udbdepartmentid);
            }

            Helpers.debug('rendering the person details...');
            this.insertPoint.html(
                this.template(modelJson)
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

        openface: function () {
            Helpers.debug('click on face!');
        },

        //returns a random slogan
        getSlogan: function () {
            var random = (function (max) {

                return Math.floor(Math.random() * (max));

            }(this.welcomeSlogans.length));

            return this.welcomeSlogans[random];

        },

        //converts udb school/dept into readable text
        convertUdbString: function (udbString) {

            var map = {
                SSSOSS: "School of Social Sciences",
                SSECON: "Department of Economics",
                SSIPOL: "Department of International Politics",
                SSSOCL: "Department of Sociology",
                BBCASS: "Cass Business School",
                BBUGPR: "Undergraduate Programmes",
                AAJOUR: "Journalism and Publishing",
                IICOMP: "School of Informatics",
                EESEMS: "School of Engineering and Mathematical Sciences",
                HHIOHS: "School of Health Sciences",
                HNHCED: "Education Development Unit",
                HNABBS: "Applied Biological Sciences",
                AAARTP: "Cultural Policy and Management",
                AASOAR: "School of Arts",
                HAOPTM: "Optometry",
                HNAPSS: "Interdisciplinary Studies in Professional Practice",
                AAMUSC: "Music",
                SSPSYC: "Department of Psychology",
                LLILAW: "The City Law School",
                HARADI: "Radiography",
                AALANG: "Centre for Translation Studies",
                HNMWIF: "Maternal and Child Health",
                HNADUN: "Adult Nursing",
                HNMHLD: "Mental Health and Learning Disabilities",
                HPCIPS: "Investigative, Security and Police Sciences",
                HACOMS: "Language and Communication Science",
                UALDCN: "Learning Development Centre",
                UUCITY: "Central Services"
            };

            if (map[udbString]) {
                return map[udbString];
            }

            //we failed to find a match
            return false;

        }

    });

    ns.PersonView = PersonView;

    return PersonView;

});