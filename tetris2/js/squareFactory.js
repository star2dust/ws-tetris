var Square1 = function(){
  Square.call(this);
  // rotates
  this.rotates = [
    [
      [0,2,0,0],
      [0,2,0,0],
      [0,2,0,0],
      [0,2,0,0]
    ],
    [
      [0,0,0,0],
      [2,2,2,2],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,2,0,0],
      [0,2,0,0],
      [0,2,0,0],
      [0,2,0,0]
    ],
    [
      [0,0,0,0],
      [2,2,2,2],
      [0,0,0,0],
      [0,0,0,0]
    ]
  ]
}
Square1.prototype = Square.prototype;

var Square2 = function(){
  Square.call(this);
  // rotates
  this.rotates = [
    [
      [0,2,0,0],
      [2,2,2,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,0,0,0],
      [2,2,0,0],
      [2,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,2,2,0],
      [0,2,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,2,0,0],
      [2,2,0,0],
      [0,2,0,0],
      [0,0,0,0]
    ]
  ]
}
Square2.prototype = Square.prototype;

var Square3 = function(){
  Square.call(this);
  // rotates
  this.rotates = [
    [
      [2,2,2,0],
      [0,0,2,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,2,0,0],
      [0,2,0,0],
      [2,2,0,0],
      [0,0,0,0]
    ],
    [
      [2,0,0,0],
      [2,2,2,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,2,0,0],
      [2,0,0,0],
      [2,0,0,0],
      [0,0,0,0]
    ]
  ]
}
Square3.prototype = Square.prototype;

var Square4 = function(){
  Square.call(this);
  // rotates
  this.rotates = [
    [
      [2,2,2,0],
      [2,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,2,0,0],
      [0,2,0,0],
      [0,2,0,0],
      [0,0,0,0]
    ],
    [
      [0,0,2,0],
      [2,2,2,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,0,0,0],
      [2,0,0,0],
      [2,2,0,0],
      [0,0,0,0]
    ]
  ]
}
Square4.prototype = Square.prototype;

var Square5 = function(){
  Square.call(this);
  // rotates
  this.rotates = [
    [
      [2,2,0,0],
      [2,2,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,2,0,0],
      [2,2,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,2,0,0],
      [2,2,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,2,0,0],
      [2,2,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  ]
}
Square5.prototype = Square.prototype;

var Square6 = function(){
  Square.call(this);
  // rotates
  this.rotates = [
    [
      [0,2,2,0],
      [2,2,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,0,0,0],
      [2,2,0,0],
      [0,2,0,0],
      [0,0,0,0]
    ],
    [
      [0,2,2,0],
      [2,2,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,0,0,0],
      [2,2,0,0],
      [0,2,0,0],
      [0,0,0,0]
    ]
  ]
}
Square6.prototype = Square.prototype;

var Square7 = function(){
  Square.call(this);
  // rotates
  this.rotates = [
    [
      [2,2,0,0],
      [0,2,2,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,2,0,0],
      [2,2,0,0],
      [2,0,0,0],
      [0,0,0,0]
    ],
    [
      [2,2,0,0],
      [0,2,2,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,2,0,0],
      [2,2,0,0],
      [2,0,0,0],
      [0,0,0,0]
    ]
  ]
}
Square7.prototype = Square.prototype;

var squareFactory = function(){}
squareFactory.prototype.make = function(index, dir){
  var s;
  switch (index+1) {
    case 1:
      s = new Square1();
      break;
    case 2:
      s = new Square2();
      break;
    case 3:
      s = new Square3();
      break;
    case 4:
      s = new Square4();
      break;
    case 5:
      s = new Square5();
      break;
    case 6:
      s = new Square6();
      break;
    case 7:
      s = new Square7();
      break;
    default:
      break;
  }
  s.origin.x = 0;
  s.origin.y = 0;
  s.rotate(dir);
  return s;
}
