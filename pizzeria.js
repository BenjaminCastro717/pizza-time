/*
CODIGO A COMPLETAR
*/

  /*
  Escribir una función calculatePrice que recibe los parámetros
  nPepperonis, nBasils, nMushrooms, hasSauce y hasCheese (los primeros 
  tres son números, los últimos dos booleans). La función deberá retornar 
  el precio total, calculado considerando que:

    1. El precio base de la pizza es 5
    2. Cada pepperoni vale 0.5, cada albahaca vale 0.3 y cada champiñon vale 0.1
    3. Si lleva salsa se suma 1, si lleva queso se suma 1.5 
  */
  // La salida de esta función aparecerá en consola (para debuggear)
  // if / else if / else
  // Operaciones matemáticas
  // Retornar número

// Funcion Parte 1 Calcular Precio:
function calculatePrice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  const BASE = 5;
  const PRICE_PEPPERONI = 0.5;
  const PRICE_BASIL = 0.3;
  const PRICE_MUSHROOM = 0.1;
  const PRICE_SAUCE = 1;
  const PRICE_CHEESE = 1.5;

  // Asegurar números válidos
  const p = Number(nPepperonis) || 0;
  const b = Number(nBasils) || 0;
  const m = Number(nMushrooms) || 0;

  let total = BASE + p * PRICE_PEPPERONI + b * PRICE_BASIL + m * PRICE_MUSHROOM;
  if (hasSauce) total += PRICE_SAUCE;
  if (hasCheese) total += PRICE_CHEESE;

  // Retornar total
  return total;
}


// Funcion Parte 2 Mostrar boleta y precio:
  /*
  Escribir una funcion displayInvoice para mostrar un resumen de los ingredientes elegidos 
  y que incluya el precio total (utilizar función calculatePrice). Se recomienda agregar 
  elementos HTML apropiados en el DIV con id "order-summary". Por ejemplo, se pueden usar
  tags LI dentro de un tag UL para cada ingrediente, y mostrar un P que contenga el precio.
  */
  // document.getElementById(...);
  // document.createElement(...);
  // document.createTextNode(...);
  // elem.appendChild(...);
  // No es necesario retornar algo

//Funcion Parte 2:
function displayInvoice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  const container = document.getElementById("order-summary");
  container.innerHTML = "";

  // Recuadro tipo boleta
  const invoiceBox = document.createElement("div");
  invoiceBox.className = "invoice";

  const list = document.createElement("ul");

  const addItem = (label, qty, unitPrice) => {
    if (qty > 0) {
      const li = document.createElement("li");
      const subtotal = qty * unitPrice;
      const text = document.createTextNode(
        `${label}: ${qty} × ${unitPrice.toFixed(2)} = ${subtotal.toFixed(2)}`
      );
      li.appendChild(text);
      list.appendChild(li);
    }
  };

  addItem("Pepperoni", Number(nPepperonis) || 0, 0.5);
  addItem("Albahaca", Number(nBasils) || 0, 0.3);
  addItem("Champiñón", Number(nMushrooms) || 0, 0.1);

  if (hasSauce) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("Salsa: 1.00"));
    list.appendChild(li);
  }
  if (hasCheese) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("Queso: 1.50"));
    list.appendChild(li);
  }

  const baseP = document.createElement("p");
  baseP.textContent = "Base pizza: 5.00";

  const total = calculatePrice({
    nPepperonis,
    nBasils,
    nMushrooms,
    hasSauce,
    hasCheese
  });

  const totalP = document.createElement("p");
  totalP.className = "total";
  totalP.textContent = `Total: ${total.toFixed(2)}`;

  // Orden de la boleta
  invoiceBox.appendChild(baseP);
  invoiceBox.appendChild(list);
  invoiceBox.appendChild(totalP);

  // Insertar la boleta completa al contenedor
  container.appendChild(invoiceBox);
}


/*
CODIGO BASE (pueden leerlo)
*/

const form = document.querySelector("#pizza-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  // Evitamos el comportamiento default (POST a nueva URL)
  event.preventDefault();

  // Extraemos los valores del formulario usando el objeto FormData
  const formData = new FormData(event.target);
  // Creamos un objeto para contener las preferencias con su tipo apropiado
  const ingredientsData = {
    nPepperonis: +formData.get("pepperoniCount"),
    nBasils: +formData.get("basilCount"),
    nMushrooms: +formData.get("mushroomCount"),
    hasSauce: formData.get("sauceCheck") !== null,
    hasCheese: formData.get("cheeseCheck") !== null
  };
  // Usamos "destructuring assignment" para pasar un objeto a cada función
  // (ver firma de cada función, en particular al uso de llaves en los parámetros)
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#desempacar_campos_de_objetos_pasados_como_par%C3%A1metro_de_funci%C3%B3n
  const price = calculatePrice(ingredientsData);
  console.log(price);
  displayPizza(ingredientsData);
  displayInvoice(ingredientsData);
}

function displayPizza({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  const ingredientsCount = {
    pepperoni: nPepperonis,
    basil: nBasils,
    mushroom: nMushrooms
  };
  for (const ingredient in ingredientsCount) {
    // Limpiamos la capa de ingredientes de la última ejecución
    const ingredientLayerElement = document.getElementById(ingredient);
    ingredientLayerElement.innerHTML = "";
    // Agregamos ingredientes a la capa en posiciones aleatorias
    for (let i = 0; i < ingredientsCount[ingredient]; i++) {
      const ingredientElement = document.createElement("div");
      ingredientElement.className = ingredient;
      ingredientElement.style.top = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientElement.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientLayerElement.appendChild(ingredientElement);
    }
  }

  // Agregamos o quitamos la capa de salsa y queso (por medio de clases CSS)
  const sauceLayer = document.getElementById("sauce");
  hasSauce
    ? sauceLayer.classList.add("sauce")
    : sauceLayer.classList.remove("sauce");
  const cheeseLayer = document.getElementById("cheese");
  hasCheese
    ? cheeseLayer.classList.add("cheese")
    : cheeseLayer.classList.remove("cheese");
}
