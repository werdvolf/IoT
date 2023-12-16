// const axios = require('axios/dist/browser/axios.cjs')
const server = 'http://localhost:8080'
// Function to perform Modbus read operation
async function performRead() {
  const readFunction = document.getElementById('readFunction').value
  const nodeIdsRead = document.getElementById('nodeIdsRead').value
  const addressRead = document.getElementById('addressRead').value
  const quantityRead = document.getElementById('quantityRead').value
  axios
    .post(`${server}/modbusRead`, {
      readFunction,
      nodeIdsRead,
      addressRead,
      quantityRead,
    })
    .then(function (response) {
      let data = `\n${readFunction} at address ${addressRead}: ${response.data.data}`
      appendToOutput(data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

async function performWrite() {
  const writeFunction = document.getElementById('writeFunction').value
  const nodeIdsWrite = document.getElementById('nodeIdsWrite').value
  const addressWrite = document.getElementById('addressWrite').value
  const valuesWrite = document.getElementById('valuesWrite').value
  axios
    .post(`${server}/modbusWrite`, {
      writeFunction,
      nodeIdsWrite,
      addressWrite,
      valuesWrite,
    })
    .then(function (response) {
      let data = `\n${writeFunction} at address ${addressWrite}: ${response.data.data}`
      appendToOutput(data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function appendToOutput(data) {
  const outputContainer = document.getElementById('output')
  const newLine = document.createElement('div')
  newLine.textContent = data
  outputContainer.appendChild(newLine)

  // Scroll to the bottom
  outputContainer.scrollTop = outputContainer.scrollHeight
}
