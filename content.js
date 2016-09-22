(function () {
  const URL = window.location.href;

  // send message to background event script with URL and hasFlash
  chrome.runtime.sendMessage({ URL: URL, hasFlash: hasFlash() }, function (res) {
    // do something better than showing a h1...
    var h = document.createElement('h1');
    h.innerText = res.title;
    document.body.appendChild(h);
  });

   chrome.runtime.onMessage.addListener(function (req, sender, sendRes) {
    if (req.hasFlash) {
      chrome.contentSettings.plugins.set({
        primaryPattern: req.URL,
        resourceIdentifier: {
          id: 'adobe-flash-player'
        },
        setting: 'allow'
      }, sendRes({sender: sender, title: 'whoop'})
    })


   function sendRes (obj) {
     console.log('sender tab: ', obj.sender)
     chrome.tabs.sendMessage(obj.sender.tab, obj.title, function () {})
   }

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
})()
