var maMod = new Array();
var numBoxes = 3;
var cW = 64;
var cH = 28;
var dict = {};
    dict["0000"] = " ";
    dict["XXXX"] = "▓";

    dict["0L0L"] = "─";
    dict["L0L0"] = "│";
    dict["0LL0"] = "┌";
    dict["00LL"] = "┐";
    dict["LL00"] = "└";
    dict["L00L"] = "┘";
    dict["LLL0"] = "├";
    dict["L0LL"] = "┤";
    dict["0LLL"] = "┬";
    dict["LL0L"] = "┴";
    dict["LLLL"] = "┼";

    dict["0B0B"] = "═";
    dict["B0B0"] = "║";

    dict["0BL0"] = "╒";
    dict["0LB0"] = "╓";
    dict["0BB0"] = "╔";

    dict["00LB"] = "╕";
    dict["00BL"] = "╖";
    dict["00BB"] = "╗";

    dict["LB00"] = "╘";
    dict["BL00"] = "╙";
    dict["BB00"] = "╚";

    dict["L00B"] = "╛";
    dict["B00L"] = "╜";
    dict["B00B"] = "╝";

    dict["LBL0"] = "╞";
    dict["BLB0"] = "╟";
    dict["BBB0"] = "╠";

    dict["L0LB"] = "╡";
    dict["B0BL"] = "╢";
    dict["B0BB"] = "╣";

    dict["0BLB"] = "╤";
    dict["0LBL"] = "╥";
    dict["0BBB"] = "╦";

    dict["LB0B"] = "╧";
    dict["BL0L"] = "╨";
    dict["BB0B"] = "╩";

    dict["LBLB"] = "╪";
    dict["BLBL"] = "╫";
    dict["BBBB"] = "╬";

function gen_btn_Click() {
    document.getElementById('grid_txt').value = "";
    cW = parseInt(document.getElementById('charWidth_txt').value, 10);
    cH = parseInt(document.getElementById('charHeight_txt').value, 10);
    numBoxes = parseInt(document.getElementById('boxDepth_txt').value, 10);
    //initially filling an array of arrays with empty spaces
    maMod = [];
    for (var itr = 0; itr < cW; itr++){
        maMod[itr] = [];
        for(var etr = 0; etr < cH; etr++){
            maMod[itr][etr] = "0000";
        }
    }

    a = "0BL0";
    b = "00LB";
    c = "L00B";
    d = "LB00";
    h = "0B0B";
    v = "L0L0";

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
        maMod[pX][pY] = assign(maMod[pX][pY],a);
        maMod[(pX + wid)][pY] = assign(maMod[(pX + wid)][pY],b);
        maMod[(pX + wid)][(pY + hei)] = assign(maMod[(pX + wid)][(pY + hei)],c);
        maMod[pX][(pY + hei)] = assign(maMod[pX][(pY + hei)],d);
        //maMod[pX][pY] = a;
        //maMod[(pX + wid)][pY] = b;
        //maMod[(pX + wid)][(pY + hei)] = c;
        //maMod[pX][(pY + hei)] = d;

        headX = pX;
        headY = pY;
        while (headX < (pX + wid - 1))
        {
            headX++;
            //maMod[headX][pY] = h;
            //maMod[headX][(pY + hei)] = h;
            maMod[headX][pY] = assign(maMod[headX][pY],h);
            maMod[headX][(pY + hei)] = assign(maMod[headX][(pY + hei)],h);
        }

        while (headY < (pY + hei - 1))
        {
            headY++;
            //maMod[pX][headY] = v;
            //maMod[(pX + wid)][headY] = v;
            maMod[pX][headY] = assign(maMod[pX][headY],v);
            maMod[(pX + wid)][headY] = assign(maMod[(pX + wid)][headY],v);
        }
        /*--------------------------------------------------*/
    }
    displayBox();
}
function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);

}
function assign(loc, val){
    if (loc != "0000"){
        var temp = loc;
        for( i=0; i<4; i++) {
            if( temp.charAt(i) == "0"){
                loc = setCharAt(loc,i,val.charAt(i));
            //}else if( temp.charAt(i) == "L" && val.charAt(i) == "B"){
            //    loc = setCharAt(loc,i,val.charAt(i));
            }
        }
        return loc;

    }else{
        return val;
    }
}
function displayBox() {

    var vCtr = 0;
    var hCtr = 0;
    for (vCtr = 0; vCtr < cH; vCtr++){
        for (hCtr = 0; hCtr < cW; hCtr++){
            document.getElementById('grid_txt').value += dict[maMod[hCtr][vCtr]];
        }
        if((vCtr + 1) < cH){
            document.getElementById('grid_txt').value += "\r";
        }
    }
}
function clear_btn_Click() {
    document.getElementById('grid_txt').value = "";
}