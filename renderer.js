const aiModels = require('./ai-models.js');

const globalInput = document.getElementById('global-input');
const sendBtn = document.getElementById('send-btn');
const topBar = document.getElementById('top-bar');
const webviewGrid = document.getElementById('webview-grid');

// 默认选择前4个模型
let selectedModels = aiModels.slice(0, 4).map(m => m.id);

function renderTopBar() {
  topBar.innerHTML = '';
  aiModels.forEach(model => {
    const label = document.createElement('label');
    label.className = 'model-checkbox-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = model.id;
    checkbox.checked = selectedModels.includes(model.id);

    // 监听模型勾选切换事件
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (selectedModels.length >= 4) {
          e.target.checked = false;
          alert('温馨提示：布局空间有限，最多只能同时选择 4 个大模型哦！');
          return;
        }
        selectedModels.push(model.id);
      } else {
        selectedModels = selectedModels.filter(id => id !== model.id);
      }
      renderWebViews(); // 更新重新渲染
    });

    const span = document.createElement('span');
    span.textContent = model.name;

    label.appendChild(checkbox);
    label.appendChild(span);
    topBar.appendChild(label);
  });
}

function renderWebViews() {
  webviewGrid.innerHTML = ''; // 清空原始 webview

  selectedModels.forEach(modelId => {
    const model = aiModels.find(m => m.id === modelId);
    if (!model) return;

    const wv = document.createElement('webview');
    wv.id = `wv-${model.id}`;
    wv.className = 'webview-cell';
    wv.src = model.url;
    wv.setAttribute('allowpopups', ''); // 防止新开弹窗被阻断

    webviewGrid.appendChild(wv);
  });
}

// 初始化首次渲染渲染
renderTopBar();
renderWebViews();

function dispatchToWebViews(text) {
  if (!text) return;
  console.log('Dispatching request to selected AI models:', text);

  selectedModels.forEach(modelId => {
    const model = aiModels.find(m => m.id === modelId);
    const wv = document.getElementById(`wv-${modelId}`);

    // 向激活存在的 WebView 发送独立特定的代码块
    if (wv && model) {
      try {
        const code = model.injectCode.replace('__TEXT__', JSON.stringify(text));
        wv.executeJavaScript(code);
      } catch (err) {
        console.warn('Failed to inject script to', model.name, err);
      }
    }
  });

  globalInput.value = ''; // 通讯投递完清空输入框
}

sendBtn.addEventListener('click', () => {
  dispatchToWebViews(globalInput.value.trim());
});

globalInput.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key === 'Enter') {
    e.preventDefault();
    globalInput.value += '\n';
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    sendBtn.click();
    return
  }

});
