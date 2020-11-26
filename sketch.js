var player, zombie, mapp;

var zombieGroup, edges, bullet;
var score = 0;
function preload() {
  //  player =   loadImage("MAIN IMAGES/PLAYER/player.png");

  up = loadImage("vup.png");
  down = loadImage("v.png");
  left = loadImage("vleft.png");
  right = loadImage("vright.png");
  zombier = loadImage("z.png");
  map = loadImage("bgrr.png");

  shu = loadImage("shu.png");
  shd = loadImage("shd.png");
  shl = loadImage("shl.png");
  shr = loadImage("shr.png");

  zomu = loadImage("zu.png");
  zoml = loadImage("zl.png");
  zomr = loadImage("zr.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  zombieGroup = new Group();
  bulletGroup = new Group();

  mapp = createSprite(displayWidth / 2, displayHeight / 2, 1500, 1500);
  mapp.addImage("k", map);
  player = createSprite(200, 200, 40, 40);
  player.addImage("u", up);
  player.addImage("d", down);
  player.addImage("r", right);
  player.addImage("l", left);

  edges = createEdgeSprites();

  player.scale = 0.13;
  player.setCollider("circle", 0, -20, 350);
  player.debug = true;
}

function draw() {
  background(255);

  var obj = bullete();
  //////////////////////////////////////////
  if (keyWentDown("space")) {
    if (player.velocityY === 3) {
      obj.velocityY = 10;
      obj.addImage("dd", shd);
      //obj.changeImage("dd",shd)
    }
    ////

    if (player.velocityY === -3) {
      obj.velocityY = -10;
      obj.addImage("uu", shu);
      //obj.changeImage("uu",shu)
    }
    /////

    if (player.velocityX === 3) {
      obj.velocityX = 10;
      obj.addImage("rr", shr);
      //obj.changeImage("rr",shr)
    }
    /////

    if (player.velocityX === -3) {
      obj.velocityX = -10;
      obj.addImage("ll", shl);
      //obj.changeImage("ll",shl)
    }
  }
  ///////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  if (keyDown("DOWN_ARROW")) {
    player.velocityY = 3;
    player.changeImage("d", down);
  }

  if (keyDown("LEFT_ARROW")) {
    player.velocityX = -3;
    player.changeImage("l", left);
  }

  if (keyDown("RIGHT_ARROW")) {
    player.velocityX = 3;
    player.changeImage("r", right);
  }
  if (keyDown("UP_ARROW")) {
    player.velocityY = -3;
    player.changeImage("u", up);
  }
  ///////////////////////////////////////////////////////////////////////
  if (keyWentUp("UP_ARROW")) {
    player.velocityY = 0;
  }
  if (keyWentUp("DOWN_ARROW")) {
    player.velocityY = 0;
  }
  if (keyWentUp("LEFT_ARROW")) {
    player.velocityX = 0;
  }
  if (keyWentUp("RIGHT_ARROW")) {
    player.velocityX = 0;
  }
  ///////////////////////////////////////////
  for (var i = 0; i < zombieGroup.length; i = i + 1) {
    if (zombieGroup.get(i).isTouching(bulletGroup)) {
      zombieGroup.get(i).destroy();

      score++;
    }

    for (var i = 0; i < bulletGroup.length; i = i + 1) {
      if (bulletGroup.get(i).isTouching(edges)) {
        console.log("bulletisdead");
        bulletGroup.get(i).destroy();
      }
    }
  }
  for (var i = 0; i < zombieGroup.length; i = i + 1) {
    if (player.x - zombieGroup.get(i).x > 0) {
      zombieGroup.get(i).velocityX = 4;
      zombieGroup.get(i).changeImage("r", zomr);
    }
  }

  for (var i = 0; i < zombieGroup.length; i = i + 1) {
    if (player.x - zombieGroup.get(i).x < 0) {
      zombieGroup.get(i).velocityX = -4;
      zombieGroup.get(i).changeImage("lll", zoml);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  for (var i = 0; i < zombieGroup.length; i = i + 1) {
    if (player.y - zombieGroup.get(i).y < 0) {
      zombieGroup.get(i).velocityY = -4;
      zombieGroup.get(i).changeImage("uuuuu", zomu);
    }
  }

  for (var i = 0; i < zombieGroup.length; i = i + 1) {
    if (player.y - zombieGroup.get(i).y > 0) {
      zombieGroup.get(i).velocityY = 4;
      zombieGroup.get(i).changeImage("uuuduu", zombier);
    }
  }

  spawnZom();
  zombieGroup.collide(edges);
  drawSprites();

  textSize(40);
  fill("black");

  text("SCORE : " + score, displayWidth / 2, displayHeight / 2);
  text(mouseX + "," + mouseY, mouseX, mouseY);
}

/////////////////////////////////////////////////////////////
function spawnZom() {
  if (frameCount % 60 === 0) {
    zombie = createSprite(600, 120, 40, 40);
    zombie.addImage("lll", zoml);
    zombie.addImage("r", zomr);
    zombie.addImage("uuuuu", zomu);
    zombie.addImage("uuuduu", zombier);

    zombie.scale = 0.1;
    zombie.y = Math.round(random(0, 1000));
    zombie.x = Math.round(random(0, 1000));
    zombie.velocityY = Math.round(random(3, 5));
    // zombie.velocityX = Math.round(random(3, 5));
    zombie.depth = player.depth;
    zombie.lifetime = 800;
    zombieGroup.add(zombie);
  }
}

function bullete() {
  bullet = createSprite(player.x, player.y, 1, 1);

  bullet.scale = 0.3;

  bulletGroup.add(bullet);
  //bullet.debug = true;
  bullet.setCollider("rectangle", 0, 0, 100, 100);
  return bullet;
}
