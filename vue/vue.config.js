module.exports = {
    outputDir: '../firebase/public',
    pwa: {
        themeColor: '#CAFFD0',
        backgroundColor: '#FAA4BD',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/sw.js'
        }
    }
}