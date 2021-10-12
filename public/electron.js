const { app, BrowserWindow, Tray, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let window = null;
let tray = null;

app.dock.hide();

// Wait until the app is ready
app.once('ready', () => {

  // Create a new tray
  const icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAABlUlEQVQ4EX3STyiDcRzH8T2sUWuJSGnJCqVw4IBWDnJwUHN2o5wtHBxQzg4OnNYOclGjlF2Gg1BcVqScSOawKOFgI5d5f36eR0+m51uvfX9/vr/n99vz/Hw+jyiVSjG84AABj9L/p1iUhhND/1d5jLJyDK94xJFHqc9HQROucIZd1GkBuQ2LUEwjibjzMMsu6iefI4UkQihgDlEc4h1BZDCOrGVZM2SzyzxPXbHbQdoJ6OUtoMYe76b9Bj9qoQj5NUmo6JOBZrJ2y6GTHfJkE7T196rohPGEIr5gThBmcg83WIXz16K0l1Fh1+Vo9yGObbPY+WFgH9ql0jW2SV/Rbj9A85PIQif5CTrDyOMSOzCXhlwPvWATtO8x4PSdwRiDRTygAae4QJe7kL5e3gci7nF9Z/dt67ULl8gFbKBDC8g9eEYAutr6SjFN6AS/9522TjGFFqxDp7tGBnfYghNp87bdR2JGb/wYKT7dGn1dqkGMoBq6ULpcrZhAebAoYm8xSm7ECRLllR4jLNAduIViFuYu/F3yDbnvxLOWxqVCAAAAAElFTkSuQmCC')
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
