const readline = require('readline-sync');

class Pasajero {
    constructor(edad, llevaMascota) {
        this.edad = edad;  
        this.llevaMascota = llevaMascota;  
    }

    esInfante() {
        return this.edad <= 12;
    }

    obtenerTipo() {
        return 'Pasajero';
    }
}

class Infante extends Pasajero {
    constructor(edad, llevaMascota) {
        super(edad, llevaMascota);
    }

    esInfante() {
        return true;
    }

    obtenerTipo() {
        return 'Infante';
    }
}

class Adulto extends Pasajero {
    constructor(edad, llevaMascota) {
        super(edad, llevaMascota);
    }

    esInfante() {
        return false;
    }

    obtenerTipo() {
        return 'Adulto';
    }
}

class NodoPasajero {
    constructor(pasajero) {
        this.valor = pasajero;
        this.siguiente = null;
    }
}

class ListaPasajeros {
    constructor() {
        this.cabeza = null;
    }

    insertar(pasajero) {
        const nuevoNodo = new NodoPasajero(pasajero);
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let nodoTmp = this.cabeza;
            while (nodoTmp.siguiente !== null) {
                nodoTmp = nodoTmp.siguiente;
            }
            nodoTmp.siguiente = nuevoNodo;
        }
    }

    contarInfantes() {
        let nodoTmp = this.cabeza;
        let contador = 0;
        while (nodoTmp !== null) {
            if (nodoTmp.valor.esInfante()) {
                contador++;
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return contador;
    }

    calcularIngresosMascotas(costoBase, impuesto) {
        let nodoTmp = this.cabeza;
        let ingresosMascotas = 0;
        while (nodoTmp !== null) {
            if (nodoTmp.valor.llevaMascota) {
                ingresosMascotas += costoBase * (impuesto / 100);
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return ingresosMascotas;
    }
}

class Vuelo {
    constructor(origen, destino, costoBase) {
        this.origen = origen;
        this.destino = destino;
        this.costoBase = costoBase;
        this.impuesto = 0;
        this.pasajeros = new ListaPasajeros();
        this.vuelosEnPromocion = false;
    }

    agregarPasajero(pasajero) {
        this.pasajeros.insertar(pasajero);
    }

    calcularCostoTiquete() {
        let totalRecaudado = 0;
        let nodoTmp = this.pasajeros.cabeza;
        while (nodoTmp !== null) {
            let costo = this.costoBase;
            if (this.vuelosEnPromocion) {
                costo *= 0.9; // Descuento del 10%
            }
            costo += costo * (this.impuesto / 100);
            totalRecaudado += costo;
            nodoTmp = nodoTmp.siguiente;
        }
        return totalRecaudado;
    }
}

class NodoVuelo {
    constructor(vuelo) {
        this.valor = vuelo;
        this.siguiente = null;
    }
}

class ListaVuelos {
    constructor() {
        this.cabeza = null;
    }

    insertar(vuelo) {
        const nuevoNodo = new NodoVuelo(vuelo);
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let nodoTmp = this.cabeza;
            while (nodoTmp.siguiente !== null) {
                nodoTmp = nodoTmp.siguiente;
            }
            nodoTmp.siguiente = nuevoNodo;
        }
    }

    calcularIngresosTotales() {
        let total = 0;
        let nodoTmp = this.cabeza;
        while (nodoTmp !== null) {
            total += nodoTmp.valor.calcularCostoTiquete();
            nodoTmp = nodoTmp.siguiente;
        }
        return total;
    }

    calcularIngresosMascotas() {
        let total = 0;
        let nodoTmp = this.cabeza;
        while (nodoTmp !== null) {
            total += nodoTmp.valor.pasajeros.calcularIngresosMascotas(nodoTmp.valor.costoBase, nodoTmp.valor.impuesto);
            nodoTmp = nodoTmp.siguiente;
        }
        return total;
    }

    contarInfantes() {
        let contador = 0;
        let nodoTmp = this.cabeza;
        while (nodoTmp !== null) {
            contador += nodoTmp.valor.pasajeros.contarInfantes();
            nodoTmp = nodoTmp.siguiente;
        }
        return contador;
    }
}

const sistemaReservas = new ListaVuelos();
const costoDulces = 2;

let continuar = 's';
while (continuar === 's') {
    let origen = readline.question('Origen del vuelo: ');
    let destino = readline.question('Destino del vuelo: ');
    let costoBase = parseFloat(readline.question('Costo base del vuelo: '));
    let impuesto = parseFloat(readline.question(`Impuesto para ${destino} (%): `));
    let vuelo = new Vuelo(origen, destino, costoBase);
    vuelo.impuesto = impuesto;
    vuelo.vuelosEnPromocion = readline.question('¿El vuelo está en promoción? (s/n): ') === 's';

    let agregarPasajeros = 's';
    while (agregarPasajeros === 's') {
        let edad = parseInt(readline.question('Edad del pasajero: '));
        let llevaMascota = readline.question('¿El pasajero lleva mascota? (s/n): ') === 's';
        let pasajero;
        if (edad <= 12) {
            pasajero = new Infante(edad, llevaMascota);
        } else {
            pasajero = new Adulto(edad, llevaMascota);
        }
        vuelo.agregarPasajero(pasajero);
        agregarPasajeros = readline.question('¿Agregar otro pasajero al vuelo? (s/n): ');
    }

    sistemaReservas.insertar(vuelo);
    continuar = readline.question('¿Agregar otro vuelo? (s/n): ');
}

console.info('Ingresos totales por venta de tiquetes: $' + sistemaReservas.calcularIngresosTotales());
console.info('Dinero recaudado por transporte de mascotas: $' + sistemaReservas.calcularIngresosMascotas());
console.info('Número de infantes que han viajado: ' + sistemaReservas.contarInfantes());
console.info('Costo total de dulces para infantes: $' + (sistemaReservas.contarInfantes() * costoDulces));