let sheetDB = [] // complete grid ka data hoga

for (let i = 0; i < rows; i++) {
    let sheetRow = [] // complete ek single row ka data
    for (let j = 0; j < cols; j++) {
        let cellProp = {
            // all the cell properties
            bold: false,
            italic: false,
            underline:false, 
            alignment: "left", 
            fontFamily:"monospace", 
            fontSize:"14", 
            fontColor: "#000000", 
            BGcolor: "#FFFFFF"
        }
        sheetRow.push(cellProp)
    }
    sheetDB.push(sheetRow)
}

// selectors
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let align = document.querySelectorAll('.align');
let leftAlign = align[0];
let centerAlign = align[1];
let rightAlign = align[2];
let fontColor = document.querySelector('.fontcolor-cont')
let BGcolor = document.querySelector('.BGcolor-cont')
let fontFamily = document.querySelector('.font-family-prop');
let fontSize = document.querySelector('.font-size-prop');

// attach listeners 
let activecolr ='#2f4f4f '
let inactivecolr ='#ecf0f1'


bold.addEventListener('click',(e)=>{
 let address = addressBar.value;
 console.log(address)
 let arr =activeCell(address);
 let UIcell = arr[0];
 let StrCell = arr[1];
 StrCell.bold = StrCell.bold==true?false:true;
 console.log("inside button", bold , StrCell.bold)
 
 UIcell.style.fontWeight = StrCell.bold?'bold':"normal"
 bold.style.backgroundColor = StrCell.bold?activecolr:inactivecolr;
})

italic.addEventListener('click',(e)=>{
    let address = addressBar.value;
    console.log(address)
    let arr =activeCell(address);
    let UIcell = arr[0];
    let StrCell = arr[1];
    StrCell.italic = !StrCell.italic
    UIcell.style.fontStyle = StrCell.italic?'italic':"normal"
    italic.style.backgroundColor = StrCell.italic?activecolr:inactivecolr;
   })

   underline.addEventListener('click',(e)=>{
    let address = addressBar.value;
    console.log(address)
    let arr =activeCell(address);
    let UIcell = arr[0];
    let StrCell = arr[1];
    StrCell.underline = !StrCell.underline
    UIcell.style.textDecoration = StrCell.underline?'underline':"none"
    underline.style.backgroundColor = StrCell.underline?activecolr:inactivecolr;
   })

   leftAlign.addEventListener('click',(e)=>{
    let address = addressBar.value;
    console.log(address)
    let arr =activeCell(address);
    let UIcell = arr[0];
    let StrCell = arr[1];
    StrCell.alignment = 'left';
    UIcell.style.textAlign = 'left';
    leftAlign.style.backgroundColor = activecolr;
    centerAlign.style.backgroundColor = inactivecolr;
    rightAlign.style.backgroundColor = inactivecolr;
   })

   centerAlign.addEventListener('click',(e)=>{
    let address = addressBar.value;
    console.log(address)
    let arr =activeCell(address);
    let UIcell = arr[0];
    let StrCell = arr[1];
    StrCell.alignment = 'center';
    UIcell.style.textAlign = 'center';
    centerAlign.style.backgroundColor = activecolr
    leftAlign.style.backgroundColor = inactivecolr;
    rightAlign.style.backgroundColor = inactivecolr;
   })

   rightAlign.addEventListener('click',(e)=>{
    let address = addressBar.value;
    console.log(address)
    let arr =activeCell(address);
    let UIcell = arr[0];
    let StrCell = arr[1];
    StrCell.alignment = 'right';
    UIcell.style.textAlign = 'right';
    rightAlign.style.backgroundColor = activecolr;
    leftAlign.style.backgroundColor = inactivecolr;
    centerAlign.style.backgroundColor = inactivecolr
   })

   fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let arr =activeCell(address);
    let cell = arr[0];
    let cellProp = arr[1];


    cellProp.fontSize = fontSize.value; // Data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})
fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let arr =activeCell(address);
    let cell = arr[0];
    let cellProp = arr[1];


    cellProp.fontFamily = fontFamily.value; // Data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})
fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let arr =activeCell(address);
    let cell = arr[0];
    let cellProp = arr[1];

    cellProp.fontColor = fontColor.value; // Data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let arr =activeCell(address);
    let UIcell = arr[0];
    let StrCell = arr[1];
    StrCell.BGcolor = BGcolor.value; // Data change
    UIcell.style.backgroundColor = StrCell.BGcolor;
    BGcolor.value = StrCell.BGcolor;
})


let allCells = document.querySelectorAll(".cell");
for (let i = 0;i < allCells.length;i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    // Work
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = extractRIDCIDfromcell(address);
        let cellProp = sheetDB[rid][cid];
        console.log("cell click", cellProp.bold)
        // Apply cell Properties ON CELL 
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#FFFFFF" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
                

        // Apply properties UI Props container
     
        
        bold.style.backgroundColor= cellProp.bold ? activecolr : inactivecolr;
        italic.style.backgroundColor = cellProp.italic ? activecolr : inactivecolr;
        underline.style.backgroundColor = cellProp.underline ? activecolr : inactivecolr;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment) { // UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activecolr;
                centerAlign.style.backgroundColor = inactivecolr;
                rightAlign.style.backgroundColor = inactivecolr;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactivecolr;
                centerAlign.style.backgroundColor = activecolr;
                rightAlign.style.backgroundColor = inactivecolr;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactivecolr;
                centerAlign.style.backgroundColor = inactivecolr;
                rightAlign.style.backgroundColor = activecolr;
                break;
        }

        
    })
}



function activeCell(address){
  let [rid, cid] =extractRIDCIDfromcell(address)
  let currcell = document.querySelector(`.cell[rid ='${rid}'][cid ='${cid}']`)
  let storgaeCell = sheetDB[rid][cid];
  return[currcell, storgaeCell]
}

function extractRIDCIDfromcell(address){
    // c3--> phle column wala hai phr row
    let rid = Number( address.slice(1)-1 );
    let cid = Number(address.charCodeAt(0))-65;
    return [rid, cid];
}

