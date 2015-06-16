/* global jQuery, window, document */
'use strict';

(function () {

    window.initCityHiveProducts = function (inputSelector, listSelector, hiddenInputSelector, initialList) {
        var inputElem = jQuery(inputSelector);
        var listElem = jQuery(listSelector);
        var hiddenInputElem = jQuery(hiddenInputSelector);

        var list=[];

        var products = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,

            remote: {
                url: 'http://api.cityhive.net/api/v1/products/list.json?name=%QUERY',
                wildcard: '%QUERY',
                transform: function(listData) {
                    var nameArray = [];
                    for( var i = 0; i < listData.data.length; ++i){
                        nameArray.push({
                            name: listData.data[i].product.name,
                            id: listData.data[i].product.id})
                    }
                    console.log(nameArray);
                    return nameArray
                }
            }
        });

        function deleteProduct(product, elem) {
            elem.parentElement.removeChild(elem);
            for (var i=0; i<list.length; i++){
                if (list[i].name.indexOf(elem.textContent)>=0){
                    list.splice(i,1);
                }
            }
            refreshHiddenInput();
        }

        function generateProductDiv(product) {
            var elem = document.createElement('div');
            elem.className = 'city-hive-product';

            var delElem = document.createElement('a');
            delElem.className = 'city-hive-del';
            delElem.innerHTML = product.name;
            delElem.onclick = function () { deleteProduct(product, elem); };
            elem.appendChild(delElem);
            return elem;
        }

        function addProduct(product) {
            list.push(product);
            listElem[0].appendChild(generateProductDiv(product));
            refreshHiddenInput();
            inputElem.typeahead('val', '');
        }

        function refreshHiddenInput() {
            hiddenInputElem.val(JSON.stringify(list));
        }

        for (var i = 0;i < initialList.length; i++) {
            addProduct(initialList[i]);
        }

        inputElem.typeahead({
                highlight: true},
            {
                name: 'products',
                source: products,
                display: 'name',
                minLength: 0,
                limit: 10000,
                templates: {
                    suggestion: Handlebars.compile('<p>{{name}}</p>')
                }
            });

        inputElem.bind('typeahead:select', function (e, selected) {
            addProduct(selected);
        });

    }
})();

