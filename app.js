
// Clase producto, para crear cada producto con respectivos parametros
class Product{
    constructor(marca, vehiculo, anio, tipo) {
        this.marca = marca;
        this.vehiculo = vehiculo;
        this.anio = anio;
        this.tipo = tipo;
    }
}

class View{
    //Metodo para ragregar producto, lo muestra en una lista con boton de eliminar para tener la opción despues
    addProduct(product) {
        const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Marca</strong>: ${product.marca} -
                    <strong>Vehíclo</strong>: ${product.vehiculo} - 
                    <strong>Clase - Tipo</strong>: ${product.tipo} - 
                    <strong>Modelo</strong>: ${product.anio}
                    <a href="#" class="btn btn-danger" name="delete" style="border-radius: 10px;">Delete</a>
                </div>
            </div>
        `;
    productList.appendChild(element);
    }

    //Limpiar los controles que tiene el formulario, en lugar de limpiar campo por campo
    resetForm() {
        document.getElementById("product-form").reset();
      }

    //Eliminar producto agregado del listado, pasandole como referencia el elemento
    deleteProduct(element){
        if (element.name === "delete") {
            // console.log(element.parentElement);
            element.parentElement.parentElement.remove();
            this.showMessage("Product Deleted Succsssfully", "info");
          }
    }

    //Envio de mensajes, dependiendo de la acción es el mensaje (error o hecho)
    showMessage(message, cssClass){

        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
    
        // Muestra en el DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");
    
        // Inserta mensaje en pantalla antes del formulario 
        container.insertBefore(div, app);
    
        // Quitar el mensaje despues de un tiempo determinado
        setTimeout(function () {
          document.querySelector(".alert").remove();
        }, 3000);
    }
}

//DOM - Formulario
document.getElementById('product-form')
    .addEventListener('submit', function(e){
        //console.log(document.getElementById('name').value)
        const marca = document.getElementById('marca').value;
        const vehiculo = document.getElementById('vehiculo').value;
        const tipo = document.getElementById('tipo').value;
        const anio = document.getElementById('anio').value;
        
        // console.log(name, price, year);
        //console.log(new product(name, price, year));
        
        const product = new Product(marca, vehiculo, anio, tipo);

        const view = new View();

         // Validación para no permitir campos vacíos
        if (marca === "" || vehiculo === "" || tipo === "" || anio === "") {            
            return view.showMessage("Please Insert data in all fields", "danger");
        }
        
        //Agrego producto
        view.addProduct(product);
        //Limpio formulario
        view.resetForm();
        //Muestro mensaje y le envío los parametros
        view.showMessage('Product added successfully', 'success');

        e.preventDefault();
    })

    //Listado de productos
    document.getElementById("product-list").addEventListener("click", (e) => {
        const view = new View();
        view.deleteProduct(e.target);
        e.preventDefault();
      });
      