// Importa el objeto 'network' desde hardhat, que contiene información sobre la red actual
const { network } = require("hardhat");

// Importa 'developmentChains' desde la configuración de hardhat-helper, que lista las cadenas de desarrollo
const { developmentChains } = require("../helper-hardhat-config");

// Importa la función 'verify' desde el archivo utils/verify para verificar contratos en Etherscan
const { verify } = require("../utils/verify");

// Carga las variables de entorno desde el archivo .env
require("dotenv").config();

// Exporta una función asíncrona para desplegar el contrato
module.exports = async ({ getNamedAccounts, deployments }) => {
  // Obtén las funciones 'deploy' y 'log' del objeto 'deployments'
  const { deploy, log } = deployments;

  // Obtén la cuenta 'deployer' de las cuentas nombradas
  const { deployer } = await getNamedAccounts();

  // Imprime una línea separadora en la consola para mayor claridad
  log("----------------------------------------------------");

  // Imprime un mensaje indicando que el contrato se está desplegando y esperando confirmaciones
  log("Desplegando Bank y esperando confirmaciones...");

  // Despliega el contrato 'Bank'
  const bank = await deploy("Bank", {
    from: deployer, // Cuenta desde la cual se despliega el contrato
    args: [], // Argumentos del constructor para el contrato (vacío en este caso)
    log: true, // Habilita los registros para este despliegue
    waitConfirmations: network.config.blockConfirmations || 1, // Número de confirmaciones de bloques a esperar
  });

  // Imprime la dirección del contrato desplegado en la consola
  log(`Bank desplegado en ${bank.address}`);

  // Verifica si la red no es una cadena de desarrollo y si se proporciona la clave API de Etherscan
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // Verifica el contrato en Etherscan
    await verify(bank.address, []);
  }
};

// Etiquetas del módulo para identificar y agrupar diferentes scripts de despliegue
module.exports.tags = ["all", "bank"];
