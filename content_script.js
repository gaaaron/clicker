function clickElement() {
    if (clickerExtensionConfig.clickableElementPath === undefined || clickerExtensionConfig.clickableElementPath === '') {
        alert("Button selector is empty!");
        return;
    }

    let clickable = document.querySelector(clickerExtensionConfig.clickableElementPath);

    let clickFreq = clickerExtensionConfig.clickFreq ?? 30;
    let intervalId = window.setInterval(function () {

        if (stopConditionIsMet()) {
            window.clearInterval(intervalId);
            return;
        }

        clickable.click();
    }, clickFreq * 1000);
}

function stopConditionIsMet() {
    if (clickerExtensionConfig.xSelector === undefined || clickerExtensionConfig.xSelector === '') {
        return false;
    }
    let xElement = document.querySelector(clickerExtensionConfig.xSelector);
    if (clickerExtensionConfig.stopType == "visible") {
        return xElement != undefined && isVisible(xElement);
    }
    else if (clickerExtensionConfig.stopType == "invisible") {
        return xElement == undefined || !isVisible(xElement);
    }
}

// Where el is the DOM element you'd like to test for visibility
function isVisible(el) {
    var style = window.getComputedStyle(el);
    return (style.display !== 'none')
}

clickElement();