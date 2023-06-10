import visa from "../../images/visa.png";
import oca from "../../images/oca.png";
import financialInstitution from "../../images/financial-institution.png";

const creditCardImages = [
  {
    code: "1100",
    img: visa,
  },
  {
    code: "1108",
    img: oca,
  },
];

const getCreditCardImage = (code) => {
  const strCode = String(code);
  const creditCard = creditCardImages.find(
    (element) => element.code === strCode
  );
  return creditCard ? creditCard.img : financialInstitution;
};

export { getCreditCardImage };
