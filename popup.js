function injectTheScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it

        var selector = document.getElementById("selector").value;
        var stopType = document.getElementById("stop_type").value;
        var xSelector = document.getElementById("x_selector").value;
        var clickFreq = document.getElementById("click_freq").value;
        var config = { tabId: tabs[0].id, clickableElementPath: selector, stopType: stopType, xSelector: xSelector, clickFreq: clickFreq }; // #ast-scroll-top
        chrome.tabs.executeScript(config.tabId, {
            code: 'var clickerExtensionConfig = ' + JSON.stringify(config)
        }, function () {
            chrome.tabs.executeScript(config.tabId, { file: 'content_script.js' });
        });
    });
}

document.getElementById('clickactivity').addEventListener('click', injectTheScript);
$('.clockpicker').clockpicker({
    placement: 'top',
    align: 'left',
    autoclose: true,
    'default': 'now'
});