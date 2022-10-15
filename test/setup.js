const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'GitSwitch.app', 'Contents', 'MacOS', 'GitSwitch')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'GitSwitch')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'GitSwitch.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
