const fs = require("fs"),
      http = require("http"),
      url = require("url");

const generalData = fs.readFileSync(`${__dirname}/dataGeneral.json`, `utf-8`),
      singleProductDataforAll = fs.readFileSync(`${__dirname}/dataSingle.json`, `utf-8`),
      sinDataJS = JSON.parse(singleProductDataforAll);




const server = http.createServer(function(req, res){
    const {query, pathname} = url.parse(req.url, true);

    if (pathname === "/api/all" || pathname === "/" || pathname === "/api"){
        res.writeHead(200, {
            "Content-type": "application/json"  
          });
        res.end(generalData);
    } 
    else if (pathname === "/api/product" || pathname.includes("/product?id=")){
        const { id } = query;
        res.writeHead(200, {
            "Content-type": "application/json"  
          });
        res.end(JSON.stringify( sinDataJS.filter(product => product.id === id) ));
    } 
    else {
        res.writeHead(404, {
            "Content-Type" : "application/json"
        });
        res.end(`{"error": "not Found"}`)
    }

});

const port = process.env.PORT || 5000; 

server.listen(port, ()=> console.log("Listening on: " + port));
