const fs = require('fs/promises');
const path = require('path')

export const sshFolderContents = () => new Promise((resolve, reject) => {
    let fullPath = path.resolve(__dirname)
    let pathToRead = fullPath.split(path.sep).splice(0, 3).join(path.sep) + '/.ssh'
    fs.readdir(pathToRead, (err, files) => {
        if (err) {
            console.log(err)
            reject(err)
        }
        let accounts = files.filter((file) => path.extname(String(file)) === '.pub')
        // console.log(accounts)
        let retData = []
        Promise.all(accounts.map(file => fs.readFile(pathToRead + '/' + file, { encoding: 'utf-8' }).then(data => {
            retData.push({
                file: file,
                email: data.split(' ').pop().replace('\n', '')
            })
        }))).then(() => resolve(retData)).catch(reject)
    })
})


export const getConfig = () => new Promise((resolve, reject) => {

    let fullPath = path.resolve(__dirname)
    let pathToRead = fullPath.split(path.sep).splice(0, 3).join(path.sep) + '/.ssh/config'
    fs.readFile(pathToRead, { encoding: 'utf-8' }).then(resolve).catch(reject)
})