const formulario = document.querySelector('#formulario');
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const btnConsultar = document.querySelector('.btn-consultar');
const spinner = document.querySelector('.spinner');
const correo = {
    email: '',
    asunto: '',
    mensaje: '',
}

inputEmail.addEventListener('blur', validarCampo);
inputAsunto.addEventListener('blur', validarCampo);
inputMensaje.addEventListener('blur', validarCampo);
formulario.addEventListener('submit', enviarCorreo);

function validarCampo(e){
    if (e.target.value.trim() === ''){
        crearAlerta('Este campo es obligatorio.', e.target.parentElement);
        correo[e.target.id] = '';
        comprobacionParaEnviar();
        return;
    }

    if (e.target.id === 'email'){
        if (!validarEmail(e.target.value)){
            crearAlerta('El email ingresado no es válido', e.target.parentElement);
            return;
        }
    }

    borrarAlerta(e.target.parentElement)
    
    correo[e.target.id] = e.target.value.trim().toLowerCase();

    comprobacionParaEnviar();
}

function crearAlerta(mensaje, referencia){
    borrarAlerta(referencia);
    
    const alerta = document.createElement('P');
    alerta.classList.add('msj-alerta');
    alerta.textContent = mensaje;

    referencia.appendChild(alerta);
}

function borrarAlerta(referencia){
    const alertaExiste = referencia.querySelector('.msj-alerta');

    if (alertaExiste){
        alertaExiste.remove();
    }
}

function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(email);
    return resultado;
}

function comprobacionParaEnviar(){
    if (correo.email !== '' && correo.asunto !== '' && correo.mensaje !== ''){
        btnConsultar.disabled = false;
    }else{
        btnConsultar.disabled = true;
    }
}

function enviarCorreo(e){
    e.preventDefault();

    spinner.classList.remove('d-none');

    setTimeout(()=>{
        spinner.classList.add('d-none');
        formulario.reset();
        correo.email = '';
        correo.asunto = '';
        correo.mensaje = '';
        mostrarMensajeExito();
    }, 3000)
}

function mostrarMensajeExito(){
    const msjExito = document.createElement('P');
    msjExito.classList.add('msj-exito');
    msjExito.textContent = '¡Tu consulta fue enviada!';
    formulario.appendChild(msjExito);

    setTimeout(()=>{
        msjExito.classList.add('d-none');
    },3000)
}