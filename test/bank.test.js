// Importando la función 'expect' de la librería 'chai' para hacer afirmaciones en las pruebas.
// 'chai' es una librería de afirmaciones que nos permite escribir pruebas de manera legible.
const { expect } = require("chai");

// Importando la librería 'ethers' de 'hardhat', que proporciona varias utilidades para interactuar con Ethereum.
// 'hardhat' es un entorno de desarrollo para compilar, desplegar, probar y depurar software de Ethereum.
const { ethers } = require("hardhat");

// Describiendo el conjunto de pruebas para el contrato 'Bank' usando la función 'describe' de Mocha (el marco de pruebas).
// La función 'describe' se utiliza para agrupar casos de prueba relacionados.
describe("Bank Contract", function () {
  // Declarar variables para mantener instancias del contrato y algunas cuentas de prueba.
  // 'let' declara una variable local con ámbito de bloque, opcionalmente inicializándola con un valor.
  let Bank; // Esto mantendrá la fábrica de contratos para el contrato Bank.
  let bank; // Esto mantendrá la instancia desplegada del contrato Bank.
  let addr1; // Esto mantendrá la primera cuenta de prueba.
  let addr2; // Esto mantendrá la segunda cuenta de prueba.

  // El 'beforeEach' hook se ejecuta antes de cada caso de prueba para configurar el entorno.
  // 'async' permite el uso de 'await' dentro de esta función para manejar operaciones asincrónicas.
  beforeEach(async function () {
    // Obtener la fábrica de contratos para el contrato 'Bank'.
    // 'ethers.getContractFactory' es una función que obtiene la ContractFactory para un contrato.
    Bank = await ethers.getContractFactory("Bank");

    // Obtener los firmantes (cuentas) del entorno de prueba.
    // 'ethers.getSigners' devuelve una matriz de objetos de cuenta para interactuar con la blockchain.
    [addr1, addr2] = await ethers.getSigners();

    // Desplegar una nueva instancia del contrato 'Bank' usando la fábrica de contratos.
    // 'Bank.deploy()' despliega una nueva instancia del contrato y devuelve un objeto de contrato.
    bank = await Bank.deploy();

    // Esperar hasta que el contrato esté desplegado.
    // 'bank.deployed()' espera a que la transacción de despliegue sea minada y el contrato esté disponible.
    await bank.deployed();
  });

  // Caso de prueba para asegurar que el contrato se despliegue correctamente y establezca al propietario.
  // 'it' se utiliza para definir un solo caso de prueba.
  it("should allow a user to add balance and update their balance", async function () {
    // Definir la cantidad a agregar como 1000.
    const addAmount = 1000;

    // Agregar balance a la cuenta 'addr1' y actualizar su saldo.
    await bank.connect(addr1).addBalance(addAmount);

    // Obtener el balance de 'addr1' después de agregar la cantidad.
    const balance = await bank.connect(addr1).getBalance();
    console.log(`Balance after adding ${addAmount}: ${balance.toString()}`); // Mostrar el balance en la consola.

    // Esperar que el balance sea igual a la cantidad agregada.
    expect(balance).to.equal(addAmount);
  });

  // Caso de prueba para retornar el balance correcto de un usuario.
  it("should return the correct balance for a user", async function () {
    // Definir la cantidad a agregar como 1000.
    const addAmount = 1000;

    // Agregar balance a la cuenta 'addr1'.
    await bank.connect(addr1).addBalance(addAmount);

    // Obtener el balance de 'addr1' después de agregar la cantidad.
    const balance = await bank.connect(addr1).getBalance();
    console.log(`Balance after adding ${addAmount}: ${balance.toString()}`); // Mostrar el balance en la consola.

    // Esperar que el balance sea igual a la cantidad agregada.
    expect(balance).to.equal(addAmount);
  });

  // Caso de prueba para permitir que un usuario transfiera balance a otro usuario.
  it("should allow a user to transfer balance to another user", async function () {
    // Definir la cantidad a agregar como 1000.
    const addAmount = 1000;

    // Definir la cantidad a transferir como 500.
    const transferAmount = 500;

    // Agregar balance a la cuenta 'addr1'.
    await bank.connect(addr1).addBalance(addAmount);
    console.log(
      `Balance of addr1 before transfer: ${await bank
        .connect(addr1)
        .getBalance()}`
    ); // Mostrar el balance antes de la transferencia.
    console.log(
      `Balance of addr2 before transfer: ${await bank
        .connect(addr2)
        .getBalance()}`
    ); // Mostrar el balance antes de la transferencia.

    // Transferir balance de 'addr1' a 'addr2'.
    await bank.connect(addr1).transfer(addr2.address, transferAmount);

    // Obtener los balances después de la transferencia.
    const balance1 = await bank.connect(addr1).getBalance();
    const balance2 = await bank.connect(addr2).getBalance();
    console.log(
      `Balance of addr1 after transferring ${transferAmount}: ${balance1.toString()}`
    ); // Mostrar el balance después de la transferencia.
    console.log(
      `Balance of addr2 after receiving ${transferAmount}: ${balance2.toString()}`
    ); // Mostrar el balance después de la transferencia.

    // Esperar que los balances sean correctos después de la transferencia.
    expect(balance1).to.equal(addAmount - transferAmount);
    expect(balance2).to.equal(transferAmount);
  });

  // Caso de prueba para emitir un evento Transfer en una transferencia exitosa.
  it("should emit a Transfer event on a successful transfer", async function () {
    // Definir la cantidad a agregar como 1000.
    const addAmount = 1000;

    // Definir la cantidad a transferir como 500.
    const transferAmount = 500;

    // Agregar balance a la cuenta 'addr1'.
    await bank.connect(addr1).addBalance(addAmount);

    // Esperar que la transferencia emita un evento 'Transfer' con los argumentos correctos.
    await expect(bank.connect(addr1).transfer(addr2.address, transferAmount))
      .to.emit(bank, "Transfer")
      .withArgs(addr1.address, addr2.address, transferAmount);
    console.log(
      `Transfer event should be emitted for ${transferAmount} from ${addr1.address} to ${addr2.address}`
    ); // Mostrar el evento de transferencia esperado.
  });

  // Caso de prueba para no permitir que un usuario transfiera más de su balance.
  it("should not allow a user to transfer more than their balance", async function () {
    // Definir la cantidad a agregar como 1000.
    const addAmount = 1000;

    // Definir la cantidad a transferir como 1500.
    const transferAmount = 1500;

    // Agregar balance a la cuenta 'addr1'.
    await bank.connect(addr1).addBalance(addAmount);

    // Esperar que la transferencia sea revertida con un mensaje de error debido a balance insuficiente.
    await expect(
      bank.connect(addr1).transfer(addr2.address, transferAmount)
    ).to.be.revertedWith("Insufficient balance");
    console.log(
      `Attempted to transfer ${transferAmount} from ${addr1.address} with balance ${addAmount}. Should fail.`
    ); // Mostrar el intento de transferencia fallida.
  });
});
