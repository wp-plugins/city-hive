/* global jQuery, window, document */
'use strict';

(function () {

    window.initCityHiveProducers = function (inputSelector, listSelector, hiddenInputSelector, initialList) {
        var inputElem = jQuery(inputSelector);
        var listElem = jQuery(listSelector);
        var hiddenInputElem = jQuery(hiddenInputSelector);

        var list=[];

        function loadProducers(query, cb) {
            jQuery.ajax({
                url: 'http://api.cityhive.net/api/v1/producers/list.json',
                data: { name: query },
                success: function (data) {
                    if (data.result >= 0) {
                        var results = [];
                        var dataLength= data.data.length;
                        for (var i=0;i<dataLength;i++) {
                            results.push({
                                id: data.data[i].producer.id,
                                name: data.data[i].producer.name
                            });
                        }
                        cb(results);
                    }
                }
            });
        }

        function deleteProducer(producer, elem) {
            elem.parentElement.removeChild(elem);
            list.splice(list.indexOf(elem));
            refreshHiddenInputProducer();
        }

        function generateProducerDiv(producer) {
            var elem = document.createElement('div');
            elem.className = 'city-hive-producer';

            var delElem = document.createElement('a');
            delElem.className = 'city-hive-del';
            delElem.innerHTML = producer.name;
            delElem.onclick = function () { deleteProducer(producer, elem); };
            elem.appendChild(delElem);
            return elem;
        }

        function addProducer(producer) {
            list.push(producer);
            listElem[0].appendChild(generateProducerDiv(producer));
            refreshHiddenInputProducer();
        }

        function refreshHiddenInputProducer() {
            hiddenInputElem.val(JSON.stringify(list));
        }

        for (var i = 0;i < initialList.length; i++) {
            addProducer(initialList[i]);
        }

        inputElem.typeahead(
            { highlight: true },
            {
                name: 'producers-dataset',
                source: loadProducers,
                templates: {
                    suggestion: function (suggestion) { return '<p>' + suggestion.name + '</p>'; }
                }
            })

            .on('typeahead:selected', function (e, selected) {
                addProducer(selected);
            });
    };

})();

