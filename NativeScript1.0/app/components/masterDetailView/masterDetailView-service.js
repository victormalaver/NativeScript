'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/nativeScript10'),
    // additional requires

    consts;

function Service() {}

function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

Service.prototype.getAllRecords = function(filter) {
    var expandExp,
        data = dataService.data('Producto');

    expandExp = {

        Picture: {
            'SingleField': 'Uri'
        },

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};
// additional properties

// START_CUSTOM_CODE_masterDetailView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailView
module.exports = new Service();