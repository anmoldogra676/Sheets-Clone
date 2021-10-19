/*
--> Sheet Handling --> UI ( STYLE , button click add sheet Container)
--> while adding sheets maintain a sheetDataBase and Graph Component Database for each sheet
--> handle UI part --> display the sheet which we have clicked ( access from database of sheets , graphComponent, then click on 
--> every cell for displaying the database of only that sheet)
--> removal of sheet should be there when clicked right --> at that time remove it from database remove sheet div and 
--> maintain index on UI because on database index is maintained already using splice
    





*/
// At first UI part should be there
 let activeSheetColor  ="#ced6e0";
let allsheetFolder = document.querySelector('.sheets-folder-cont')
let addbtn = document.querySelector('.sheet-add-icon');
addbtn.addEventListener('click', function(){
    let sheet = document.createElement('div');
    sheet.setAttribute('class','sheet-folder');
    let sheetFolder = document.querySelectorAll('.sheet-folder')
    sheet.setAttribute('id', `${sheetFolder.length}`)
    sheet.innerHTML =`
    <div class="sheet-content"> Sheet${sheetFolder.length+1}</div>
    `
    allsheetFolder.appendChild(sheet);

//    usko UI pe dikhana hoga --> get sheetDB and graphComponent Matrix
//  nyi sheet ki new sheetDB and graphcomponent matrix
createSheetDB();
createGraphComponent();
handleUI(sheet);
handleSheetRemoval(sheet);
sheet.click();
})

function handleSheetRemoval(sheet) {
sheet.addEventListener("mousedown", (e) => {
    // Right click
    if (e.button !== 2) return;

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
        alert("You need to have atleast one sheet!!");
        return;
    }

    let response = confirm("Your sheet will be removed permanently, Are you sure?");
    if (response === false) return;

    let sheetIdx = Number(sheet.getAttribute("id"));
    // DB
    allSheetDBFolder.splice(sheetIdx, 1);
    allGraphComponentFolder.splice(sheetIdx, 1);
    // UI
    handleSheetUIRemoval(sheet)

    // By default DB to sheet 1 (active)
    sheetDB = collectedSheetDB[0];
    graphComponentMatrix = collectedGraphComponent[0];
    handleSheetProperties();
})
}

function handleSheetUIRemoval(sheet) {
sheet.remove(); 
let allSheetFolders = document.querySelectorAll(".sheet-folder");
for (let i = 0;i < allSheetFolders.length;i++) {
    allSheetFolders[i].setAttribute("id", i);
    let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i+1}`;
    allSheetFolders[i].style.backgroundColor = "transparent";
}

allSheetFolders[0].style.backgroundColor = activeSheetColor;
}


function createSheetDB(){
    let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000",  // Just for indication purpose,
            value: "",
            formula: "",
            children: [],
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
allSheetDBFolder.push(sheetDB);
}

function createGraphComponent(){
    let graphComponentStorage =[];
for (let i = 0; i < rows; i++) {
    let rowArr =[]
    for (let j = 0; j < cols; j++) {
      rowArr.push([]);
    }
    graphComponentStorage.push(rowArr);
}
allGraphComponentFolder.push(graphComponentStorage)
}

function handleSheetDB(sheetIdx) { 
    sheetDB = allSheetDBFolder [sheetIdx];
    graphComponentStorage = allGraphComponentFolder[sheetIdx];
}

function handleSheetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    // By default click on first cell via DOM
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheetUI(sheet) {
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for (let i = 0; i < allSheetFolders.length; i++) {
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = activeSheetColor;
}
function handleUI(sheet){
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
        console.log(sheetDB);
    })
}