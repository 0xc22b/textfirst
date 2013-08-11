(function() {

  /**
   * Constant variable for search term.
   */
  var SEARCH_TERM = 'tf_allow_load=yeah';

  /*
   * Cache to reduce access to localStorage.
   * @type {boolean}
   */
  var tfEnabled = undefined;

  /**
   * A list of urls that users explicitly allow to load
   */
  var urlWhiteList = [];

  var isEnabled = function() {
    if (tfEnabled === undefined) {
      // Be careful, in localStorage, it's all string.
      tfEnabled = localStorage['TF_ENABLED'] === 'true';
    }
    return tfEnabled;
  };

  var setEnabled = function(enabled) {
    localStorage['TF_ENABLED'] = enabled;
    tfEnabled = enabled;
  };

  var toggleEnabled = function() {
    setEnabled(isEnabled() ? false : true);
  };

  var updateIcon = function() {
    if (isEnabled()) {
      chrome.browserAction.setIcon({path: 'icon-on-19x19.png'});
    } else {
      chrome.browserAction.setIcon({path: 'icon-19x19.png'});
    }
  };

  var onBeforeRequestUrl = function(details) {

    var url = details.url;

    if (url === chrome.extension.getURL('bg-loading.png') ||
        url === chrome.extension.getURL('bg.png')) {
      return {};
    }

    for (var i = 0; i < urlWhiteList.length; i = i + 1) {
      if (url === urlWhiteList[i]) {
        return {};
      }
    }

    var parser = document.createElement('a');
    parser.href = url;
    if (parser.search.indexOf(SEARCH_TERM) !== -1) {
      // Don't send the search term to server
      var search = parser.search;
      var startIndex = search.indexOf(SEARCH_TERM) - 1;
      var endIndex = startIndex + SEARCH_TERM.length;
      var newSearch = search.substring(0, startIndex) +
          search.substring(endIndex + 1, search.length);
      parser.search = newSearch.length == 0 ? null : newSearch;

      urlWhiteList.push(parser.href);
      return {redirectUrl: parser.href};
    }

    return {redirectUrl: chrome.extension.getURL('bg.png')};
  };

  var updateListeners = function() {
    if (isEnabled()) {
      chrome.webRequest.onBeforeRequest.addListener(
          onBeforeRequestUrl,
          { urls: ['<all_urls>'], types: ['image']},
          ['blocking']);
      chrome.webRequest.onBeforeRequest.addListener(
          onBeforeRequestUrl,
          { urls: ['<all_urls>'], types: ['object']},
          ['blocking']);
      // No need to send a message to all tabs
      //     to add a 'addTextFirstClickListener' listener
    } else {
      chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestUrl);
      chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestUrl);
      // Send a message to all tabs
      //     to remove a 'addTextFirstClickListener' listener
      chrome.tabs.query({currentWindow: true}, function(tabs) {
        for (var i = 0; i < tabs.length; i = i + 1) {
          chrome.tabs.sendMessage(
              tabs[i].id,
              {method: 'removeTextFirstClickListener'}
          );
        }
      });
    }
  };

  chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.method === 'doAddTextFirstClickListener') {
          if (isEnabled()) {
            chrome.tabs.sendMessage(
                sender.tab.id,
                {method: 'addTextFirstClickListener'}
            );
          } else {
            chrome.tabs.sendMessage(
                sender.tab.id,
                {method: 'removeTextFirstClickListener'}
            );
          }
        }
      }
  );

  chrome.browserAction.onClicked.addListener(function(tab) {
    toggleEnabled();

    updateIcon();
    updateListeners();

    urlWhiteList = [];
  });

  updateIcon();
  updateListeners();
}());
