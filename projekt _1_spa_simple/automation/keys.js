const path = require('path')
const { stat } = require('fs').promises
const { SERVER_PATH } = require('./config.js')
const { log } = require('./common.js')

const keyPath = path.resolve(SERVER_PATH, 'key.pem')
const certPath = path.resolve(SERVER_PATH, 'cert.pem')

async function existsCertificate () {
  return Promise.all([
    stat(keyPath),
    stat(certPath)
  ])
}

async function createSelfSignedCertificate () {
  log('CERTIFICATE', 'creating certificates')
  console.log('Either upload your own "key.pem" and "cert.pem" files to "server" directory,')
  console.log('or execute these commands to create self-signed certificates in "server" directory:')
  const commands = [
    `cd ./server`,
    `openssl genrsa -out key.pem`,
    `openssl req -new -key key.pem -out csr.pem`,
    `openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`,
    `rm csr.pem`
  ]
  console.log(commands.map((line) => `  ${line}`).join('\n'))
}

async function ensureCertificates () {
  log('CERTIFICATE', 'check if certificates exist')
  try {
    await existsCertificate()
    log('CERTIFICATE', 'certificates do exist')
    return true
  } catch (error) {
    log('CERTIFICATE', 'certificates are missing')
    await createSelfSignedCertificate()
    return false
  }
}

module.exports = {
  ensureCertificates,
  keyPath,
  certPath
}
