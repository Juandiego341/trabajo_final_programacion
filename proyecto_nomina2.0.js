const readlineSync = require('readline-sync');

class Empleado {
  constructor(nombre, salario, estrato, sector, genero, hijosPrimaria, hijosSecundaria, hijosUniversidad) {
    this.nombre = nombre;
    this.salario = salario;
    this.estrato = estrato;
    this.sector = sector;
    this.genero = genero;
    this.hijos = {
      primaria: hijosPrimaria,
      secundaria: hijosSecundaria,
      universidad: hijosUniversidad
    };
  }

  calcularSubsidio(tasasEstrato, tasasSector, subsidiosHijos) {
    let subsidio = 0;
    if (this.estrato === 1) {
      subsidio += this.salario * tasasEstrato[0];
    } else if (this.estrato === 2) {
      subsidio += this.salario * tasasEstrato[1];
    } else if (this.estrato === 3) {
      subsidio += this.salario * tasasEstrato[2];
    }

    if (this.sector === "rural") {
      subsidio += tasasSector.rural;
    }

    subsidio += subsidiosHijos.primaria * this.hijos.primaria;
    subsidio += subsidiosHijos.secundaria * this.hijos.secundaria;
    subsidio += subsidiosHijos.universidad * this.hijos.universidad;

    return subsidio;
  }

  getCosto() {
    return this.salario + this.calcularSubsidio(tasasEstrato, tasasSector, subsidiosHijos);
  }
}

const tasasEstrato = [0.15, 0.10, 0.05];
const tasasSector = { rural: 35000 };
const subsidiosHijos = {
  primaria: 0,
  secundaria: 0,
  universidad: 0
};

let empleados = [];
let costoNominaTotal = 0;
let costoNominaHombres = 0;
let costoNominaMujeres = 0;
let maxCostoEmpleado = 0;
let costoSubsidioSecundaria = 0;
let costoPasajesExtranjeros = 0;

subsidiosHijos.primaria = +readlineSync.question("Subsidio para hijos en primaria: ");
subsidiosHijos.secundaria = +readlineSync.question("Subsidio para hijos en secundaria: ");
subsidiosHijos.universidad = +readlineSync.question("Subsidio para hijos en universidad: ");

let numEmpleados;
while (true) {
  numEmpleados = +readlineSync.question("Cantidad de empleados: ");
  if (isNaN(numEmpleados) || numEmpleados >= 0) {
    break;
  }
  console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
}

for (let i = 1; i <= numEmpleados; i++) {
  const nombre = readlineSync.question(`Nombre del empleado ${i}: `);
  let salario;
  while (true) {
    salario = +readlineSync.question(`Salario del empleado ${i}: `);
    if (!isNaN(salario) || salario > 0) {
      break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
  }

  let estrato;
  while (true) {
    estrato = +readlineSync.question(`Estrato del empleado ${i} (1, 2 o 3): `);
    if (!isNaN(estrato) && estrato > 0 && estrato < 4) {
      break;
    }
    console.error('Ingrese alguna de las opciones válidas. Inténtelo nuevamente.');
  }

  const sector = readlineSync.question(`Sector del empleado ${i} (rural o urbano): `);
  const genero = readlineSync.question(`Sexo del empleado ${i} (m o f): `);

  let hijosPrimaria;
  while (true) {
    hijosPrimaria = +readlineSync.question("Hijos en primaria: ");
    if (!isNaN(hijosPrimaria) && hijosPrimaria >= 0) {
      break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
  }

  let hijosSecundaria;
  while (true) {
    hijosSecundaria = +readlineSync.question("Hijos en secundaria: ");
    if (!isNaN(hijosSecundaria) && hijosSecundaria >= 0) {
      break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
  }

  let hijosUniversidad;
  while (true) {
    hijosUniversidad = +readlineSync.question("Hijos en universidad: ");
    if (!isNaN(hijosUniversidad) && hijosUniversidad >= 0) {
      break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
  }

  const empleado = new Empleado(nombre, salario, estrato, sector, genero, hijosPrimaria, hijosSecundaria, hijosUniversidad);
  empleados.push(empleado);

  costoNominaTotal += empleado.getCosto();
  if (genero === '') {
    costoNominaHombres += empleado.getCosto();
  } else {
    costoNominaMujeres += empleado.getCosto();
  }

  const costoEmpleado = empleado.getCosto();
  if (costoEmpleado > maxCostoEmpleado) {
    maxCostoEmpleado = costoEmpleado;
  }

  const subsidio = empleado.calcularSubsidio(tasasEstrato, tasasSector, subsidiosHijos);
  costoSubsidioSecundaria += subsidio * hijosSecundaria;
  costoPasajesExtranjeros += 0; // You didn't specify how to calculate this
}

console.log("Nómina total:", costoNominaTotal);
console.log("Nómina hombres:", costoNominaHombres);
console.log("Nómina mujeres:", costoNominaMujeres);
console.log("Empleado con mayor costo:", empleados.find(empleado => empleado.getCosto() === maxCostoEmpleado));
console.log("Costo subsidio secundaria:", costoSubsidioSecundaria);
console.log("Costo pasajes extranjeros:", costoPasajesExtranjeros);
console.log("Porcentaje subsidio secundaria:", costoSubsidioSecundaria / costoNominaTotal * 100);
console.log("Porcentaje pasajes extranjeros:", costoPasajesExtranjeros / costoNominaTotal * 100);
console.log("Empleados por sector:", empleados.reduce((acc, empleado) => {
  if (empleado.sector === "rural") {
    acc.rural += 1;
  } else {
    acc.urbano += 1;
  }
  return acc;
}, { rural: 0, urbano: 0 }));
console.log("Empleados por estrato:", empleados.reduce((acc, empleado) => {
  acc[empleado.estrato] += 1;
  return acc;
}, [0, 0, 0]));
console.log("Empleados por sexo:", empleados.reduce((acc, empleado) => {
  if (empleado.genero === '') {
    acc.hombres += 1;
  } else {
    acc.mujeres += 1;
  }
  return acc;
}, { hombres: 0, mujeres: 0 }));
console.log("Empleados por edad:", "No se puede calcular la edad ya que no se proporcionó la fecha de nacimiento");
console.log("Empleados por cantidad de hijos:", empleados.reduce((acc, empleado) => {
  const hijos = empleado.hijos.primaria + empleado.hijos.secundaria + empleado.hijos.universidad;
  if (hijos === 0) {
    acc.sinHijos += 1;
  } else if (hijos === 1) {
    acc.unoHijo += 1;
  } else if (hijos === 2) {
    acc.dosHijos += 1;
  } else {
    acc.masDeDosHijos += 1;
  }
  return acc;
}, { sinHijos: 0, unoHijo: 0, dosHijos: 0, masDeDosHijos: 0 }));

process.exit();