
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

   // register onMessage handler
   chrome.runtime.onMessage.addListener(function (req, sender, sendRes) {
    //
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

   //do the content settings change:
   //chrome.contentSettings.plugins.set({ 
     //primaryPattern: 'http://www.abcmouse.com/*',
     //resourceIdentifier: {
       //id: 'adobe-flash-player'
     //},
     //setting: 'allow'
   //}, function () {
     //console.log('set up adobe!');
     //chrome.contentSettings.plugins.get({ primaryUrl: 'http://www.abcmouse.com/*'},
         //function (d) {
         //console.log('got the d ', d)
       //});
   //})
 })


