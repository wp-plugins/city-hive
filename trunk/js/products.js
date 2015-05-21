/* global jQuery, window, document */
'use strict';

(function () {

  window.initCityHiveProducts = function (inputSelector, listSelector, hiddenInputSelector, initialList) {
    var inputElem = jQuery(inputSelector);
    var listElem = jQuery(listSelector);
    var hiddenInputElem = jQuery(hiddenInputSelector);

    var list=[];

    function loadProducts(query, cb) {
      jQuery.ajax({
        url: 'http://api.cityhive.net/api/v1/products/list.json',
        data: { name: query },
        success: function (data) {
          if (data.result >= 0) {
            var results = [];
            for (var i=0;i<data.data.length;i++) {
              results.push({
                id: data.data[i].product.id,
                name: data.data[i].product.name,
                synonyms: data.data[i].product.synonyms,
              });
            }
            cb(results);
          }
        }
      });
    }

    function deleteProduct(product, elem) {
      elem.parentElement.removeChild(elem);
      list.splice(list.indexOf(elem));
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
    }

    function refreshHiddenInput() {
      hiddenInputElem.val(JSON.stringify(list));
    }

    for (var i = 0;i < initialList.length; i++) {
      addProduct(initialList[i]);
    }

    inputElem.typeahead(
      { highlight: true },
      {
        name: 'products-dataset',
        source: loadProducts,
        templates: {
          suggestion: function (suggestion) { return '<p>' + suggestion.name + '</p>'; }
        }
      })

      .on('typeahead:selected', function (e, selected) {
        addProduct(selected);
      });
  };

})();

