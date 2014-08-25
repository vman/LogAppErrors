(function ($) {

    'use strict';

    var clientContext;

    $(document).ready(function () {

        clientContext = SP.ClientContext.get_current();

        var myList = clientContext.get_web().get_lists().getByTitle("MyList");

        var itemCreateInfo = new SP.ListItemCreationInformation();

        var listItem = myList.addItem(itemCreateInfo);

        listItem.set_item("Title", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

        listItem.update();

        clientContext.load(listItem);

        clientContext.executeQueryAsync(onSuccess, onFail);

    });

    function onSuccess() {
        console.log('Item Created');
    }

    function onFail(sender, args) {
        var result = SP.Utilities.Utility.logCustomAppError(clientContext, args.get_message());
        clientContext.executeQueryAsync(function () {
            console.log('Logging Success');
        }, function (sender, args) {
            console.log('Logging Failed');
            console.log(args.get_message());
        });
    }

})(jQuery);