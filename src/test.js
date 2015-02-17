console.log("你好")
// prevent default behavior from changing page on dropped file
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };
var xlsx = require('node-xlsx');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
  var btn = document.getElementById("loading");
  libs.style.removeClass(btn,"hidden");
  var filePath = e.dataTransfer.files[0].path
  async(parseData,filePath);
  return false;
};


function async(fn,argument) {
  setTimeout(function(){
    fn.call(this, argument);
  },0);
}


function parseData(filePath){
    var obj = xlsx.parse(filePath);
    console.log(obj);
    
    var newData =  groupData(obj);
    var config  =  createConfig(obj,newData);
    



}


var mailConfig = {
        from: {
            host: 'smtp.exmail.qq.com',
            port: 465,
            service: 'QQ',
            secure :true,
            auth: {
                user: '',
                pass: ''
            }
        }
    }



function sendMail(to, html) {
    var mailOptions = {
        from: " " + mailConfig.from.auth.user,
        sender: mailConfig.from.auth.user,
        to: to,
        subject: "测试邮件",
        html: html
    };

    var smtpTransport = nodemailer.createTransport(mailConfig.from);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + response.message);
        }
        smtpTransport.close();
    });
};



function createConfig(data,body) {
    result = {};
    var company = data[1].data;
    for(var i=1;i<company.length;i++) {
        var currentCompany = company[i];
        var companyName = currentCompany[0];
        var email = currentCompany[1];
        var html = '<table style="border-collapse: collapse;border: 1px solid black;">' + body[companyName].join("") +"</table>"
        body[companyName] && sendMail(email,html)
        
    }
    return result;
}

function groupData(data){
    var result = {};
    var employee = data[0].data
    for(var i=1;i<employee.length;i++) {
        var currentEmployee = employee[i];
        var company = employee[i][2];
        result[company] = result[company] || [];          
        result[company].push('<tr><td style="border: 1px solid black;">' + currentEmployee[0]+ '</td><td style="border: 1px solid black;"> ' + currentEmployee[1]  + " </td></tr>")
    }
    return result;
}