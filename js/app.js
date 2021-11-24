const listaCarrito = document.querySelector(".listaCarrito"); //tbody
let carrito;


//DOMContentLoaded + darle el contenido al carrito
$('document').ready(function () {
    const almacenamientoCarrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = almacenamientoCarrito || [];
});

//Agregar los objetos dentro del array "carrito"
$('.contenedor').click(agregarCarrito)

function agregarCarrito(e){
    e.preventDefault();
    
    if (e.target.classList.contains("btn-agregar")){
        
        const card = e.target.parentElement.parentElement;

        const agregarProductos = {
            nombreProd: card.querySelector("h3").textContent,
            precio: card.querySelector(".precio").textContent,
            cantidad: 1,
            id: card.querySelector(".card__img").getAttribute("id")
        }

        //Chequear que no se repitan objetos
        const cantidadRepetida = carrito.findIndex (producto => producto.id == agregarProductos.id);

        if (cantidadRepetida !== -1) {
            carrito[cantidadRepetida].cantidad++;
        } else{
            carrito.push(agregarProductos);
        }



        agregarProdHTML();
        actualizarStorage();
    }
}


//Agregar HTML de productos dentro del carrito
function agregarProdHTML(){
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        
        const {nombreProd, precio, cantidad, id} = producto;

        const fila = document.createElement("tr");
        fila.innerHTML = 
        `<td class="cantidad-carrito">${cantidad}</td>
        <td class="nombre-carrito">${nombreProd}</td>
        <td class="precio-carrito">${precio}</td>
        <td><button id="${id}" onclick=captura("${id}") class="btn-quitar"><span class="iconify" data-icon="clarity:trash-line"></span></button></td>`

        listaCarrito.appendChild(fila);
    });
}


//Actualizar el localStorage
function actualizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



//Darle la funcionalidad al botón de vaciar carrito
$('.btn-vaciar').click(() => {
    carrito = [];
    localStorage.clear();
    agregarProdHTML();
})



