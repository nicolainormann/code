module Tapas.Bindings {
    export class ToggleClassOnClick {
        public init(element: any, valueAccessor: () => any, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext) {
            if (!bindingContext)
                return;

            var value = valueAccessor();

            ko.utils.registerEventHandler(element, "click", function () {
				$(".post").removeClass("active");
                $(element).toggleClass(valueAccessor);
            });
        }
    }
    ko.bindingHandlers['toggleClassOnClick'] = new ToggleClassOnClick();
} 