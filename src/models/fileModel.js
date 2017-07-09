'use strict'

import Config from '../config.js'

var fs = require('fs')
var path = require("path")
var weedClient = require('node-seaweedfs')

const timeout = 20000;

var seaweedfs = new weedClient({
    server: Config.seaweedfs.host,
    port: Config.seaweedfs.port,
})

const saveFile = (file, done) => {

    if (!file) {
        return done(null);
    }

    if (!fs.existsSync('./temp/')){
        fs.mkdirSync('./temp/')
    }

    let fileName = './temp/' + file.name
    file.mv(fileName, function (err) {
        if (err) {
            console.log(err)
            return done(null)
        }
    })

    seaweedfs.write(fileName).then(function (fileInfo) {
        fs.unlink(fileName)
        return done(fileInfo)

    }).then(function (Buffer) {
    }).catch(function (err) {
        fs.unlink(fileName)
        console.log(err)
        return done(null)

    })
}

const readFile = (id, name, done) => {

    if (!fs.existsSync('./temp/')){
        fs.mkdirSync('./temp/')
    }

    var file = './temp/'+name
    var file_path = path.resolve(file)

    // seaweedfs.read(id, fs.createWriteStream('./temp/'+name))

    seaweedfs.read(id).then(function(buffer) {
        fs.writeFile(file_path, buffer, function(err) {
            if(err) {
                return done(err)
            }
            return done(file_path)
        });
    }).catch(function(err) {
        return done(err)
    });

}

const deleteTempFile = (path, done) => {
    fs.unlink(path, (err) => {
        if (err){
            return done(err)
        }
        return done(null)
    })
}

const deleteFile = (id, done) => {
    seaweedfs.remove(id).then(function (fileInfo) {
        return done(fileInfo)
    }).then(function (Buffer) {
    }).catch(function (err) {
        console.log(err)
        return done(err)
    })
}

export default {
    saveFile,
    deleteFile,
    readFile,
    deleteTempFile,
}
