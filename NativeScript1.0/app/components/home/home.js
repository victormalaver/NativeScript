'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),

    service = require('./home-service'),
    localSettings = require('application-settings'),
    // additional requires

    viewModel = require('./home-view-model');

function validateData(data) {
    
    
     $.ajax({
        url: 'http://api.everlive.com/v1/8za5c9b7b0ktktsu/fCloud',
        type: "GET",
        headers: {
            "X-Everlive-Debug": true
        },
        success: function (data) {
            alert(JSON.stringify(data));
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });



    var el = new Everlive('8za5c9b7b0ktktsu');

    var data = el.data('fCloud');
    data.withHeaders({
            "X-Everlive-Debug": true
        }).get(null)
        .then(function (data) {
                alert(JSON.stringify(data));
            },
            function (error) {
                alert(JSON.stringify(error));
            });
    
    
    
    
    if (!data.email) {
        alert('Missing email');
        return false;
    }

    if (!data.password) {
        alert('Missing password');
        return false;
    }

    return true;

}






function authError(error) {
    if (error) {
        if (error.message) {
            alert(error.message);
        }

        return false;
    }
}

function signinSuccess() {
    helpers.navigate('components/masterDetailView/masterDetailView');
}

function onSignin(data) {
    if (validateData(data)) {
        data.email = data.email.toLowerCase();
        service.signin(data, signinSuccess, authError);
    }
}

function registerSuccess() {
    helpers.navigate('components/masterDetailView/masterDetailView');
}

function onRegister(data) {
    if (validateData(data)) {
        data.email = data.email.toLowerCase();
        service.register(data, registerSuccess, authError);
    }
}

function onShowRegister() {
    viewModel.onShowRegister();
}

function onShowSignin() {
    viewModel.onShowSignin();
}

// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    if (page.navigationContext && page.navigationContext.logout) {
        service.signout(onShowSignin, onShowSignin);
    } else {
        if (service.isAuthenticated()) {
            service.setAuthorization();
            signinSuccess();
        } else {
            var rememberedData = localSettings.hasKey(service.rememberKey) && JSON.parse(localSettings.getString(service.rememberKey));
            if (rememberedData && rememberedData.email && rememberedData.password) {
                onSignin(rememberedData);
            }
        }
    }
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.signin, onSignin);

        viewModel.on(viewModel.events.register, onRegister);
        viewModel.on(viewModel.events.showRegister, onShowRegister);
        viewModel.on(viewModel.events.showSignin, onShowSignin);

        // additional pageInit

    }
}

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
exports.pageLoaded = pageLoaded;