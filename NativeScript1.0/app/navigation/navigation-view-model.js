'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{"title":"Productos","moduleName":"components/masterDetailView/masterDetailView","icon":""},{"title":"Iniciar Sesión","moduleName":"components/home/home","icon":""},{"title":"Cerrar Sesión","moduleName":"components/home/home","icon":"","context":{"logout":true}}];
 
navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;