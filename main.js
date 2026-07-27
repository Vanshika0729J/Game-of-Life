const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
  frame: false,
  title: 'Game of Life',
  width: 400,
  height: 420, // a little extra for OS title bar
  resizable: false,
  autoHideMenuBar: true,
  backgroundColor: '#714c39',
});
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});