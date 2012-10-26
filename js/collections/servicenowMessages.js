define([
   'collections/abstract', 'namespace', 'models/servicenowMessage', 'views/servicenowMessage'
], function( AbstractCollection, ns, ServicenowMessage, ServicenowMessageView ) {

    var ServicenowMessagesCollection = AbstractCollection.extend({

        //tie into the ServicenowMessage model
        model: ServicenowMessage,

        //which view handles the models in this collection (as string)
        view: 'ServicenowMessageView',

        //where to find the servicenowMessages
        urlfragment: 'remote-services/servicenow-api',

        //where to put the model elements
        $el: $('#noticeboard section#servicenow'),

        //how to parse the response
        parse: function (response) {

            //error checking here?

            if (!response.main.servicenowMessages) {
                //there are no servicenowMessages to render
                //empty result returned
                return [];
            }

            //clear out the DOM, we have some servicenowMessages to add
            this.$el.empty();

            //render any messages
            if (response.messages) {
                ns.FakePortal.trigger('message', response.messages);
            }

            return response.main.servicenowMessages.slice(0,3);

        },

    });

    return ServicenowMessagesCollection;

});