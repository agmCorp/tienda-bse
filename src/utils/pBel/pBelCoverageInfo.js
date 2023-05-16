import coveragePBel1 from "../../images/pBel1.png";
import coveragePBel2 from "../../images/pBel2.png";

function getPBelCoverageInfo(coverageItem) {
  const coverageInfo = [
    {
      id: 1,
      item: "6", // Theft and fire
      planDescription: (
        <img
          src={coveragePBel1}
          className="border-round w-full h-full"
          alt="Todo riesgo"
        />
      ),
      buttonType: "p-button-outlined",
      isPopular: false,
      benefits: [
        {
          id: 1,
          checkColor: "text-primary",
          benefit: <span>Contratación inmediata</span>,
        },
        {
          id: 2,
          checkColor: "text-primary",
          benefit: <span>Denuncia de siniestros 24/7</span>,
        },
        {
          id: 3,
          checkColor: "text-primary",
          benefit: <span>Pérdida total por robo directo o en domicilio</span>,
        },
        {
          id: 4,
          checkColor: "text-primary",
          benefit: <span>Daños por la acción directa del fuego</span>,
        },
        {
          id: 5,
          checkColor: "text-primary",
          benefit: <span>Daños causados por calor excesivo</span>,
        },
      ],
    },
    {
      id: 2,
      item: "4", // All risk
      planDescription: (
        <img
          src={coveragePBel2}
          className="border-round w-full h-full"
          alt="Hurto e incendio"
        />
      ),
      buttonType: "",
      isPopular: true,
      benefits: [
        {
          id: 1,
          checkColor: "text-primary",
          benefit: <span>Contratación inmediata</span>,
        },
        {
          id: 2,
          checkColor: "text-primary",
          benefit: <span>Denuncia de siniestros 24/7</span>,
        },
        {
          id: 3,
          checkColor: "text-primary",
          benefit: <span>Pérdida total por robo directo o en domicilio</span>,
        },
        {
          id: 4,
          checkColor: "text-primary",
          benefit: <span>Daños por la acción directa del fuego</span>,
        },
        {
          id: 5,
          checkColor: "text-primary",
          benefit: <span>Daños causados por calor excesivo</span>,
        },
        {
          id: 6,
          checkColor: "text-secondary",
          benefit: <span>Daño accidental</span>,
        },
        {
          id: 7,
          checkColor: "text-secondary",
          benefit: <span>Cobertura de infidelidad de dependientes</span>,
        },
      ],
    },
  ];

  return coverageInfo.find((element) => element.item === coverageItem);
}

export { getPBelCoverageInfo };
