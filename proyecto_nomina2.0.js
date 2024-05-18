const readlineSync = require('readline-sync');

class Empleado {
    constructor(id, genero, salario, estrato, hijos, extranjero, sectorRural) {
        this.id = id;
        this.genero = genero;
        this.salario = salario;
        this.estrato = estrato;
        this.hijos = hijos;
        this.extranjero = extranjero;
        this.sectorRural = sectorRural;
    }

    calcularSalarioBase(precioVuelo) {
        if (this.estrato === "1") {
            this.salario += this.salario * 0.15;
        } else if (this.estrato === "2") {
            this.salario += this.salario * 0.10;
        } else if (this.estrato === "3") {
            this.salario += this.salario * 0.05;
        }

        if (this.sectorRural === "si") {
            this.salario += 35000;
        }

        if (this.extranjero === "si") {
            this.salario += precioVuelo * 2;
            return precioVuelo * 2; // Pasajes para empleados extranjeros
        }
        return 0;
    }

    calcularSalarioHijos(valorX, valorZ, valorY) {
        let subsidioSecundaria = 0;
        if (this.hijos.length > 0) {
            for (let i = 0; i < this.hijos.length; i++) {
                const nivelAcademico = this.hijos[i];
                if (nivelAcademico === "primaria") {
                    this.salario += valorX;
                } else if (nivelAcademico === "secundaria") {
                    this.salario += valorZ;
                    subsidioSecundaria += valorZ;
                } else if (nivelAcademico === "universidad") {
                    this.salario += valorY;
                }
            }
        }
        return subsidioSecundaria;
    }
}

class Nomina {
    constructor() {
        this.empleados = [];
        this.totalNomina = 0;
        this.nominaHombres = 0;
        this.nominaMujeres = 0;
        this.empleadoMasCostoso = { salario: 0 };
        this.subsidioHijosSecundaria = 0;
        this.pasajesEmpleadoExtranjero = 0;
    }

    agregarEmpleado(empleado) {
        this.empleados[this.empleados.length] = empleado; // Sin usar push
    }

    calcularNomina(precioVuelo, valorX, valorZ, valorY) {
        for (let i = 0; i < this.empleados.length; i++) {
            const empleado = this.empleados[i];
            const pasajes = empleado.calcularSalarioBase(precioVuelo);
            this.pasajesEmpleadoExtranjero += pasajes;

            const subsidioSecundaria = empleado.calcularSalarioHijos(valorX, valorZ, valorY);
            this.subsidioHijosSecundaria += subsidioSecundaria;

            this.totalNomina += empleado.salario;
            if (empleado.genero === "m") {
                this.nominaHombres += empleado.salario;
            } else {
                this.nominaMujeres += empleado.salario;
            }

            if (empleado.salario > this.empleadoMasCostoso.salario) {
                this.empleadoMasCostoso = { id: empleado.id, salario: empleado.salario };
            }
        }
    }

    mostrarResultados() {
        console.log(`El costo total de la nomina es: ${this.totalNomina}`);
        console.log(`El costo de la nomina de los hombres es: ${this.nominaHombres}`);
        console.log(`El costo de la nomina de las mujeres es: ${this.nominaMujeres}`);
        console.log(`El empleado que mas dinero cuesta es el empleado ${this.empleadoMasCostoso.id} con un salario de ${this.empleadoMasCostoso.salario}`);
        console.log(`El total de subsidios para hijos en secundaria es: ${this.subsidioHijosSecundaria}`);
        console.log(`El total gastado en pasajes para empleados extranjeros es: ${this.pasajesEmpleadoExtranjero}`);
    }
}
class nodoEmpleado {
    constructor(empleado){
        this.valor = empleado;
        this.siguiente = null;
      
    }
}
class listaEmpleados {
    constructor(){
        this.cabeza = null;
    } 
    insertar(empleado){
        const nuevonodo = new nodoEmpleado(Empleado);
        if(this.cabeza === null){
            this.cabeza = nuevonodo;
        } else {
            let nodotmp = this.cabeza;
            while (nodotmp.siguiente !== null){
                nodotmp = nodotmp.siguiente;
            }
            nodotmp.siguiente = nuevonodo;
            }
        
    }

}

