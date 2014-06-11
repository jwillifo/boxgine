var maMod = new Array();
var numBoxes = 3;
var cW = 64;
var cH = 28;
/*Dictionary to help perform letter math of adding 
and subtracting overlapping pieces.

Pieces defined as string of top/right/bottom/left
0 = blank space
L = regular LINE
B = BOLD line*/
var dict = {};
    dict["0000"] = " ";
    dict["XXXX"] = "▓";
    dict["0L0L"] = "─";
    dict["0B0B"] = "═";
    dict["B0B0"] = "║";
    dict["L0L0"] = "│";

    //top left corner is picked at random
    dict["0LL0"] = "┌";
    dict["0BL0"] = "╒";
    dict["0LB0"] = "╓";
    dict["0BB0"] = "╔";

    dict["00LL"] = "┐";
    dict["00LB"] = "╕";
    dict["00BL"] = "╖";
    dict["00BB"] = "╗";

    dict["LL00"] = "└";
    dict["LB00"] = "╘";
    dict["BL00"] = "╙";
    dict["BB00"] = "╚";

    //bottom right corner is picked at random
    dict["L00L"] = "┘";
    dict["L00B"] = "╛";
    dict["B00L"] = "╜";
    dict["B00B"] = "╝";

    //possible collisions
    dict["LLL0"] = "├";
    dict["LBL0"] = "╞";
    dict["BLB0"] = "╟";
    dict["BBB0"] = "╠";

    dict["L0LL"] = "┤";
    dict["L0LB"] = "╡";
    dict["B0BL"] = "╢";
    dict["B0BB"] = "╣";

    dict["0LLL"] = "┬";
    dict["0BLB"] = "╤";
    dict["0LBL"] = "╥";
    dict["0BBB"] = "╦";

    dict["LL0L"] = "┴";
    dict["LB0B"] = "╧";
    dict["BL0L"] = "╨";
    dict["BB0B"] = "╩";

    dict["LLLL"] = "┼";
    dict["LBLB"] = "╪";
    dict["BLBL"] = "╫";
    dict["BBBB"] = "╬";
    
    //nonASCII collisions
    dict["BLLL"] = "╫";
    dict["LBLL"] = "╪";
    dict["LLBL"] = "╫";
    dict["LLLB"] = "╪";
    
    dict["LBBB"] = "╪";
    dict["BLBB"] = "╫";
    dict["BBLB"] = "╪";
    dict["BBBL"] = "╫";

//4 possible tl and br pieces during random construction
var tlArr = new Array("0LL0", "0BL0", "0LB0", "0BB0");
var brArr = new Array("L00L", "L00B", "B00L", "B00B");

