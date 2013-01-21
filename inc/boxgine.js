var mathModel = new Array();
var numBoxes = 3;
var cW = 64;
var cH = 28;

function gen_btn_Click() {
    document.getElementById('grid_txt').value = "";
    cW = parseInt(document.getElementById('charWidth_txt').value, 10);
    cH = parseInt(document.getElementById('charHeight_txt').value, 10);
    numBoxes = parseInt(document.getElementById('boxDepth_txt').value, 10);
    //initially filling an array of arrays with empty spaces
    mathModel = [];
    for (var itr = 0; itr < cW; itr++){
        mathModel[itr] = [];
        for(var etr = 0; etr < cH; etr++){
            mathModel[itr][etr] = " ";
        }
    }

    a = "╒";
    b = "╕";
    c = "╛";
    d = "╘";
    h = "═";
    v = "│";

    //random placement code
    rnd = Math.random();
    for (var ctr = 0; ctr < numBoxes; ctr++)
    {
        //width, height, x, y
        wid = randomFromTo(1,(cW - 1));
        hei = randomFromTo(1,(cH -1));
        pX = randomFromTo(0,((cW -1)-wid));
        pY = randomFromTo(0,((cH -1)-hei));


        /*--------------------------------------------------*/
// document.getElementById('grid_txt').value += "wid:" + wid + " hei:" + hei + "      Hsum:" + (wid + pX) + "\r";
// document.getElementById('grid_txt').value += " pX:" + pX + " pY:" + pY + "      Vsum:" + (hei + pY) + "\r";
// document.getElementById('grid_txt').value += "num:" + ctr + "\r";

        mathModel[pX][pY] = a;
        mathModel[(pX + wid)][pY] = b;
        mathModel[(pX + wid)][(pY + hei)] = c;
        mathModel[pX][(pY + hei)] = d;

        headX = pX;
        headY = pY;
        while (headX < (pX + wid - 1))
        {
            headX++;
            mathModel[headX][pY] = h;
            mathModel[headX][(pY + hei)] = h;
        }

        while (headY < (pY + hei - 1))
        {
            headY++;
            mathModel[pX][headY] = v;
            mathModel[(pX + wid)][headY] = v;
        }
        /*--------------------------------------------------*/
    }
    displayBox();
}
function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}
function displayBox() {

    var vCtr = 0;
    var hCtr = 0;
    for (vCtr = 0; vCtr < cH; vCtr++){
        for (hCtr = 0; hCtr < cW; hCtr++){
            document.getElementById('grid_txt').value += mathModel[hCtr][vCtr];
        }
        if((vCtr + 1) < cH){
            document.getElementById('grid_txt').value += "\r";
        }
    }
}
function clear_btn_Click() {
    document.getElementById('grid_txt').value = "";
}