// Ejecución del programa
let cantidadEmpleados = +readlineSync.question("Ingrese la cantidad de empleados: ");
let valorX = +readlineSync.question("Ingrese el valor X: ");
let valorZ = +readlineSync.question("Ingrese el valor Z: ");
let valorY = +readlineSync.question("Ingrese el valor Y: ");
const precioVuelo = 70000;

const nomina = new Nomina();

for (let i = 1; i <= cantidadEmpleados; i++) {
    let genero = readlineSync.question(`El empleado ${i} es m/f: `);
    let salario = +readlineSync.question(`Salario del empleado ${i}: `);
    let estrato = readlineSync.question(`Cual es el estrato del empleado ${i} (1, 2 o 3): `);
    let cantHijos = +readlineSync.question(`Cuantos hijos tiene el empleado ${i}: `);
    let extranjero = readlineSync.question(`El empleado ${i} es extranjero (si o no): `);
    let sectorRural = readlineSync.question(`El empleado ${i} es del sector rural (si o no): `);

    let hijos = [];
    for (let j = 1; j <= cantHijos; j++) {
        let nivelAcademico = readlineSync.question(`Cual es el nivel academico del hijo ${j} (primaria, secundaria o universidad): `);
        hijos[hijos.length] = nivelAcademico; // Sin usar push
    }

    const empleado = new Empleado(i, genero, salario, estrato, hijos, extranjero, sectorRural);
    nomina.agregarEmpleado(empleado);
}

nomina.calcularNomina(precioVuelo, valorX, valorZ, valorY);
nomina.mostrarResultados();const readlineSync = require('readline-sync');

class Empleado {
    constructor(id, genero, salario, estrato, hijos, extranjero, sectorRural) {
        this.id = id;
        this.genero = genero;
        this.salario = salario;
        this.estrato = estrato;
        this.hijos = hijos;
        this.extranjero = extranjero;
        this.sectorRural = sectorRural;
    }

    calcularSalarioBase(precioVuelo) {
        if (this.estrato === "1") {
            this.salario += this.salario * 0.15;
        } else if (this.estrato === "2") {
            this.salario += this.salario * 0.10;
        } else if (this.estrato === "3") {
            this.salario += this.salario * 0.05;
        }

        if (this.sectorRural === "si") {
            this.salario += 35000;
        }

        if (this.extranjero === "si") {
            this.salario += precioVuelo * 2;
            return precioVuelo * 2; // Pasajes para empleados extranjeros
        }
        return 0;
    }

    calcularSalarioHijos(valorX, valorZ, valorY) {
        let subsidioSecundaria = 0;
        if (this.hijos.length > 0) {
            for (let i = 0; i < this.hijos.length; i++) {
                const nivelAcademico = this.hijos[i];
                if (nivelAcademico === "primaria") {
                    this.salario += valorX;
                } else if (nivelAcademico === "secundaria") {
                    this.salario += valorZ;
                    subsidioSecundaria += valorZ;
                } else if (nivelAcademico === "universidad") {
                    this.salario += valorY;
                }
            }
        }
        return subsidioSecundaria;
    }
}

class Nomina {
    constructor() {
        this.empleados = [];
        this.totalNomina = 0;
        this.nominaHombres = 0;
        this.nominaMujeres = 0;
        this.empleadoMasCostoso = { salario: 0 };
        this.subsidioHijosSecundaria = 0;
        this.pasajesEmpleadoExtranjero = 0;
    }

    agregarEmpleado(empleado) {
        this.empleados[this.empleados.length] = empleado; // Sin usar push
    }

    calcularNomina(precioVuelo, valorX, valorZ, valorY) {
        for (let i = 0; i < this.empleados.length; i++) {
            const empleado = this.empleados[i];
            const pasajes = empleado.calcularSalarioBase(precioVuelo);
            this.pasajesEmpleadoExtranjero += pasajes;

            const subsidioSecundaria = empleado.calcularSalarioHijos(valorX, valorZ, valorY);
            this.subsidioHijosSecundaria += subsidioSecundaria;

            this.totalNomina += empleado.salario;
            if (empleado.genero === "m") {
                this.nominaHombres += empleado.salario;
            } else {
                this.nominaMujeres += empleado.salario;
            }

            if (empleado.salario > this.empleadoMasCostoso.salario) {
                this.empleadoMasCostoso = { id: empleado.id, salario: empleado.salario };
            }
        }
    }

