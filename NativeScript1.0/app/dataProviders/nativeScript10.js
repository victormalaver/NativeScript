var provider,
    TelerikBackendServices = require('../everlive/everlive.all.min');

provider = new TelerikBackendServices({

    appId: '8za5c9b7b0ktktsu',
    scheme: 'https'
});

// START_CUSTOM_CODE_nativeScript10
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_nativeScript10
module.exports = provider;