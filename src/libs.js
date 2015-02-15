	// libs
	var libs = {
		style : {
			addClass : function(dom, className){
				var currentClassNames = dom.className;
				var reg = new RegExp("\\b"+className+"\\b","g");
				reg.test(currentClassNames) ||  (dom.className += " " + className);
			},
			
			removeClass : function(dom, className) {
				var reg = new RegExp("\\b"+className+"\\b","g");
				dom.className = dom.className.replace(reg,"").replace(/\t+/,"");
			}
		}
	};