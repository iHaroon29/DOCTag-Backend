var QRCode = require('qrcode')
const crypto = require('crypto')

const qrCodeSequenceGeneration = async ({
  applicantName,
  applicantEmail,
  applicantPhoneNumber,
}) => {
  return crypto
    .createHash('sha256')
    .update(applicantName + applicantEmail + `${applicantPhoneNumber}`)
    .digest('hex')
}

const qrCodeImageGenerator = async (uniqueSequence) => {
  let response = await QRCode.toDataURL(uniqueSequence)
  return response
}

module.exports = { qrCodeSequenceGeneration, qrCodeImageGenerator }