    mostrarResultados() {
        console.log(`El costo total de la nomina es: ${this.totalNomina}`);
        console.log(`El costo de la nomina de los hombres es: ${this.nominaHombres}`);
        console.log(`El costo de la nomina de las mujeres es: ${this.nominaMujeres}`);
        console.log(`El empleado que mas dinero cuesta es el empleado ${this.empleadoMasCostoso.id} con un salario de ${this.empleadoMasCostoso.salario}`);
        console.log(`El total de subsidios para hijos en secundaria es: ${this.subsidioHijosSecundaria}`);
        console.log(`El total gastado en pasajes para empleados extranjeros es: ${this.pasajesEmpleadoExtranjero}`);
    }
}
class nodoEmpleado {
    constructor(empleado){
        this.valor = empleado;
        this.siguiente = null;
      
    }
}
class listaEmpleados {
    constructor(){
        this.cabeza = null;
    } 
    insertar(empleado){
        const nuevonodo = new nodoEmpleado(Empleado);
        if(this.cabeza === null){
            this.cabeza = nuevonodo;
        } else {
            let nodotmp = this.cabeza;
            while (nodotmp.siguiente !== null){
                nodotmp = nodotmp.siguiente;
            }
            nodotmp.siguiente = nuevonodo;
            }
        
    }

}

// Ejecución del programa
let cantidadEmpleados = +readlineSync.question("Ingrese la cantidad de empleados: ");
let valorX = +readlineSync.question("Ingrese el valor X: ");
let valorZ = +readlineSync.question("Ingrese el valor Z: ");
let valorY = +readlineSync.question("Ingrese el valor Y: ");
const precioVuelo = 70000;

const nomina = new Nomina();

