/* global jQuery, window, document */
'use strict';
(function () {

    window.initCityHiveProducers = function (inputSelector, listSelector, hiddenInputSelector, initialList) {
        var inputElem = jQuery(inputSelector);
        var listElem = jQuery(listSelector);
        var hiddenInputElem = jQuery(hiddenInputSelector);

        var list=[]

        var producers = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            //using prefetch for faster load of the list
            prefetch: {
                url:'http://api.cityhive.net/api/v1/producers/list.json',
                ttl:86400000, // prefetch data for ttl: 86400000 = 1 day
                transform: function(listData) {
                    var nameArray = [];
                    for( var i = 0; i < listData.data.length; ++i){
                        nameArray.push({
                            name: listData.data[i].producer.name,
                            id: listData.data[i].producer.id})
                    }
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

        function isExists(product){
            for (var i=0; i<list.length; i++){
                if (list[i].name==product.name){
                    return true;
                }
            }
            return false;
        }

        function addProduct(product) {
            if (!isExists(product)){
                list.push(product);
                listElem[0].appendChild(generateProductDiv(product));
                refreshHiddenInput();
            }
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
                name: 'producers-dataset',
                source: producers,
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



