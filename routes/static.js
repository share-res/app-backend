var express = require('express')
//   ,fs = require('fs')
//  multer         = require('multer')

exports.addRoutes = function(app, config) {

/*
	var publicDir  = __dir+"/"+config.distFolder
	   ,uploadDir  = publicDir+"/uploads"

	
	app.use(express.static(publicDir))
	app.use(multer({ dest: uploadDir }))
	app.get('/', function(req, res) {
        res.sendFile('index.html', { root: config.server.distFolder });
    });
     app.get('/favicon.ico', function(req, res) {
       res.sendFile('favicon.ico', { root: config.server.distFolder });
     });
 
	app.get('/images/:mobileNo', function(req, res) {
		var mobileNo=req.params.mobileNo
		var files=fs.readdirSync(uploadDir+'/'+userCode);
		res.json(files);
	})

   app.post('/upload/:mobileNo', function(request, response) {
        var count = request.files.file.length;
        var mobileNo=request.params.mobileNo
		var files=[];

		if(!fs.existsSync(uploadDir+'/'+userCode)){//不存在就创建一个
            fs.mkdirSync(uploadDir+'/'+userCode, 0755);
        }
		if(!count) {
			 var fn=request.files.file.name;
			 var oldFn=request.files.file.originalname;
			 console.log(oldFn,fn);
			 files.push(oldFn);
			 fs.renameSync(uploadDir+'/'+fn,
			                  uploadDir+'/'+mobileNo+'/'+oldFn);
		}	                  
		else for(var i=0;i<count;i++){
			 var fn=request.files.file[i].name;
			 var oldFn=request.files.file[i].originalname;
		     files.push(oldFn);
		     fs.renameSync(uploadDir+'/'+fn,
			                  uploadDir+'/'+mobileNo+'/'+oldFn);
		}
		
        response.status(200).send(JSON.stringify({ success: true, fileCount: count,names:files }));
    })
		  */  

	// catch 404 and forward to error handler

}
