(function() {

  /**
   * Constant variable for search term.
   */
  var SEARCH_TERM = 'tf_allow_load=yeah';

  var textFirstClickListener = function(e) {
    var el = e.srcElement;
    if (el.tagName === 'IMG') {
      var parser = document.createElement('a');
      parser.href = el.src;

      // If already clicked to load, won't do it again.
      if (parser.search.indexOf(SEARCH_TERM) === -1) {
        el.src = chrome.extension.getURL('bg-loading.png');

        if (parser.search === '') {
          parser.search = SEARCH_TERM;
        } else {
          parser.search = parser.search + '&' + SEARCH_TERM;
        }
        window.setTimeout(function() {
          el.src = parser.href;
        }, 50);
      }
    }
  };

  chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.method === 'addTextFirstClickListener') {
          document.body.addEventListener('click', textFirstClickListener);
        } else if (request.method === 'removeTextFirstClickListener') {
          document.body.removeEventListener('click', textFirstClickListener);
        } else {

        }
      }
  );

  chrome.runtime.sendMessage(
      {method: 'doAddTextFirstClickListener'}
  );
}());
