const fs = require("fs");
function logReqRes(fileName){
    return (req,res,next)=>{
        fileName,
        `${Date.now()}: ${req.method}: ${req.url}\n`,
        (err) => {
            if (err) console.log(err);
            next();
        }
    }
}
module.export ={
    logReqRes,
};