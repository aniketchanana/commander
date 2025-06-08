const simulateMouseClick = (element) => {
  ['mousedown', 'mouseup', 'click'].forEach((eventType) => {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      buttons: 1,
    });
    element.dispatchEvent(event);
  });
};

const dispatchEventOnElement = ({ selector }) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }
  element.focus();
  simulateMouseClick(element);
};

const key = 'commandMappings';

chrome.storage.local.get([key], (result) => {
  const mappings = result[key] || [];
  const ctrlKeyOps = {};
  const shiftKeyOps = {};
  mappings.forEach((combo, id) => {
    const sKey = combo.SecondaryKey.toLowerCase();
    if (combo.MainKey === 'CTRL') {
      ctrlKeyOps[sKey] = combo.Selector;
    } else if (combo.MainKey === 'SHIFT') {
      shiftKeyOps[sKey] = combo.Selector;
    }
  });
  document.addEventListener('keydown', (e) => {
    try {
      const secondaryKeyPressed = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && ctrlKeyOps[secondaryKeyPressed]) {
        e.preventDefault();
        dispatchEventOnElement({ selector: ctrlKeyOps[secondaryKeyPressed] });
      } else if (e.shiftKey && shiftKeyOps[secondaryKeyPressed]) {
        e.preventDefault();
        dispatchEventOnElement({ selector: shiftKeyOps[secondaryKeyPressed] });
      }
    } catch (e) {
      console.log(e);
      alert('Unable to perform shortcut');
    }
  });
});
