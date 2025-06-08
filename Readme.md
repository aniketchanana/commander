# 🖱️ Commander – Shortcut Click Launcher for Any Website

**Commander** is a minimal Chrome extension that lets you assign keyboard shortcuts to specific elements on a webpage using CSS selectors. When you press the assigned key, the extension simulates a `click` on that element.

---

## 🔧 What It Does

- Map a key (A–Z or 0–9) to a **CSS selector**
- When the key is pressed, the element matching that selector is **clicked**
- All mappings are saved per website using `chrome.storage`

---

## 🖼️ Example Use Case

- Press **G** to click a "Go" button:  
  _Key: G → Selector: `.btn-go`_

---

## 📦 Installation

1. Clone or download this repo.
2. Go to `chrome://extensions/` in Chrome.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the folder.

---

## 📁 Files

commander-extension/
├── manifest.json
├── popup.html // UI for adding mappings
├── popup.js // Saves mappings to storage
├── content.js // Listens for key presses and triggers clicks
├── style.css


---

## 📄 Permissions Used

- `storage`: Save your selector mappings
- `http://*/*`, `https://*/*`: Inject content script to listen and click

---

## 🧪 Limitations

- Only one event is supported: **click**
- No modifier keys (e.g., Ctrl, Alt) yet
- You must provide a valid **CSS selector**
- Only triggers click events — doesn't input text, scroll, or interact beyond that

---

## 🧠 Planned (Optional)

- Support for more event types (focus, input, etc.)
- Multi-key support (e.g., Ctrl + G)
- Selector picker (click to capture element)
- UI improvements

---

## 👨‍💻 Built by

Aniket Chanana – [GitHub](https://github.com/aniketchanana)

---

## 🪪 License

MIT
