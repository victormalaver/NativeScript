'use strict';

var helpers = require('../../../utils/widgets/helper'),
    // additional requires
    dataService = require('../../../dataProviders/nativeScript10'),
    Observable = require('data/observable').Observable,
    viewModel = new Observable({}),
    context;

function goBack() {
    helpers.navigate({
        moduleName: 'components/masterDetailView/itemDetails/itemDetails',
        context: context
    });
}

function onRequestSuccess() {

    context.Nombre = viewModel.get('nombre');

    context.Descripcion = viewModel.get('descripcion');

    context.Estado = viewModel.get('estado');

    // refresh edited properties

    goBack();
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

exports.onCancelTap = function onCancelTap() {
    goBack();
};

exports.onSaveTap = function onSaveTap() {
    var data = dataService.data('Producto');

    data.updateSingle({

            Nombre: viewModel.get('nombre'),

            Descripcion: viewModel.get('descripcion'),

            Estado: viewModel.get('estado'),

            // save properties

            Id: viewModel.get('id')
        })
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};

function onNavigatedTo(args) {
    context = args.object.navigationContext;

    viewModel.set('id', context.Id);

    viewModel.set('nombre', context.Nombre);

    viewModel.set('descripcion', context.Descripcion);

    viewModel.set('estado', context.Estado);

    // read properties

}
exports.onNavigatedTo = onNavigatedTo;

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);

    page.bindingContext = viewModel;

    // additional pageLoaded
}

// START_CUSTOM_CODE_masterDetailViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailViewModel
exports.pageLoaded = pageLoaded;