var expect = require("chai").expect;
var request = require("request");

describe("Check uploadings", function(){
    var url = "http://localhost:8080/api/uploadings";
    it ("returns status 200 to check if api works", function(done){
        request(url, function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it ("returns the result as array(s)", function(done){
        request(url, function(error, response, body){
            body = JSON.parse(body);
            console.log(body);
            expect(body).to.be.an('array');
            done();
        });
    });
})
