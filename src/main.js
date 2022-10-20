import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(tipo) {
  const colors = {
    visa: ["#007A87", "#9EB21F"],
    mastercard: ["#C64F47", "#DF6F29"],
    elo: ["#2B29B1", "#79180B"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", colors[tipo][0])
  ccBgColor02.setAttribute("fill", colors[tipo][1])
  ccLogo.setAttribute("src", `cc-${tipo}.svg`)
}
globalThis.setCardType = setCardType

//CVC
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMask = IMask(securityCode, securityCodePattern)

//Expiração
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMask = IMask(expirationDate, expirationDatePattern)

//Numero do Cartão
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtipo: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardtipo: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5|6)\d{0,15}/,
      cardtipo: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtipo: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundedMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundedMask
  },
}
const cardNumberMask = IMask(cardNumber, cardNumberPattern)

//BUTTON
const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão Adicionado")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "NOME DO CLIENTE" : cardHolder.value
})

securityCodeMask.on("accept", () => {
  updateSecurityCode(securityCodeMask.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMask.on("accept", () => {
  const cardType = cardNumberMask.masked.currentMask.cardtipo
  setCardType(cardType)
  updateNumberCard(cardNumberMask.value)
})

function updateNumberCard(numbers) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = numbers.length === 0 ? "1234 5678 9012 3456" : numbers
}

expirationDateMask.on("accept", () => {
  updateExpirationDate(expirationDateMask.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = date.length === 0 ? "01/32" : date
}
