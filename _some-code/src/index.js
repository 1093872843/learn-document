import QRCode from 'qrcode'

window.addEventListener('load',()=>{

  var segs = 'https://www.npmjs.com/package/qrcode'
  QRCode.toCanvas(segs, function (err, canvas) {
    if (err) throw err
  
    var container = document.getElementById('canvas')
    container.appendChild(canvas)
  })

})

