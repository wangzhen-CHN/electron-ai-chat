module.exports = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com/',
    injectCode: `
      (function() {
        const textareaList = document.querySelectorAll('textarea');
        const txt = textareaList.length > 0 ? textareaList[textareaList.length - 1] : null;
        if (txt) {
          txt.focus();
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
          nativeInputValueSetter.call(txt, __TEXT__);
          txt.dispatchEvent(new Event('input', { bubbles: true }));
          
          setTimeout(() => {
            const buttonList = document.querySelectorAll("[role='button']");
            const btn = buttonList.length > 0 ? buttonList[buttonList.length - 1] : null;
            if (btn && !btn.disabled) btn.click();
            else txt.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
          }, 500);
        }
      })();
    `
  },
  {
    id: 'doubao',
    name: '豆包',
    url: 'https://www.doubao.com/chat/',
    injectCode: `
      (function() {
        const textareaList = document.querySelectorAll('textarea');
        const txt = textareaList.length > 0 ? textareaList[0] : null;
        if (txt) {
          txt.focus();
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
          nativeInputValueSetter.call(txt, __TEXT__);
          txt.dispatchEvent(new Event('input', { bubbles: true }));
          
          setTimeout(() => {
            const btn = document.querySelector("#flow-end-msg-send");
            if (btn && !btn.disabled) btn.click();
            else txt.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
          }, 500);
        }
      })();
    `
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: 'https://gemini.google.com/app',
    injectCode: `
      (function() {
        const txt = document.querySelector('rich-textarea p') || document.querySelector('rich-textarea div[contenteditable="true"]');
        if (txt) {
          txt.textContent = __TEXT__;
          txt.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => {
            const btn = document.querySelector('button[aria-label*="Send"]') || document.querySelector('.send-button');
            if (btn) btn.click();
          }, 500);
        }
      })();
    `
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    injectCode: `
      (function() {
        const txt = document.querySelector('#prompt-textarea p');
        if (txt) {
          txt.textContent = __TEXT__;
          txt.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => {
            const btn = document.querySelector('button[data-testid="send-button"]');
            if (btn && !btn.disabled) btn.click();
          }, 300);
        }
      })();
    `
  },

  {
    id: 'zhipu',
    name: '智谱清言',
    url: 'https://chatglm.cn/',
    injectCode: `
      (function() {
        const txt = document.querySelector('textarea') || document.querySelector('#search-input');
        if (txt) {
          txt.value = __TEXT__;
          txt.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => {
            txt.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
          }, 300);
        }
      })();
    `
  },
  {
    id: 'qwen',
    name: '通义千问',
    url: 'https://www.qianwen.com/',
    injectCode: `
      (function() {
        const txt = document.querySelector('textarea');
        if (txt) {
          txt.value = __TEXT__;
          txt.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => {
            const btn = document.querySelector('.send-btn') || document.querySelector('[class*="send"]');
            if (btn) btn.click();
            else txt.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
          }, 300);
        }
      })();
    `
  }
];
