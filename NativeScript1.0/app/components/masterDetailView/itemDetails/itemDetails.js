var helpers = require('../../../utils/widgets/helper'),

    dialogs = require('ui/dialogs'),

    dataService = require('../../../dataProviders/nativeScript10');

function navigatedTo(args) {
    var page = args.object;

    page.navigationContext.pageTitle =
        page.navigationContext.Nombre;

    page.bindingContext = page.navigationContext;
}

exports.navigatedTo = navigatedTo;

function onEditItemTap(args) {
    var source = args.view || args.object;

    helpers.navigate({
        moduleName: 'components/masterDetailView/editItemForm/editItemForm',
        context: source.bindingContext
    });
}
exports.onEditItemTap = onEditItemTap;

function deleteItem(id) {
    var data = dataService.data('Producto');

    data.destroySingle(id)
        .then(function onRequestSuccess() {
            helpers.back();
        })
        .catch(function onRequestFail(err) {
            alert(JSON.stringify(err));
            return err;
        });
}

function onDeleteItemTap(args) {
    var source = args.view || args.object,
        itemId = source.bindingContext.Id;

    dialogs.confirm('Are you sure you want to delete this item?')
        .then(function onConfirm(result) {
            if (result) {
                deleteItem(itemId);
            }
        });

}
exports.onDeleteItemTap = onDeleteItemTap;