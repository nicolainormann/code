/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="viewmodels/masterviewmodel.ts" />

window.onload = () => {
    var codeViewModel = new Code.ViewModels.CodeViewModel;

    ko.applyBindings(codeViewModel);
};