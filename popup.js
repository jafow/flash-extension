document.addEventListener('DOMContentLoaded', function () {
  // check flash is loaded
  function hasFlash () {
    var flash = false;
    try {
      var f = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (f) flash = true;
    } catch (e) {
        if (navigator.mimeType &&
            navigator.mimeType['application/x-shockwave-flash'] &&
            navigator.mimeType['application/x-shockwave-flash'].enablePlugin) {
          flash = true;
        } else {
          flash = false;
        }
      }
    return flash;
  }

  // define a pageAction
  // chrome.pageAction.show(2);  // get tab integer from activeTab)
  //
  //do the content settings change:
  chrome.contentSettings.plugins.set({ 
    primaryPattern: 'http://www.abcmouse.com/*',
    resourceIdentifier: {
      id: 'adobe-flash-player'
    },
    setting: 'allow'
  }, function () {
    console.log('set up adobe!');
    chrome.contentSettings.plugins.get({ primaryUrl: 'http://www.abcmouse.com/*'},
        function (d) {
        console.log('got the d ', d)
      });
  })
})

