const core = require("./core.js");

var obj = {
   arrival: '2018-05-28',
   departure: '2018-05-28',
   destination: 'Delhi',
   origin: 'Mumbai',
   passengers: 4
}

core.run(obj).then(function(data){
    console.log(data);
});
