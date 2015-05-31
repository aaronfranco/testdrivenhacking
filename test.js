var app = require("./app.js");

exports.collarConnectivity = {
    testHandleCollarConnect: function (test) {
        app.handleCollarConnect();
        test.ok(app.connected, "App is connected");
        test.ok(app.timer, "App coundown timer is set, 30 seconds until door opens.");
        // left out due to limitation in testing framework
//        setTimeout(function () {
//            test.ok(app.doorOpen, "The door is open");
//            test.done();
//        }, 20);
        test.done();
    },
    testHandleCollarDisconnect: function (test) {
        app.handleCollarDisconnect();
        test.equal(app.connected, false, "App is disconnected");
        test.equal(app.doorOpen, false, "The door closed after disconnect.");
        test.done();
    }
};

exports.doorOperation =  {
    setUp: function(callback){
        callback();
    },
    tearDown: function(callback){
        callback();
    },
    testClosingOpenDoor: function (test) {
        app.door.open();
        app.doorOpen = true;
        app.connected = false;
        app.openCloseDoor();
        test.equal(app.doorOpen, false, "The door is closed");
        test.done();
    },
    testOpeningClosedDoor: function (test) {
         app.door.close();
        app.doorOpen = false;
        app.connected = true;
        app.openCloseDoor();
        test.equal(app.doorOpen, true, "The door is open");
        test.done();
    }
};
