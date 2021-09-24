const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let window = null;
let tray = null;

app.dock.hide();

// Wait until the app is ready
app.once('ready', () => {

  // Create a new tray
  tray = new Tray(path.join('assets', 'electron-icon.png'))
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

  window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

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
