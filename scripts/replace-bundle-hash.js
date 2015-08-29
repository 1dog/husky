'use strict'
var jsonfile = require('jsonfile')
var replace = require('replace-in-file')
var fs = require('fs')

fs.readdir('dist', function(err, files) {
    var htmlFiles = []
    files.forEach(function(x) {
        if (/\.html$/.test(x)) { htmlFiles.push('dist/' + x) }
    })

    jsonfile.readFile('dist/webpack-assets.json', function(err, obj) {
        replace({
            files: htmlFiles,
            replace: /assets\/bundle\.js/,
            with: obj.main.js
        })
    })
})