function clear_btn_Click(){
    document.getElementById('grid_txt').value = "";
    document.getElementById("map").getContext("2d").clearRect(0, 0, document.getElementById("map").width, document.getElementById("map").height);
}
function redraw(changed, toChange){
    changed = document.getElementById(changed);
    toChange = document.getElementById(toChange);
    toChange.value = changed.value;
    
    buildArr();
}
function gen_btn_Click(){
    buildArr();
}
function buildArr(){
    //reset form
    document.getElementById('grid_txt').value = "";
    var canvas = document.getElementById("map");
    var context = canvas.getContext("2d");
    var image = new Image();
    image.src = "img/cube.png";
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    //input processing
    cW = parseInt(document.getElementById('charWidth_txt').value, 10);
    cH = parseInt(document.getElementById('charHeight_txt').value, 10);
    numBoxes = parseInt(document.getElementById('boxDepth_txt').value, 10);
    
    //initially filling an array of arrays with empty spaces
    maMod = [];
    for(var itr = 0; itr < cW; itr++){
        maMod[itr] = [];
        for(var etr = 0; etr < cH; etr++){
            maMod[itr][etr] = "0000";
        }
    }
    
    //temp corners
    topLeft = "0000";
    topRight = "0000";
    botRight = "0000";
    botLeft = "0000";
    //temp brushes used to draw sides
    topBrush = "0000";
    botBrush = "0000";
    leftBrush = "0000";
    rightBrush = "0000";
    
    
    rnd = Math.random();
    for(var ctr = 0; ctr < numBoxes; ctr++){
        wid = randomFromTo(1,(cW - 1));
        hei = randomFromTo(1,(cH -1));
        pX = randomFromTo(0,((cW -1)-wid));
        pY = randomFromTo(0,((cH -1)-hei));
        
        topLeft = tlArr[randomFromTo(0,3)];
        botRight = brArr[randomFromTo(0,3)];
        
        //once topLeft and botRight are found all else can be inferred
        
        topRight = setCharAt(topRight,3,topLeft.charAt(1));
        topRight = setCharAt(topRight,2,botRight.charAt(0));
        
        botLeft = setCharAt(botLeft,0,topLeft.charAt(2));
        botLeft = setCharAt(botLeft,1,botRight.charAt(3));
        
        topBrush = setCharAt(topBrush,1,topLeft.charAt(1));
        topBrush = setCharAt(topBrush,3,topLeft.charAt(1));
        
        botBrush = setCharAt(botBrush,1,botRight.charAt(3));
        botBrush = setCharAt(botBrush,3,botRight.charAt(3));
        
        leftBrush = setCharAt(leftBrush,0,topLeft.charAt(2));
        leftBrush = setCharAt(leftBrush,2,topLeft.charAt(2));
        
        rightBrush = setCharAt(rightBrush,0,botRight.charAt(0));
        rightBrush = setCharAt(rightBrush,2,botRight.charAt(0));
        
        /*--------------------------------------------------*/
        //inserting temp box into array
        maMod[pX][pY] = assign(maMod[pX][pY],topLeft);
        maMod[(pX + wid)][pY] = assign(maMod[(pX + wid)][pY],topRight);
        maMod[(pX + wid)][(pY + hei)] = assign(maMod[(pX + wid)][(pY + hei)],botRight);
        maMod[pX][(pY + hei)] = assign(maMod[pX][(pY + hei)],botLeft);
        
        //painting on the sides 2 at a time
        headX = pX;
        headY = pY;
        while(headX < (pX + wid - 1)){
            headX++;
            maMod[headX][pY] = assign(maMod[headX][pY],topBrush);
            maMod[headX][(pY + hei)] = assign(maMod[headX][(pY + hei)],botBrush);
        }
        
        while(headY < (pY + hei - 1)){
            headY++;
            maMod[pX][headY] = assign(maMod[pX][headY],leftBrush);
            maMod[(pX + wid)][headY] = assign(maMod[(pX + wid)][headY],rightBrush);
        }
        /*--------------------------------------------------*/
    }
    
    //characters in text grid display
    displayBox();
    //isometric box display
    renderIso(context,image);
}
function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}
function setCharAt(str,index,chr){
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);

}
function assign(loc, val){
    //assigns value in array and performs overlap math
    if(loc != "0000"){
        var temp = loc;
        for(i=0; i<4; i++){
            if(temp.charAt(i) == "0"){
                loc = setCharAt(loc,i,val.charAt(i));
            }
        }
        return loc;
    }else{
        //no overlap, regular assignment
        return val;
    }
}
function displayBox(){
    var vCtr = 0;
    var hCtr = 0;
    for(vCtr = 0; vCtr < cH; vCtr++){
        for(hCtr = 0; hCtr < cW; hCtr++){
            if(dict[maMod[hCtr][vCtr]] != undefined){
                //if it's a possible character within the limited set, draw
                document.getElementById('grid_txt').value += dict[maMod[hCtr][vCtr]];
            }else{
                //otherwise swap out all BOLD for regular LINE
                //impossible for ASCII are: LBBB, BLBB, BBLB, BBBL, and the inverse
                var temp = maMod[hCtr][vCtr];
                temp = temp.replace(/B/g, 'L');
                //put in the temp replacement
                document.getElementById('grid_txt').value += dict[temp];
            }
        }
        if((vCtr + 1) < cH){
            //carriage return
            document.getElementById('grid_txt').value += "\r";
        }
    }
}
/*--------------------------------------------------*/
function renderIso(ctxt,img){
    var rowX = document.getElementById("map").width / 2;
    var rowY = 0;
    var colX = document.getElementById("map").width / 2;
    var colY = 0;
    
    //hardprogrammed sprite dimensions !!!
    cubeHalfWidth = 14;
    cubeHalfHeight = 7;
    
    for(e = 0; e < cH; e+=1){
        rowX = colX
        rowY = colY
        for(i = 0; i < cW; i++){
            if(maMod[i][e] != "0000"){
                
                //only one wall thickness rendered
                if(maMod[i][e].indexOf('B') === -1){
                    img.src = "img/" + maMod[i][e] + ".png";
                }else{
                    img.src = "img/cube.png";
                }
                
                ctxt.drawImage(img, rowX, rowY);
            }
            
            rowX += cubeHalfWidth;
            rowY += cubeHalfHeight;
        }
        colX -= cubeHalfWidth;
        colY += cubeHalfHeight;
    }
}
