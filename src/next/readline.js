const readline = require('readline')
const fs = require('fs')
const path = require('path')
const os = require('os')

const fReadName = path.join(__dirname, 'new1.txt')
const fWriteName = path.join(__dirname, 'new.json')

const fRead = fs.createReadStream(fReadName)
const fWrite = fs.createWriteStream(fWriteName)

const objReadline = readline.createInterface({
    input: fRead
})

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let index = 1230, avtor
objReadline.on('line', line => {
    const tx = random(1, 16)
    if (tx < 10) avtor = '0' + tx
    else avtor = tx
    const tmp = `{ "id": ${index}, "nickname": "${line}", "name": "", "uid": "", "avatar": "/images/avatar/touxiang${avtor}.png" },`
    fWrite.write(tmp + os.EOL)
    console.log(index, tmp)
    index++
})

objReadline.on('close', () => {
    console.log('readline close ...')
})