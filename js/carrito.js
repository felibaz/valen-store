// =========================
// CARRITO.JS
// =========================


// =========================
// CARGAR CARRITO
// =========================

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];



// =========================
// ELEMENTOS DEL DOM
// =========================

const contenedorCarrito = document.getElementById(
    "contenedor-carrito"
);

const carritoVacio = document.getElementById(
    "carrito-vacio"
);

const resumenCarrito = document.getElementById(
    "resumen-carrito"
);

const subtotal = document.getElementById(
    "subtotal"
);

const total = document.getElementById(
    "total"
);




// =========================
// GUARDAR CARRITO
// =========================

function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}




// =========================
// AGREGAR AL CARRITO
// =========================

function agregarAlCarrito(producto){


    const productoExistente = carrito.find(item => {

        return item.id === producto.id;

    });



    if(productoExistente){


        productoExistente.cantidad++;


    }else{


        carrito.push({

            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1

        });


    }



    guardarCarrito();

    actualizarContador();


}




// =========================
// CONTADOR HEADER
// =========================

function actualizarContador(){


    const contador = document.getElementById(
        "contador-carrito"
    );


    if(!contador) return;



    const cantidad = carrito.reduce(

        (total, producto) =>

            total + producto.cantidad,

        0

    );



    contador.textContent = cantidad;


}




// =========================
// CARGAR VISTA CARRITO
// =========================

function cargarCarrito(){


    if(!contenedorCarrito) return;



    contenedorCarrito.innerHTML = "";



    if(carrito.length === 0){


        if(carritoVacio){

            carritoVacio.style.display = "block";

        }


        if(resumenCarrito){

            resumenCarrito.style.display = "none";

        }


        return;


    }



    if(carritoVacio){

        carritoVacio.style.display = "none";

    }


    if(resumenCarrito){

        resumenCarrito.style.display = "block";

    }



    carrito.forEach(producto => {


        const card = document.createElement(
            "article"
        );


        card.classList.add(
            "card-carrito"
        );



        const subtotalProducto =
            producto.precio * producto.cantidad;



        card.innerHTML = `


            <img

                src="${producto.imagen}"

                alt="${producto.nombre}"

            >


            <div class="info-carrito">


                <h3>
                    ${producto.nombre}
                </h3>


                <p>
                    Precio:
                    $${producto.precio.toLocaleString()}
                </p>



                <div class="cantidad">


                    <button

                        class="menos"

                        data-id="${producto.id}"

                    >
                        -
                    </button>



                    <span>
                        ${producto.cantidad}
                    </span>



                    <button

                        class="mas"

                        data-id="${producto.id}"

                    >
                        +
                    </button>


                </div>



                <p>
                    Subtotal:
                    $${subtotalProducto.toLocaleString()}
                </p>



                <button

                    class="eliminar"

                    data-id="${producto.id}"

                >

                    🗑 Eliminar

                </button>


            </div>


        `;



        contenedorCarrito.appendChild(card);



    });



    actualizarResumen();


    activarBotones();


}




// =========================
// CAMBIAR CANTIDAD
// =========================

function cambiarCantidad(id, cambio){


    const producto = carrito.find(item => {

        return item.id === id;

    });



    if(!producto) return;



    producto.cantidad += cambio;



    if(producto.cantidad <= 0){


        carrito = carrito.filter(item => {


            return item.id !== id;


        });


    }



    guardarCarrito();


    cargarCarrito();


    actualizarContador();


}




// =========================
// ELIMINAR PRODUCTO
// =========================

function eliminarProducto(id){


    carrito = carrito.filter(producto => {


        return producto.id !== id;


    });



    guardarCarrito();


    cargarCarrito();


    actualizarContador();


}




// =========================
// BOTONES DEL CARRITO
// =========================

function activarBotones(){


    document.querySelectorAll(".mas")
    .forEach(boton => {


        boton.addEventListener("click",()=>{


            cambiarCantidad(

                Number(boton.dataset.id),

                1

            );


        });


    });



    document.querySelectorAll(".menos")
    .forEach(boton => {


        boton.addEventListener("click",()=>{


            cambiarCantidad(

                Number(boton.dataset.id),

                -1

            );


        });


    });



    document.querySelectorAll(".eliminar")
    .forEach(boton => {


        boton.addEventListener("click",()=>{


            eliminarProducto(

                Number(boton.dataset.id)

            );


        });


    });



}




// =========================
// ACTUALIZAR RESUMEN
// =========================

function actualizarResumen(){


    if(!subtotal || !total) return;



    const totalCompra = carrito.reduce(

        (total,producto)=>

            total +

            (producto.precio * producto.cantidad),

        0

    );



    subtotal.textContent =
        "$" + totalCompra.toLocaleString();



    total.textContent =
        "$" + totalCompra.toLocaleString();


}




// =========================
// VACIAR CARRITO
// =========================

const btnVaciar = document.getElementById(
    "vaciar-carrito"
);



if(btnVaciar){


    btnVaciar.addEventListener("click",()=>{


        if(carrito.length === 0) return;



        if(confirm("¿Deseás vaciar el carrito?")){


            carrito = [];


            guardarCarrito();


            cargarCarrito();


            actualizarContador();


        }


    });


}




// =========================
// FINALIZAR COMPRA
// =========================

const btnFinalizar = document.getElementById(
    "finalizar-compra"
);



if(btnFinalizar){


    btnFinalizar.addEventListener("click",()=>{


        if(carrito.length === 0){


            alert(
                "Tu carrito está vacío."
            );


            return;


        }



        alert(
            "¡Gracias por tu compra!\n\n(Esta es una tienda de demostración.)"
        );



        carrito = [];


        guardarCarrito();


        cargarCarrito();


        actualizarContador();


    });


}





// =========================
// INICIO
// =========================

actualizarContador();
cargarCarrito();