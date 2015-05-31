var DoggyDoor = require('./door.js');
var CollarListener = require('./collar.js');

var TestApp = function () {};
TestApp.prototype.log = function () {
  console.log('buz!');
};
TestApp.prototype.connect = false;
TestApp.prototype.doorOpen =  false;
TestApp.prototype.timer = false;
TestApp.prototype.testTimer = null;
TestApp.prototype.door = DoggyDoor;
TestApp.prototype.collar = CollarListener;
TestApp.prototype.init = function () {
        this.collar.onConnect = this.handleCollarConnect;
        this.collar.onDisconnect = this.handleCollarDisconnect;
    };
TestApp.prototype.handleCollarConnect = function () {
        this.connected = true;
        this.manageTimer();
};
TestApp.prototype.handleCollarDisconnect = function () {
        this.connected = false;
        this.openCloseDoor();
        clearInterval(this.timer); // manually clear timer
    };
TestApp.prototype.onTimerTick = function (evt) {
        this.openCloseDoor();
        this.manageTimer();
    };
TestApp.prototype.manageTimer = function () {
        if (!this.timer) {
            this.timer = setInterval(this.onTimerTick, 10);
        } else {
            clearInterval(this.timer);
        }
};
TestApp.prototype.openCloseDoor = function () {
        if (this.connected && !this.doorOpen) {
            this.door.open();
            this.doorOpen = true;
        } else {
            this.door.close();
            this.doorOpen = false;
        }
};

module.exports = new TestApp();
