var child = require('child_process').fork('./mail.js');

child.on('message',function(obj){
    console.log(obj)
})

child.send("HI,88")