const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      webviewTag: true, // 必须开启以允许渲染进程加载 webview
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 隐藏菜单栏，力求简约
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile('index.html');

  // 可在开发时解开下面注释开启调试台
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  // 伪装 User-Agent，防止 ChatGPT/Gemini 等拒绝服务
  app.userAgentFallback = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
