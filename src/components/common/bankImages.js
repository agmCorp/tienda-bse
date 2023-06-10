import bancoRepublica from "../../images/banco-republica.png";
import bandes from "../../images/bandes.png";
import itau from "../../images/itau.png";
import scotiabank from "../../images/scotiabank.png";
import santander from "../../images/santander.png";
import bbva from "../../images/bbva.png";
import hsbc from "../../images/hsbc.png";
import banqueHeritage from "../../images/banque-heritage.png";
import banred from "../../images/banred.png";
import financialInstitution from "../../images/financial-institution.png";

const bankImages = [
  {
    code: "1",
    img: bancoRepublica,
  },
  {
    code: "10",
    img: bandes,
  },
  {
    code: "13",
    img: itau,
  },
  {
    code: "28",
    img: scotiabank,
  },
  {
    code: "37",
    img: santander,
  },
  {
    code: "53",
    img: bbva,
  },
  {
    code: "57",
    img: hsbc,
  },
  {
    code: "62",
    img: banqueHeritage,
  },
  {
    code: "BANRED",
    img: banred,
  },
];

const getBankImage = (code) => {
  const strCode = String(code);
  const bank = bankImages.find((element) => element.code === strCode);
  return bank ? bank.img : financialInstitution;
};

export { getBankImage };
