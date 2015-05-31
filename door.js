var DoggyDoor = function () {};
DoggyDoor.prototype.state = 'closed';
DoggyDoor.prototype.open = function () {
  this.state = 'open';
};

DoggyDoor.prototype.close = function () {
  this.state = 'closed';
};

module.exports = new DoggyDoor();
