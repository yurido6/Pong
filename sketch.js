//Variáveis da bolinha
let xBola = 300;
let yBola = 200;
let diametro = 14;
let raio = diametro / 2;

//Velocidade da Bolinha
let vel = 7
let velxBola = vel;
let velyBola = vel;

//Dimensões Raquete
let largRaquete = 10;
let altRaquete = 90;

//Variáveis Raquete1
let xRaquete1 = 30;
let yRaquete1 = 155;

//Variáveis Raquete2
let xRaquete2 = 560;
let yRaquete2 = 155;
let velRaquete2;
let chanceDeErrar = 0;

//Variável de colisão
let colisao = false;

//Variáveis de placar
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBola();
  moverBola();
  rebaterBola();
  Raquete(xRaquete1, yRaquete1);
  Raquete(xRaquete2, yRaquete2);
  movimentoRaquete1();
  movimentoRaquete2();
  colisaoRaquete(xRaquete1, yRaquete1);
  colisaoRaquete(xRaquete2, yRaquete2);
  mostrarPlacar();
  marcarPonto();
  
}

function mostrarBola(){
  circle(xBola, yBola, diametro);
}

function moverBola(){
  xBola += velxBola;
  yBola += velyBola;
}

function rebaterBola(){
  if (xBola + raio > width || xBola < 0){
    velxBola *= -1;
  }
  
  if (yBola + raio > height || yBola < 0){
    velyBola *= -1;
  }
}

function Raquete(x, y){
  stroke(255);
  fill(0, 255, 0);
  rect(x, y, largRaquete, altRaquete)
}

function movimentoRaquete1(){
  if (keyIsDown(UP_ARROW)){
    yRaquete1 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete1 += 10;
  }
}

function rebaterRaquete1(){
  if (xBola - raio <xRaquete1 + largRaquete1 && yBola - raio < yRaquete1 + altRaquete1 && yBola + raio > yRaquete1){
      velxBola *= -1
      }
}

function colisaoRaquete(x, y){
  colisao = collideRectCircle(x, y, largRaquete, altRaquete, xBola, yBola, raio);
  if (colisao){
    velxBola *= -1;
    raquetada.play();
  }
}

//function movimentoRaquete2(){
//  velRaquete2 = yBola - yRaquete2 - largRaquete / 2;
//  yRaquete2 += velRaquete2;
//}

function movimentoRaquete2(){
  velRaquete2 = yBola -yRaquete2 - largRaquete / 2 - 30;
  yRaquete2 += velRaquete2 + chanceDeErrar
  calculaChanceDeErrar()
}

function mostrarPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(0, 255, 0);
  rect (130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(0, 255, 0);
  rect (430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}

function marcarPonto(){
  if(xBola < 0){
    pontosOponente += 1;
    ponto.play();
  }
  if(xBola > 590 ){
    meusPontos += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}