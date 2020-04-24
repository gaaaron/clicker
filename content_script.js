function clickElement() {
    if (clickerExtensionConfig.clickableElementPath === undefined || clickerExtensionConfig.clickableElementPath === '') {
        alert("Button selector is empty!");
        return;
    }

    let clickable = document.querySelector(clickerExtensionConfig.clickableElementPath);

    let clickFreq = clickerExtensionConfig.clickFreq ?? 30;
    let intervalId = window.setInterval(function () {

        if (stopConditionIsMet()) {
            beep(1000, 10);
            window.clearInterval(intervalId);
            return;
        }

        clickable.click();
    }, clickFreq * 1000);
}

function beep(duration = 200, repeat = 1) {
    if (repeat == 0)
        return;

    let context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.connect(gain);
    oscillator.frequency.value = 520;
    oscillator.type = "square";
    gain.connect(context.destination);
    gain.gain.value = 1.01;
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration * 0.001);

    setTimeout(_ => beep(duration, repeat-1), duration+500);
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