(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"slider-card\">\n                <img src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\">\n            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header\">\n    <div class=\"header__section\">\n        <div class=\"header__item header-logo\">\n            КиноПоиск\n        </div>\n        <div class=\"header__item header-button\">\n            <a href=\"#\">Фильмы</a>\n        </div>\n        <div class=\"header__item header-button\">\n            <a href=\"#\">Актеры</a>\n        </div>\n        <div class=\"header__item header-button\">\n            <a href=\"#\">Поиск</a>\n        </div>\n    </div>\n    <div class=\"header__section\">\n        <div class=\"header__item header-button\">\n            <a href=\"#\">Войти</a>\n        </div>\n        <div class=\"header__item header-button\">\n            <a href=\"#\">Регистрация</a>\n        </div>\n    </div>\n</div>\n\n<div class=\"main\">\n    <div class=\"profile-card\">\n        <div class=\"container\">\n            <button id=\"button-profile-settings\">Открыть настройки</button>\n            <div class=\"avatar-container\">\n                <img src=\"https://i.imgur.com/ZaZ7FP4.jpg\" alt=\"\">\n            </div>\n\n            <div class=\"content\">\n                <div class=\"head\">\n                    <p id=\"user-full-name\" class=\"user-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"fullname") || (depth0 != null ? lookupProperty(depth0,"fullname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fullname","hash":{},"data":data,"loc":{"start":{"line":36,"column":61},"end":{"line":36,"column":73}}}) : helper)))
    + "</p>\n                    <span id=\"user-email\" class=\"user-email\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":37,"column":61},"end":{"line":37,"column":70}}}) : helper)))
    + "</span>\n                </div>\n                <div class=\"stats\">\n                    <div class=\"stats-item\">\n                        <p class=\"stats-item-name\">Посмотрел фильмов</p>\n                        <span id=\"user-watched-movies-cnt\" class=\"stats-item-value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"watchedMoviesCnt") || (depth0 != null ? lookupProperty(depth0,"watchedMoviesCnt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"watchedMoviesCnt","hash":{},"data":data,"loc":{"start":{"line":42,"column":84},"end":{"line":42,"column":104}}}) : helper)))
    + "</span>\n                    </div>\n                    <div class=\"stats-item\">\n                        <p class=\"stats-item-name\">Рецензий</p>\n                        <span id=\"user-reviews-cnt\" class=\"stats-item-value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"reviewsCnt") || (depth0 != null ? lookupProperty(depth0,"reviewsCnt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewsCnt","hash":{},"data":data,"loc":{"start":{"line":46,"column":77},"end":{"line":46,"column":91}}}) : helper)))
    + "</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <h3 class=\"section-name\">Любимые фильмы</h3>\n\n    <!-- TODO: решить проблему источников изображений -->\n    <div class=\"slider\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"film_img") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":8},"end":{"line":61,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n\n    <h3 class=\"section-name\">Любимые актеры</h3>\n\n    <div class=\"slider\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"best_actor_img") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":8},"end":{"line":71,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n\n    <h3 class=\"section-name\">Рецензии</h3>\n</div>\n";
},"useData":true});
})();