var QRCode = require('qrcode')
const crypto = require('crypto')

const qrCodeSequenceGeneration = async ({
  vehicleNumber,
  vehicleOwnerName,
  vehicleOwnerEmail,
  vehicleOwnerPhoneNumber,
}) => {
  return crypto
    .createHash('sha256')
    .update(
      vehicleNumber +
        vehicleOwnerName +
        vehicleOwnerEmail +
        `${vehicleOwnerPhoneNumber}`
    )
    .digest('hex')
}

const qrCodeImageGenerator = async (uniqueSequence, userName) => {
  let a = { uniqueSequence, userName }
  let response = await QRCode.toDataURL(JSON.stringify(a))
  return response
}

module.exports = { qrCodeSequenceGeneration, qrCodeImageGenerator }
