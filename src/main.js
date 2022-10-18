import "./css/index.css"

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
setCardType("elo")
