// prevent default behavior from changing page on dropped file
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

var mailList = document.getElementById('mailList');
var dataList = document.getElementById('dataList');

mailList.ondragover = function () { 
	//this.className = 'hover'; 
	libs.style.addClass(this, "hover");
	return false; 
};

mailList.ondragleave = function () { 
	libs.style.removeClass(this, "hover");
	return false; 
};

mailList.ondrop = function (e) {
  e.preventDefault();
  var btn = document.getElementById("sendEmail");
  libs.style.removeClass(btn,"hidden");
  
  var child = require('child_process').fork('./mail.js');
  child.on('message',function(obj){
       console.log(obj)
  })

  child.on('error',function(obj){
       console.log(obj)
  })

  child.send(e.dataTransfer.files);
  
  
  /*
  for (var i = 0; i < e.dataTransfer.files.length; ++i) {
  	var filePath = e.dataTransfer.files[i].path;
  	var obj = xlsx.parse(filePath);
    console.log(obj)
  }
  */
  return false;
};