// Darle funcionalidad al botón quitar del carrito
function captura(producto){

    let prodEncontrado =  carrito.find(x =>  x.id == producto);
    let indexProducto = carrito.indexOf(prodEncontrado);
    carrito.splice([indexProducto], 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
};




function abrirDiv(){
    
    $(".login-register-section").fadeIn("slow");
    $(".dark-background").fadeIn("slow");


}


function cerrarDiv(){
    
    $(".login-register-section").fadeOut()
    $(".dark-background").fadeOut()
};









const logInRegisterSection = document.querySelector(".login-register-section");
const logIn = document.querySelector(".login-section");
const register = document.querySelector(".register-section");
let usuarioIniciado = false;


//REGISTER
register.addEventListener("click", registerSection)


function registerSection(){
    logInRegisterSection.innerHTML = '';

    const form = document.createElement("div");
    form.innerHTML = `
        <form class="form-register">
            <span class="iconify left-arrow" data-icon="bi:arrow-left-circle-fill" onclick="volverLogin()"></span>
            <h2>REGISTER</h2>
            <input type="email" placeholder="Correo electrónico" required id="email-register">
            <input type="password" placeholder="Contraseña" required id="passwordUno">
            <input type="password" placeholder="Confirmar contraseña" required id="passwordDos">
            <p class="login-btn" onclick="crearCuenta()">CREAR CUENTA</p>
            <div class="register-background"></div>
            <div class="register-background-two"></div>
            <div class="register-background-three"></div>
        </form>
        `

    logInRegisterSection.appendChild(form)
}



function crearCuenta() {
    const email = document.querySelector("#email-register").value;
    const passwordUno = document.querySelector("#passwordUno").value;
    const passwordDos = document.querySelector("#passwordDos").value;

    let usuario = {
        email: email,
        passwordUno: passwordUno,
        passwordDos: passwordDos
    }

    
    if(passwordUno === passwordDos){

        localStorage.setItem("usuario", JSON.stringify(usuario));


        logInRegisterSection.innerHTML = '';
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="register-completed">
        <span class="iconify close-log-reg" data-icon="gridicons:cross-circle" onclick="cerrarDiv()"></span>
        <h2>¡Te has registrado correctamente!</h2>
        </div>
        `;

        logInRegisterSection.appendChild(div);

        $(".login-register-section").fadeOut(3500);
        $(".dark-background").fadeOut(3500);

        usuarioIniciado = true;
    }else{
        $(".form-register").append('<p class="pass-incorrectas">Las contraseñas no coinciden. Por favor, intentelo nuevamente.</p>')
    }

}




//LOGIN
function logInSection(){
    logInRegisterSection.innerHTML = '';

    const form = document.createElement("div");
    form.innerHTML = `
            <form class="form-login">
            <span class="iconify left-arrow" data-icon="bi:arrow-left-circle-fill" onclick="volverLogin()"></span>
            <h2>LOGIN</h2>
            <input type="email" placeholder="Correo electrónico" required id="email-login">
            <input type="password" placeholder="Contraseña" required id="pass-login">
            <p class="login-btn" type="submit" onclick="loguearUsuario()">INICIAR SESIÓN</p>
            <p onclick="registerSection()" class="no-cuenta">¿No tienes una cuenta aún?</p>
            <div class="login-background"></div>
            <div class="login-background-two"></div>
            <div class="login-background-three"></div>
            </form>
            `
            
    logInRegisterSection.appendChild(form)
}
        
        
function volverLogin(){
    logInRegisterSection.innerHTML = `<span class="iconify close-log-reg" data-icon="gridicons:cross-circle" onclick="cerrarDiv()"></span>
    <div class="login-register-background"></div>
    <div class="login-register-background-two"></div>

    <div class="btns-log-reg">
        <button class="login-section" onclick="logInSection()">INICIAR SESIÓN</button>
        <button class="register-section" onclick="registerSection()">REGISTRARSE</button>
    </div>`
}





function loguearUsuario(){
    const emailLogin = document.querySelector("#email-login").value;
    const passLogin = document.querySelector("#pass-login").value;

    usuario = JSON.parse(localStorage.getItem("usuario"));

    if(emailLogin === usuario.email && passLogin === usuario.passwordUno){


        logInRegisterSection.innerHTML = '';
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="register-completed">
        <span class="iconify close-log-reg" data-icon="gridicons:cross-circle" onclick="cerrarDiv()"></span>
        <h2>¡Te has logueado correctamente!</h2>
        </div>
        `;

        logInRegisterSection.appendChild(div);

        $(".login-register-section").fadeOut(3500);
        $(".dark-background").fadeOut(3500);

        usuarioIniciado = true;

    }else{
        $(".form-login").append('<p class="mal-logueo">El correo y la contraseña no coinciden. Por favor intentalo de nuevo.</p>')
    }
}



function compraFinalizar(){
    if(usuarioIniciado){
        $(".compra-lista").fadeIn("slow");
        $(".compra-lista").fadeOut(4000)
        $(".dark-background").fadeIn("slow");
        $(".dark-background").fadeOut(4000)
        const compraLista = document.querySelector(".compra-lista")
        compraLista.innerHTML = '';
        $(".compra-lista").append("<h2>La compra se ha realizado con éxito.</h2>")
        carrito = [];
        localStorage.clear();
        agregarProdHTML();
    }else{
        $(".compra-lista").fadeIn("slow");
        $(".compra-lista").fadeOut(4000)
        $(".dark-background").fadeIn("slow");
        $(".dark-background").fadeOut(4000)
        const compraLista = document.querySelector(".compra-lista")
        compraLista.innerHTML = '';
        $(".compra-lista").append("<h2>Necesitas iniciar sesión antes de poder realizar una compra.</h2>")
    }
};

