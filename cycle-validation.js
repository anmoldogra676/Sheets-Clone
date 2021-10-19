// cycle validation has 3 steps --> storage, relationship, implementation
// Storage will be 2d array --> where each cell contains a empty array because one cell can have more than 1 dependency
// let graphComponentStorage =[];
let allGraphComponentFolder =[];
// for (let i = 0; i < rows; i++) {
//     let rowArr =[]
//     for (let j = 0; j < cols; j++) {
//       rowArr.push([]);
//     }
//     graphComponentStorage.push(rowArr);
// }

// relationship will be parent child. In array we will store [rid, cid] for all the child 
// A1 -> 2*B1 so in B1 graph component cell A1 will be stored in form of [0,0] which is rid and cid


function addChildToGraphComponent(  inputFormula,address){
    let [chrid, chcid] = decodeRIDCIDFromAddress(address);
    let encodedFormula = inputFormula.split(" ");
    for (let i = 0;i < encodedFormula.length;i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentStorage[prid][pcid].push([chrid, chcid]);
        }
    }

}


function removeChildFromGraphComponent(  inputFormula,address){
    let [chrid, chcid] = decodeRIDCIDFromAddress(address);
    let encodedFormula = inputFormula.split(" ");
    for (let i = 0;i < encodedFormula.length;i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentStorage[prid][pcid].pop([chrid, chcid]);
        }
    }

}

// for cycle we need 2 array --> visited , dfsvisited which is of 2d type
//  intially put false in all rows, cols

function isGraphCyclic(graphComponentStorage){
 visited=[];
 dfsvisited=[];
 for(let i=0;i<rows;i++){
     visitedRow=[];
     dfsvisitedRow=[];
     for(let j=0;j<cols;j++){
         visitedRow.push(false);
         dfsvisitedRow.push(false);
     }
     visited.push(visitedRow);
     dfsvisited.push(dfsvisitedRow);
 }

 // now call from every row
 for(let i=0;i<rows;i++){
     for(let j=0;j<cols;j++){
         if(visited[i][j]==false){
            let ans= checkforcycle( graphComponentStorage,i,j,dfsvisited,visited);
            if(ans==true){
                return true;
            }
           
         }
     }
 }
return false;
}

function checkforcycle(graphComponentStorage,i,j,dfsvisited,visited){
    visited[i][j]=true;
    dfsvisited[i][j]=true;
    for(let child =0; child<graphComponentStorage[i][j].length;child++){
        let [crid, ccid] = graphComponentStorage[i][j][child];
        if(visited[crid][ccid]==false){
          let response = checkforcycle(graphComponentStorage,crid, ccid,dfsvisited,visited)
          if(response==true)return true;
        }else if(visited[crid][ccid]== true && dfsvisited[crid][ccid]== true){
            return true;

        }
    }
    
    dfsvisited[i][j]=false;
    return false;
}

