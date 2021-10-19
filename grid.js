/*
Our Grid will be of 100 Rows and 26 columns 
Divide Grid in 3 parts --> Row part , column Part and cell part
on rows --> 1 to 100 
on columns --> A to Z
in cells --> they are 2d matrix of 100 * 26 
so to get access of each cell add some attributes rid and cid 





*/

let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

for (let i = 0;i < rows;i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

for (let i = 0;i < cols;i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}

for (let i = 0;i < rows;i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for (let j = 0;j < cols;j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");

        // Attributes for cell and storage identification
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell, i, j);
    }
    cellsCont.appendChild(rowCont);
}

function addListenerForAddressBarDisplay(cell, i, j) {
    cell.addEventListener("click", (e) => {
        let rowID = i+1;
        let colID = String.fromCharCode(65 + j);
        addressBar.value = `${colID}${rowID}`;
    })
}

