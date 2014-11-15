exports.getConfig = function(param) {
    var val;
    var config = {'YOAPI': process.env.YOAPI || false};
    try {
        val = config[param];
    }
    catch(e){
        console.log(e);
        val = false;
    }
    return val;
}