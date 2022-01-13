let id = 100000000
let idArray = [0 ,1, 2, 3, 4, 5, 6, 7, 8, 9];


////////////// Pixel class //////////////
class Pixel {
    constructor(parent1, parent2) {
      this.id = genId();
      this.genes = new Genes(parent1, parent2);
  }
}


class Genes {
  constructor(parent1, parent2) {
    if (parent1 == null || parent2 ==null){
      this.R = Math.floor(Math.random() * 256);
      this.G = Math.floor(Math.random() * 256);
      this.B = Math.floor(Math.random() * 256);
      return
    }     
    let genes_parent1 = parent1.genes
    let genes_parent2 = parent2.genes
    this.R = generateGene(genes_parent1.R,genes_parent2.R);
    this.G = generateGene(genes_parent1.G,genes_parent2.G);
    this.B = generateGene(genes_parent1.B,genes_parent2.B);      
  }    
}


////////////// Function for creating the RGB gene 
function generateGene(gene1,gene2) {    
  let rand = Math.random();
  if (rand>0.5){
    return Math.floor(Math.random() * 256)
  }
  else{
    let rand = Math.random();
    if (rand>0.5) return gene1    
    else return gene2
  }
}  


////////////// Main function that create pixels
function createNewPixels(numberOfPixelsToCreate) {

  let newPixels = [];

  for (let i = 0 ; i < numberOfPixelsToCreate ; i++ ) {
    let parent1 = pixels.splice(~~(Math.random() * pixels.length),1)[0]
    let parent2 = pixels.splice(~~(Math.random() * pixels.length),1)[0]
    let child = new Pixel(parent1, parent2);
    pixels.push(parent1);
    pixels.push(parent2);  
    pixels.push(child);
    newPixels.push(child);

    console.log('Parent1 - ',parent1);
    console.log('Parent2 - ',parent2);
    console.log('Child - ', child);
    console.log('');

  }
  buildPixelsJson(newPixels)
  id = id + 10;
}

function buildPixelsJson(newPixels) {
  pixelsJsons = [];
  newPixels.forEach(pixel => {
    json = {
      "id": pixel.id,
      "genes": pixel.genes
    }
    pixelsJsons.push(json)
  });
  sendPixelsToSever(pixelsJsons)
}

function sendPixelsToServer(pixelsJsons) {
  let httpRequest = new XMLHttpRequest();
  let url = "http://localhost/api.php";
  httpRequest.open("POST", url, true);
  httpRequest.setRequestHeader("Content-Type",  "application/json");
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          let resJson = JSON.parse(httpRequest.responseText);
          console.log(resJson);
      }
  }
}

////////////// Creating an ID number
function genId() {
  if (idArray.length === 0 ) {
    let idArray = [0 ,1, 2, 3, 4, 5, 6, 7, 8, 9];
    id = id + 10;
  }
  let lastDigit = idArray.splice(~~(Math.random() * idArray.length),1)[0];
  id += lastDigit;
  console.log(id);
  return id;
}


/////// MAIN ///////
let pixels = [];


for (let i = 0; i < 2 ; i++) {
  let Parent = new Pixel(null,null);
  pixels.push(Parent)
}
id = id + 1;




createNewPixels(5);


