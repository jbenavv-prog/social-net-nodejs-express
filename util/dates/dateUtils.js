const moment = require('moment-timezone');

const getFecha = () => {
    let hoy = new Date();
    //'2019-07-04 00:00:00.000'

    let fecha = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;
    let hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
    let fechaHora = `${fecha} ${hora}`;

    // console.log(`getFecha: ${fechaHora}`);

    return fechaHora;
};

const getCurrentDay = () => {
    return (new Date()).getDate();
}

const getCurrentMonth = () => {
    return (new Date()).getMonth() + 1;
}

const getCurrentYear = () => {
    return (new Date()).getFullYear();
}

const getEndOfDay = (fechaFin) => {
    return `${fechaFin} 23:59:59`;
}

const getIniOfDay = (fechaIni) => {
    return `${fechaIni} 00:00:00`;
}

const getFechaYYYYmmDD = (fecha) => {
    return fecha.toISOString().substring(0, 10);
};

const getFechaYYYYmmDD_5COT = (fecha) => {
    return moment.utc(fecha).tz('America/Bogota', true).format('YYYY-MM-DD');
    //return fecha.toISOString().substring(0, 10);
};

const formatDates = (entidad) => {

    if (entidad.fechaReserva) {
        entidad.fechaReserva = moment.utc(entidad.fechaReserva).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.fechaIngreso) {
        entidad.fechaIngreso = moment.utc(entidad.fechaIngreso).tz('America/Bogota', true).format('YYYY-MM-DD');
    }


    if (entidad.fechaFinalizacionContrato) {
        entidad.fechaFinalizacionContrato = moment.utc(entidad.fechaFinalizacionContrato).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.fechaNacimiento) {
        entidad.fechaNacimiento = moment.utc(entidad.fechaNacimiento).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.fechaExpedicionCC) {
        entidad.fechaExpedicionCC = moment.utc(entidad.fechaExpedicionCC).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.fechaCreacion) {
        entidad.fechaCreacion = moment.utc(entidad.fechaCreacion).tz('America/Bogota', true).format('YYYY-MM-DD HH:mm:ss');
    }

    if (entidad.fechaIni) {
        entidad.fechaIni = moment.utc(entidad.fechaIni).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.fechaFin) {
        entidad.fechaFin = moment.utc(entidad.fechaFin).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.fechaAlertaPeridoPrueba) {
        entidad.fechaAlertaPeridoPrueba = moment.utc(entidad.fechaAlertaPeridoPrueba).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.fechaAlertaProrrogaTerminacion) {
        entidad.fechaAlertaProrrogaTerminacion = moment.utc(entidad.fechaAlertaProrrogaTerminacion).tz('America/Bogota', true).format('YYYY-MM-DD');
    }

    if (entidad.horaInicio) {
        entidad.horaInicio = moment.utc(entidad.horaInicio).tz('America/Bogota', true).format('YYYY-MM-DD HH:mm:ss');
    }

    if (entidad.horaFin) {
        entidad.horaFin = moment.utc(entidad.horaFin).tz('America/Bogota', true).format('YYYY-MM-DD HH:mm:ss');
    }

    if (entidad.fechaRegistro) {
        entidad.fechaRegistro = moment.utc(entidad.fechaRegistro).tz('America/Bogota', true).format('YYYY-MM-DD HH:mm:ss');
    }

    return entidad;
};

let getFechaDate = () => {
    let hoy = new Date();

    return `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;
};

let getFechaDateHoraActual = () => {
    let hoy = new Date();
    return `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
};

let getcDateHoraActual = (hoy) => {
    //let hoy = new Date();
    return `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
};

const getFechaActual = () => {
    return moment.utc().tz('America/Bogota', true).format('YYYY-MM-DD');
};

const getFechaActualHora = () => {
    return moment.utc().tz('America/Bogota', true).format('YYYY-MM-DD HH:mm:ss');
};

const convertUTCDateToLocalDate = (date) => {
    var newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return newDate;
}
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f-/&\/\\#,+()$~%.'":*?<>{};@]/g, "");
}
const formarFecha = (fecha) => {
    console.log('esta es la fecha', fecha);
    const partesFecha = fecha.split('/');
    console.log(partesFecha);
    const nuevaFecha = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;
    console.log('nuevaFecha', nuevaFecha);
    return moment.utc(nuevaFecha).tz('America/Bogota', true).format('YYYY-MM-DD');
}
module.exports = {
    getFecha,
    getCurrentDay,
    getCurrentMonth,
    getCurrentYear,
    getEndOfDay,
    getIniOfDay,
    getFechaYYYYmmDD,
    getcDateHoraActual,
    formatDates,
    getFechaYYYYmmDD_5COT,
    getFechaActual,
    getFechaDate,
    convertUTCDateToLocalDate,
    getFechaActualHora,
    getFechaDateHoraActual,
    removeAccents,
    formarFecha
}