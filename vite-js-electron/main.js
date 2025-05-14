// Modules to control application life and create native browser window
import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

import contextMenu from 'electron-context-menu'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let fml, tray

contextMenu({
	showSaveImageAs: true,
	showSelectAll: true,
	showSaveImageAs: true,
})

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 692,
		height: 1020,
		icon: './src/assets/icon.png',
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			spellcheck: true,
		},
		id: 69420,
	})

	//menu
	const menu = Menu.buildFromTemplate([
		{
			label: app.name,
			submenu: [
				{ role: 'reload' },
				{ role: 'toggleDevTools' },
				{
					click: () => process.exit(),
					label: 'Exit Pota App',
				},
			],
		},
	])

	Menu.setApplicationMenu(menu)
	// and load the index.html of the app.
	mainWindow.loadFile('dist/index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
	fml = mainWindow
}

// command line switches
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// tray shits
	tray = new Tray('./src/assets/tray-icon.png')
	const contextMenu = Menu.buildFromTemplate([
		{
			click: () => fml.show(),
			label: 'Show',
		},
		{
			click: () => {
				process.exit()
			},
			label: 'Exit Pota App',
		},
	])
	tray.setToolTip('Pota application.')
	tray.setContextMenu(contextMenu)

	createWindow()

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