for (let i = 1; i <= cantidadEmpleados; i++) {
    let genero = readlineSync.question(`El empleado ${i} es m/f: `);
    let salario = +readlineSync.question(`Salario del empleado ${i}: `);
    let estrato = readlineSync.question(`Cual es el estrato del empleado ${i} (1, 2 o 3): `);
    let cantHijos = +readlineSync.question(`Cuantos hijos tiene el empleado ${i}: `);
    let extranjero = readlineSync.question(`El empleado ${i} es extranjero (si o no): `);
    let sectorRural = readlineSync.question(`El empleado ${i} es del sector rural (si o no): `);

    let hijos = [];
    for (let j = 1; j <= cantHijos; j++) {
        let nivelAcademico = readlineSync.question(`Cual es el nivel academico del hijo ${j} (primaria, secundaria o universidad): `);
        hijos[hijos.length] = nivelAcademico; // Sin usar push
    }

    const empleado = new Empleado(i, genero, salario, estrato, hijos, extranjero, sectorRural);
    nomina.agregarEmconst readlineSync = require('readline-sync');

class Empleado {
    constructor(id, genero, salario, estrato, hijos, extranjero, sectorRural) {
        this.id = id;
        this.genero = genero;
        this.salario = salario;
        this.estrato = estrato;
        this.hijos = hijos;
        this.extranjero = extranjero;
        this.sectorRural = sectorRural;
    }

    calcularSalarioBase(precioVuelo) {
        if (this.estrato === "1") {
            this.salario += this.salario * 0.15;
        } else if (this.estrato === "2") {
            this.salario += this.salario * 0.10;
        } else if (this.estrato === "3") {
            this.salario += this.salario * 0.05;
        }

        if (this.sectorRural === "si") {
            this.salario += 35000;
        }

        if (this.extranjero === "si") {
            this.salario += precioVuelo * 2;
            return precioVuelo * 2; // Pasajes para empleados extranjeros
        }
        return 0;
    }

    calcularSalarioHijos(valorX, valorZ, valorY) {
        let subsidioSecundaria = 0;
        if (this.hijos.length > 0) {
            for (let i = 0; i < this.hijos.length; i++) {
                const nivelAcademico = this.hijos[i];
                if (nivelAcademico === "primaria") {
                    this.salario += valorX;
                } else if (nivelAcademico === "secundaria") {
                    this.salario += valorZ;
                    subsidioSecundaria += valorZ;
                } else if (nivelAcademico === "universidad") {
                    this.salario += valorY;
                }
            }
        }
        return subsidioSecundaria;
    }
}

class Nomina {
    constructor() {
        this.empleados = [];
        this.totalNomina = 0;
        this.nominaHombres = 0;
        this.nominaMujeres = 0;
        this.empleadoMasCostoso = { salario: 0 };
        this.subsidioHijosSecundaria = 0;
        this.pasajesEmpleadoExtranjero = 0;
    }

    agregarEmpleado(empleado) {
        this.empleados[this.empleados.length] = empleado; // Sin usar push
    }

    calcularNomina(precioVuelo, valorX, valorZ, valorY) {
        for (let i = 0; i < this.empleados.length; i++) {
            const empleado = this.empleados[i];
            const pasajes = empleado.calcularSalarioBase(precioVuelo);
            this.pasajesEmpleadoExtranjero += pasajes;

            const subsidioSecundaria = empleado.calcularSalarioHijos(valorX, valorZ, valorY);
            this.subsidioHijosSecundaria += subsidioSecundaria;

            this.totalNomina += empleado.salario;
            if (empleado.genero === "m") {
                this.nominaHombres += empleado.salario;
            } else {
                this.nominaMujeres += empleado.salario;
            }

            if (empleado.salario > this.empleadoMasCostoso.salario) {
                this.empleadoMasCostoso = { id: empleado.id, salario: empleado.salario };
            }
        }
    }

    mostrarResultados() {
        console.log(`El costo total de la nomina es: ${this.totalNomina}`);
        console.log(`El costo de la nomina de los hombres es: ${this.nominaHombres}`);
        console.log(`El costo de la nomina de las mujeres es: ${this.nominaMujeres}`);
        console.log(`El empleado que mas dinero cuesta es el empleado ${this.empleadoMasCostoso.id} con un salario de ${this.empleadoMasCostoso.salario}`);
        console.log(`El total de subsidios para hijos en secundaria es: ${this.subsidioHijosSecundaria}`);
        console.log(`El total gastado en pasajes para empleados extranjeros es: ${this.pasajesEmpleadoExtranjero}`);
    }
}
class nodoEmpleado {
    constructor(empleado){
        this.valor = empleado;
        this.siguiente = null;
      
    }
}
class listaEmpleados {
    constructor(){
        this.cabeza = null;
    } 
    insertar(empleado){
        const nuevonodo = new nodoEmpleado(Empleado);
        if(this.cabeza === null){
            this.cabeza = nuevonodo;
        } else {
            let nodotmp = this.cabeza;
            while (nodotmp.siguiente !== null){
                nodotmp = nodotmp.siguiente;
            }
            nodotmp.siguiente = nuevonodo;
            }
        
    }

}

// Ejecución del programa
let cantidadEmpleados = +readlineSync.question("Ingrese la cantidad de empleados: ");
let valorX = +readlineSync.question("Ingrese el valor X: ");
let valorZ = +readlineSync.question("Ingrese el valor Z: ");
let valorY = +readlineSync.question("Ingrese el valor Y: ");
const precioVuelo = 70000;

const nomina = new Nomina();

for (let i = 1; i <= cantidadEmpleados; i++) {
    let genero = readlineSync.question(`El empleado ${i} es m/f: `);
    let salario = +readlineSync.question(`Salario del empleado ${i}: `);
    let estrato = readlineSync.question(`Cual es el estrato del empleado ${i} (1, 2 o 3): `);
    let cantHijos = +readlineSync.question(`Cuantos hijos tiene el empleado ${i}: `);
    let extranjero = readlineSync.question(`El empleado ${i} es extranjero (si o no): `);
    let sectorRural = readlineSync.question(`El empleado ${i} es del sector rural (si o no): `);

    let hijos = [];
    for (let j = 1; j <= cantHijos; j++) {
        let nivelAcademico = readlineSync.question(`Cual es el nivel academico del hijo ${j} (primaria, secundaria o universidad): `);
        hijos[hijos.length] = nivelAcademico; // Sin usar push
    }

    const empleado = new Empleado(i, genero, salario, estrato, hijos, extranjero, sectorRural);
    nomina.agregarEmpleado(empleado);
}

nomina.calcularNomina(precioVuelo, valorX, valorZ, valorY);
nomina.mostrarResultados();const readlineSync = require('readline-sync');

class Empleado {
    constructor(id, genero, salario, estrato, hijos, extranjero, sectorRural) {
        this.id = id;
        this.genero = genero;
        this.salario = salario;
        this.estrato = estrato;
        this.hijos = hijos;
        this.extranjero = extranjero;
        this.sectorRural = sectorRural;
    }

    calcularSalarioBase(precioVuelo) {
        if (this.estrato === "1") {
            this.salario += this.salario * 0.15;
        } else if (this.estrato === "2") {
            this.salario += this.salario * 0.10;
        } else if (this.estrato === "3") {
            this.salario += this.salario * 0.05;
        }

        if (this.sectorRural === "si") {
            this.salario += 35000;
        }

        if (this.extranjero === "si") {
            this.salario += precioVuelo * 2;
            return precioVuelo * 2; // Pasajes para empleados extranjeros
        }
        return 0;
    }

    calcularSalarioHijos(valorX, valorZ, valorY) {
        let subsidioSecundaria = 0;
        if (this.hijos.length > 0) {
            for (let i = 0; i < this.hijos.length; i++) {
                const nivelAcademico = this.hijos[i];
                if (nivelAcademico === "primaria") {
                    this.salario += valorX;
                } else if (nivelAcademico === "secundaria") {
                    this.salario += valorZ;
                    subsidioSecundaria += valorZ;
                } else if (nivelAcademico === "universidad") {
                    this.salario += valorY;
                }
            }
        }
        return subsidioSecundaria;
    }
}

class Nomina {
    constructor() {
        this.empleados = [];
        this.totalNomina = 0;
        this.nominaHombres = 0;
        this.nominaMujeres = 0;
        this.empleadoMasCostoso = { salario: 0 };
        this.subsidioHijosSecundaria = 0;
        this.pasajesEmpleadoExtranjero = 0;
    }

    agregarEmpleado(empleado) {
        this.empleados[this.empleados.length] = empleado; // Sin usar push
    }

    calcularNomina(precioVuelo, valorX, valorZ, valorY) {
        for (let i = 0; i < this.empleados.length; i++) {
            const empleado = this.empleados[i];
            const pasajes = empleado.calcularSalarioBase(precioVuelo);
            this.pasajesEmpleadoExtranjero += pasajes;

            const subsidioSecundaria = empleado.calcularSalarioHijos(valorX, valorZ, valorY);
            this.subsidioHijosSecundaria += subsidioSecundaria;

            this.totalNomina += empleado.salario;
            if (empleado.genero === "m") {
                this.nominaHombres += empleado.salario;
            } else {
                this.nominaMujeres += empleado.salario;
            }

            if (empleado.salario > this.empleadoMasCostoso.salario) {
                this.empleadoMasCostoso = { id: empleado.id, salario: empleado.salario };
            }
        }
    }

    mostrarResultados() {
        console.log(`El costo total de la nomina es: ${this.totalNomina}`);
        console.log(`El costo de la nomina de los hombres es: ${this.nominaHombres}`);
        console.log(`El costo de la nomina de las mujeres es: ${this.nominaMujeres}`);
        console.log(`El empleado que mas dinero cuesta es el empleado ${this.empleadoMasCostoso.id} con un salario de ${this.empleadoMasCostoso.salario}`);
        console.log(`El total de subsidios para hijos en secundaria es: ${this.subsidioHijosSecundaria}`);
        console.log(`El total gastado en pasajes para empleados extranjeros es: ${this.pasajesEmpleadoExtranjero}`);
    }
}
class nodoEmpleado {
    constructor(empleado){
        this.valor = empleado;
        this.siguiente = null;
      
    }
}
class listaEmpleados {
    constructor(){
        this.cabeza = null;
    } 
    insertar(empleado){
        const nuevonodo = new nodoEmpleado(Empleado);
        if(this.cabeza === null){
            this.cabeza = nuevonodo;
        } else {
            let nodotmp = this.cabeza;
            while (nodotmp.siguiente !== null){
                nodotmp = nodotmp.siguiente;
            }
            nodotmp.siguiente = nuevonodo;
            }
        
    }

}

// Ejecución del programa
let cantidadEmpleados = +readlineSync.question("Ingrese la cantidad de empleados: ");
let valorX = +readlineSync.question("Ingrese el valor X: ");
let valorZ = +readlineSync.question("Ingrese el valor Z: ");
let valorY = +readlineSync.question("Ingrese el valor Y: ");
const precioVuelo = 70000;

const nomina = new Nomina();

for (let i = 1; i <= cantidadEmpleados; i++) {
    let genero = readlineSync.question(`El empleado ${i} es m/f: `);
    let salario = +readlineSync.question(`Salario del empleado ${i}: `);
    let estrato = readlineSync.question(`Cual es el estrato del empleado ${i} (1, 2 o 3): `);
    let cantHijos = +readlineSync.question(`Cuantos hijos tiene el empleado ${i}: `);
    let extranjero = readlineSync.question(`El empleado ${i} es extranjero (si o no): `);
    let sectorRural = readlineSync.question(`El empleado ${i} es del sector rural (si o no): `);

    let hijos = [];
    for (let j = 1; j <= cantHijos; j++) {
        let nivelAcademico = readlineSync.question(`Cual es el nivel academico del hijo ${j} (primaria, secundaria o universidad): `);
        hijos[hijos.length] = nivelAcademico; // Sin usar push
    }

    const empleado = new Empleado(i, genero, salario, estrato, hijos, extranjero, sectorRural);
    nomina.agregarEmpleado(empleado);
}

nomina.calcularNomina(precioVuelo, valorX, valorZ, valorY);
nomina.mostrarResultados();const readlineSync = require('readline-sync');

class Empleado {
    constructor(id, genero, salario, estrato, hijos, extranjero, sectorRural) {
        this.id = id;
        this.genero = genero;
        this.salario = salario;
        this.estrato = estrato;
        this.hijos = hijos;
        this.extranjero = extranjero;
        this.sectorRural = sectorRural;
    }

    calcularSalarioBase(precioVuelo) {
        if (this.estrato === "1") {
            this.salario += this.salario * 0.15;
        } else if (this.estrato === "2") {
            this.salario += this.salario * 0.10;
        } else if (this.estrato === "3") {
            this.salario += this.salario * 0.05;
        }

        if (this.sectorRural === "si") {
            this.salario += 35000;
        }

        if (this.extranjero === "si") {
            this.salario += precioVuelo * 2;
            return precioVuelo * 2; // Pasajes para empleados extranjeros
        }
        return 0;
    }

    calcularSalarioHijos(valorX, valorZ, valorY) {
        let subsidioSecundaria = 0;
        if (this.hijos.length > 0) {
            for (let i = 0; i < this.hijos.length; i++) {
                const nivelAcademico = this.hijos[i];
                if (nivelAcademico === "primaria") {
                    this.salario += valorX;
                } else if (nivelAcademico === "secundaria") {
                    this.salario += valorZ;
                    subsidioSecundaria += valorZ;
                } else if (nivelAcademico === "universidad") {
                    this.salario += valorY;
                }
            }
        }
        return subsidioSecundaria;
    }
}

class Nomina {
    constructor() {
        this.empleados = [];
        this.totalNomina = 0;
        this.nominaHombres = 0;
        this.nominaMujeres = 0;
        this.empleadoMasCostoso = { salario: 0 };
        this.subsidioHijosSecundaria = 0;
        this.pasajesEmpleadoExtranjero = 0;
    }

    agregarEmpleado(empleado) {
        this.empleados[this.empleados.length] = empleado; // Sin usar push
    }

    calcularNomina(precioVuelo, valorX, valorZ, valorY) {
        for (let i = 0; i < this.empleados.length; i++) {
            const empleado = this.empleados[i];
            const pasajes = empleado.calcularSalarioBase(precioVuelo);
            this.pasajesEmpleadoExtranjero += pasajes;

            const subsidioSecundaria = empleado.calcularSalarioHijos(valorX, valorZ, valorY);
            this.subsidioHijosSecundaria += subsidioSecundaria;

            this.totalNomina += empleado.salario;
            if (empleado.genero === "m") {
                this.nominaHombres += empleado.salario;
            } else {
                this.nominaMujeres += empleado.salario;
            }

            if (empleado.salario > this.empleadoMasCostoso.salario) {
                this.empleadoMasCostoso = { id: empleado.id, salario: empleado.salario };
            }
        }
    }

    mostrarResultados() {
        console.log(`El costo total de la nomina es: ${this.totalNomina}`);
        console.log(`El costo de la nomina de los hombres es: ${this.nominaHombres}`);
        console.log(`El costo de la nomina de las mujeres es: ${this.nominaMujeres}`);
        console.log(`El empleado que mas dinero cuesta es el empleado ${this.empleadoMasCostoso.id} con un salario de ${this.empleadoMasCostoso.salario}`);
        console.log(`El total de subsidios para hijos en secundaria es: ${this.subsidioHijosSecundaria}`);
        console.log(`El total gastado en pasajes para empleados extranjeros es: ${this.pasajesEmpleadoExtranjero}`);
    }
}
class nodoEmpleado {
    constructor(empleado){
        this.valor = empleado;
        this.siguiente = null;
      
    }
}
class listaEmpleados {
    constructor(){
        this.cabeza = null;
    } 
    insertar(empleado){
        const nuevonodo = new nodoEmpleado(Empleado);
        if(this.cabeza === null){
            this.cabeza = nuevonodo;
        } else {
            let nodotmp = this.cabeza;
            while (nodotmp.siguiente !== null){
                nodotmp = nodotmp.siguiente;
            }
            nodotmp.siguiente = nuevonodo;
            }
        
    }

}

// Ejecución del programa
let cantidadEmpleados = +readlineSync.question("Ingrese la cantidad de empleados: ");
let valorX = +readlineSync.question("Ingrese el valor X: ");
let valorZ = +readlineSync.question("Ingrese el valor Z: ");
let valorY = +readlineSync.question("Ingrese el valor Y: ");
const precioVuelo = 70000;

const nomina = new Nomina();

for (let i = 1; i <= cantidadEmpleados; i++) {
    let genero = readlineSync.question(`El empleado ${i} es m/f: `);
    let salario = +readlineSync.question(`Salario del empleado ${i}: `);
    let estrato = readlineSync.question(`Cual es el estrato del empleado ${i} (1, 2 o 3): `);
    let cantHijos = +readlineSync.question(`Cuantos hijos tiene el empleado ${i}: `);
    let extranjero = readlineSync.question(`El empleado ${i} es extranjero (si o no): `);
    let sectorRural = readlineSync.question(`El empleado ${i} es del sector rural (si o no): `);

    let hijos = [];
    for (let j = 1; j <= cantHijos; j++) {
        let nivelAcademico = readlineSync.question(`Cual es el nivel academico del hijo ${j} (primaria, secundaria o universidad): `);
        hijos[hijos.length] = nivelAcademico; // Sin usar push
    }

    const empleado = new Empleado(i, genero, salario, estrato, hijos, extranjero, sectorRural);
    nomina.agregarEmpleado(empleado);
}

nomina.calcularNomina(precioVuelo, valorX, valorZ, valorY);
nomina.mostrarResultados();const readlineSync = require('readline-sync');

class Empleado {
    constructor(id, genero, salario, estrato, hijos, extranjero, sectorRural) {
        this.id = id;
        this.genero = genero;
        this.salario = salario;
        this.estrato = estrato;
        this.hijos = hijos;
        this.extranjero = extranjero;
        this.sectorRural = sectorRural;
    }

    calcularSalarioBase(precioVuelo) {
        if (this.estrato === "1") {
            this.salario += this.salario * 0.15;
        } else if (this.estrato === "2") {
            this.salario += this.salario * 0.10;
        } else if (this.estrato === "3") {
            this.salario += this.salario * 0.05;
        }

        if (this.sectorRural === "si") {
            this.salario += 35000;
        }

        if (this.extranjero === "si") {
            this.salario += precioVuelo * 2;
            return precioVuelo * 2; // Pasajes para empleados extranjeros
        }
        return 0;
    }

    calcularSalarioHijos(valorX, valorZ, valorY) {
        let subsidioSecundaria = 0;
        if (this.hijos.length > 0) {
            for (let i = 0; i < this.hijos.length; i++) {
                const nivelAcademico = this.hijos[i];
                if (nivelAcademico === "primaria") {
                    this.salario += valorX;
                } else if (nivelAcademico === "secundaria") {
                    this.salario += valorZ;
                    subsidioSecundaria += valorZ;
                } else if (nivelAcademico === "universidad") {
                    this.salario += valorY;
                }
            }
        }
        return subsidioSecundaria;
    }
}

class Nomina {
    constructor() {
        this.empleados = [];
        this.totalNomina = 0;
        this.nominaHombres = 0;
        this.nominaMujeres = 0;
        this.empleadoMasCostoso = { salario: 0 };
        this.subsidioHijosSecundaria = 0;
        this.pasajesEmpleadoExtranjero = 0;
    }

    agregarEmpleado(empleado) {
        this.empleados[this.empleados.length] = empleado; // Sin usar push
    }

    calcularNomina(precioVuelo, valorX, valorZ, valorY) {
        for (let i = 0; i < this.empleados.length; i++) {
            const empleado = this.empleados[i];
            const pasajes = empleado.calcularSalarioBase(precioVuelo);
            this.pasajesEmpleadoExtranjero += pasajes;

            const subsidioSecundaria = empleado.calcularSalarioHijos(valorX, valorZ, valorY);
            this.subsidioHijosSecundaria += subsidioSecundaria;

            this.totalNomina += empleado.salario;
            if (empleado.genero === "m") {
                this.nominaHombres += empleado.salario;
            } else {
                this.nominaMujeres += empleado.salario;
            }

            if (empleado.salario > this.empleadoMasCostoso.salario) {
                this.empleadoMasCostoso = { id: empleado.id, salario: empleado.salario };
            }
        }
    }

    mostrarResultados() {
        console.log(`El costo total de la nomina es: ${this.totalNomina}`);
        console.log(`El costo de la nomina de los hombres es: ${this.nominaHombres}`);
        console.log(`El costo de la nomina de las mujeres es: ${this.nominaMujeres}`);
        console.log(`El empleado que mas dinero cuesta es el empleado ${this.empleadoMasCostoso.id} con un salario de ${this.empleadoMasCostoso.salario}`);
        console.log(`El total de subsidios para hijos en secundaria es: ${this.subsidioHijosSecundaria}`);
        console.log(`El total gastado en pasajes para empleados extranjeros es: ${this.pasajesEmpleadoExtranjero}`);
    }
}
class nodoEmpleado {
    constructor(empleado){
        this.valor = empleado;
        this.siguiente = null;
      
    }
}
class listaEmpleados {
    constructor(){
        this.cabeza = null;
    } 
    insertar(empleado){
        const nuevonodo = new nodoEmpleado(Empleado);
        if(this.cabeza === null){
            this.cabeza = nuevonodo;
        } else {
            let nodotmp = this.cabeza;
            while (nodotmp.siguiente !== null){
                nodotmp = nodotmp.siguiente;
            }
            nodotmp.siguiente = nuevonodo;
            }
        
    }

}

// Ejecución del programa
let cantidadEmpleados = +readlineSync.question("Ingrese la cantidad de empleados: ");
let valorX = +readlineSync.question("Ingrese el valor X: ");
let valorZ = +readlineSync.question("Ingrese el valor Z: ");
let valorY = +readlineSync.question("Ingrese el valor Y: ");
const precioVuelo = 70000;

const nomina = new Nomina();

for (let i = 1; i <= cantidadEmpleados; i++) {
    let genero = readlineSync.question(`El empleado ${i} es m/f: `);
    let salario = +readlineSync.question(`Salario del empleado ${i}: `);
    let estrato = readlineSync.question(`Cual es el estrato del empleado ${i} (1, 2 o 3): `);
    let cantHijos = +readlineSync.question(`Cuantos hijos tiene el empleado ${i}: `);
    let extranjero = readlineSync.question(`El empleado ${i} es extranjero (si o no): `);
    let sectorRural = readlineSync.question(`El empleado ${i} es del sector rural (si o no): `);

    let hijos = [];
    for (let j = 1; j <= cantHijos; j++) {
        let nivelAcademico = readlineSync.question(`Cual es el nivel academico del hijo ${j} (primaria, secundaria o universidad): `);
        hijos[hijos.length] = nivelAcademico; // Sin usar push
    }

    const empleado = new Empleado(i, genero, salario, estrato, hijos, extranjero, sectorRural);
    nomina.agregarEmpleado(empleado);
}

nomina.calcularNomina(precioVuelo, valorX, valorZ, valorY);
nomina.mostrarResultados();pleado(empleado);
}

nomina.calcularNomina(precioVuelo, valorX, valorZ, valorY);
nomina.mostrarResultados();
