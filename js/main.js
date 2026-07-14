// ===============================
// MAIN.JS - VALEN MODA MASCULINA
// ===============================


// Elementos principales del DOM

const contenedorProductos = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtro-categoria");
const ordenProductos = document.getElementById("orden-productos");


// Copia de productos para trabajar filtros sin modificar el array original

let productosPagina = [...productos];
let productosMostrados = [...productos];


// ===============================
// CARGAR PRODUCTOS
// ===============================

function cargarProductos(listaProductos) {

    if (!contenedorProductos) return;


    contenedorProductos.innerHTML = "";


    listaProductos.forEach(producto => {


        const tarjeta = document.createElement("article");


        tarjeta.classList.add("producto-card");


        tarjeta.innerHTML = `

            <img 
                src="${producto.imagen}" 
                alt="${producto.nombre}"
            >


            <h3>
                ${producto.nombre}
            </h3>


            <p class="categoria">
                ${producto.categoria}
            </p>


            <p class="precio">
                $${producto.precio.toLocaleString()}
            </p>


            <button 
                class="btn-agregar"
                data-id="${producto.id}"
            >
                Agregar al carrito
            </button>

        `;


        contenedorProductos.appendChild(tarjeta);


    });


    activarBotonesCarrito();

}



// ===============================
// INICIALIZACIÓN
// ===============================

document.addEventListener("DOMContentLoaded", () => {


    const categoriaPagina = document.body.dataset.categoria;



    if(categoriaPagina === "ropa"){


        const ropa = productos.filter(producto => {


            return (

                producto.categoria === "camisas" ||

                producto.categoria === "chaquetas" ||

                producto.categoria === "pantalones" ||

                producto.categoria === "remeras"

            );


        });


        productosPagina = [...ropa];
        productosMostrados = [...ropa];

        cargarProductos(productosMostrados);


        }else if(categoriaPagina === "accesorios"){



        const accesorios = productos.filter(producto => {


            return producto.categoria === "accesorios";


        });


        productosPagina = [...accesorios];
        productosMostrados = [...accesorios];

        cargarProductos(productosMostrados);



    }else{

    productosPagina = [...productos];
    productosMostrados = [...productos];

    cargarProductos(productosMostrados);

}


});




// ===============================
// BUSCADOR DE PRODUCTOS
// ===============================

function buscarProductos(texto) {


    const busqueda = texto.toLowerCase();



    productosMostrados = productosPagina.filter(producto => {


        return (

            producto.nombre.toLowerCase().includes(busqueda)

            ||

            producto.categoria.toLowerCase().includes(busqueda)

        );


    });



    cargarProductos(productosMostrados);


}




if (buscador) {


    buscador.addEventListener("input", () => {


        buscarProductos(
            buscador.value
        );


    });


}




// ===============================
// FILTRO POR CATEGORÍA
// ===============================

function filtrarCategoria(categoria) {


    if(categoria === "todos"){

    productosMostrados = [...productosPagina];

}else{


        productosMostrados = productosPagina.filter(producto => {


            return producto.categoria === categoria;


        });


    }


    cargarProductos(productosMostrados);


}



if(filtroCategoria){


    filtroCategoria.addEventListener("change", () => {


        filtrarCategoria(
            filtroCategoria.value
        );


    });


}





// ===============================
// ORDENAMIENTO
// ===============================

function ordenarProductos(orden){


    let productosOrdenados = [...productosMostrados];


    switch(orden){


        case "precio-menor":


            productosOrdenados.sort((a,b)=>{

                return a.precio - b.precio;

            });


        break;



        case "precio-mayor":


            productosOrdenados.sort((a,b)=>{

                return b.precio - a.precio;

            });


        break;



        case "nombre":


            productosOrdenados.sort((a,b)=>{


                return a.nombre.localeCompare(
                    b.nombre
                );


            });


        break;


    }



    cargarProductos(productosOrdenados);


}




if(ordenProductos){


    ordenProductos.addEventListener("change",()=>{


        ordenarProductos(
            ordenProductos.value
        );


    });


}





// ===============================
// BOTONES AGREGAR AL CARRITO
// ===============================

function activarBotonesCarrito(){


    const botonesAgregar = document.querySelectorAll(
        ".btn-agregar"
    );



    botonesAgregar.forEach(boton=>{


        boton.addEventListener("click",()=>{


            const idProducto = Number(
                boton.dataset.id
            );



            const productoSeleccionado = productos.find(producto=>{


                return producto.id === idProducto;


            });



            if(productoSeleccionado){


                agregarAlCarrito(
                    productoSeleccionado
                );


                mostrarMensaje(

                    `${productoSeleccionado.nombre} agregado al carrito`

                );


            }



        });


    });


}





// ===============================
// MENSAJE TEMPORAL
// ===============================

function mostrarMensaje(texto){


    const mensaje = document.createElement("div");


    mensaje.classList.add(
        "mensaje-carrito"
    );


    mensaje.textContent = texto;



    document.body.appendChild(mensaje);



    setTimeout(()=>{


        mensaje.remove();


    },2500);


}