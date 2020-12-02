//------- VARIABLES --------
const tarjeta = document.querySelector('#tarjeta'),
        btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
        formulario = document.querySelector('#formulario-tarjeta'),
        numeroTarjeta = document.querySelector('#tarjeta .numero'),
        nombreTarjeta = document.querySelector('#tarjeta .nombre'),
        logoMarca = document.querySelector('#logo-marca'),
        firma = document.querySelector('#tarjeta .firma p');
        mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
        yearExpiracion = document.querySelector('#tarjeta #expiracion .year'),
        ccv = document.querySelector('#tarjeta #ccv .ccv');

// VOLTEAMOS LA TARJETA PARA QUE EL USUARIO VEA EL FRENTE
const mostrarFrente = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
} 

//------- ROTACION DE LA TARJETA --------        
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

//------- BOTON DE ABRIR EL FORMULARIO --------
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

//------- RELLENAR EL SELECT DEL MES DINAMICAMENTE --------
for(let i = 1; i <= 12; i++){
    let opcion = document.createElement('option');
        opcion.value = i;
        opcion.innerText = i;
        formulario.selectMes.appendChild(opcion);
}

//------- RELLENAR EL SELECT DEL AÑO DINAMICAMENTE --------
const yearActual = new Date().getFullYear();

for(let i = yearActual; i <= yearActual +8; i++){
    let opcion = document.createElement('option');
        opcion.value = i;
        opcion.innerText = i;
        formulario.selectYear.appendChild(opcion);
}

//------- INPUT DEL NUMERO DE LA TARJETA --------
formulario.inputNumero.addEventListener('keyup', (e) => {

    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    // ELIMINAMOS ESPACIOS EN BLANCO 
    .replace(/\s/g, '')
    // ELIMINAR LAS LETRAS
    .replace(/\D/g, '')
    // PONEMOS ESPACIOS CADA 4 NUMEROS
    .replace(/([0-9]{4})/g, '$1 ')
    // ELIMINAR EL ULTIMO ESPACIO
    .trim();

    numeroTarjeta.textContent = valorInput;
    
    //------- SI NO HAY NADA EN EL INPUT, LO REGRESAMOS AL VALOR ORIGINAL --------
    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }

    //------- MOSTAR EL TIPO DE TARJETA DE CREDITO --------
    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    }else if(valorInput[0] == 5){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // VOLTEAMOS LA TARJETA PARA QUE EL USUARIO VEA EL FRENTE
    mostrarFrente();

});

//------- INPUT DEL NOMBRE DE LA TARJETA --------
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreTarjeta.textContent = 'Jhon Doe';
    }

    mostrarFrente();

});

//------- SELECT DEL MES --------
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

//------- SELECT DEL YEAR --------
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

//------- INPUT DEL CCV --------
formulario.inputCCV.addEventListener('keyup', () => {
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    // ELIMINAMOS ESPACIOS EN BLANCO 
    .replace(/\s/g, '')
    // ELIMINAR LAS LETRAS
    .replace(/\D/g, '');

    ccv.textContent = formulario.inputCCV.value;

});