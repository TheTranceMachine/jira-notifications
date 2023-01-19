const { app, BrowserWindow, Tray, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let window = null;
let tray = null;

app.dock.hide();

// Wait until the app is ready
app.once('ready', () => {

  // Create a new tray
  const icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABW0lEQVR4nJ3SS0sCURgG4IFCZlFSpoaBFnPLv9Gi31BkbboQipc2hUI1M84k/aIWrdy3MEFJcOHCYFIoBCXNjr0x2sA4TaP2wbc773O+c6Eoh/LFtU9WHkjUf4ref+oyYh9cdoCZEU+0/uaKlIZho6dG1s5bj+7jGuZ2ijAmMCG3jmFegRTKdLB8WocrUoY32RgDHCfhFUiCCjDXH/CfNbF4VAUdKYPNksJEhP8J680rXwil2/AmNBJIvmyvi1jiZPJgg4yOI6iIGWGjWYlUmMseb2wQzmHFbhJOJjFbQFDxHhYhGICOMWK/YgvoJai4/4UoI2Q1oW154xoJpttgZWICiEiZi1eQt0P0i1w4rMKfamLjqjfxJfJWxJdqwLVXGj5tMNMBl8X4zpSlNm9wZwY4mWB+twj3SQ2Bi1bBMfzXJPq39kSfX6cKWxH94uiDSnemsBnxJbSB06JvFJtU2+WBC0sAAAAASUVORK5CYII=')
  tray = new Tray(icon)
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', (event) => {
    toggleWindow()
  })

  // Create a new window
  window = new BrowserWindow({
    width: 350,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  window.loadURL(isDev ? `http://localhost:${process.env.PORT}` : `file://${path.join(__dirname, '../build/index.html')}`)

  // window.webContents.openDevTools();

  window.once('ready-to-show', () => {
    const position = getWindowPosition()
    window.setPosition(position.x, position.y, false)
    window.show()
    window.focus()
  })

  // Hide the window when it loses focus
  window.on('blur', () => {
    window.hide()
  })
})

const getWindowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return { x: x, y: y }
}

// toggle window
const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
  window.focus()
}
