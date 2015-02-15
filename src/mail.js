var xlsx = require('node-xlsx');
process.on('message', function(files){
	process.send(files)
	/*
	for (var i = 0; i < files.length; ++i) {
		var filePath = files[i].path;
		var obj = xlsx.parse(filePath);
	    //console.log(obj)
	    process.send(obj);
	}
	*/
})