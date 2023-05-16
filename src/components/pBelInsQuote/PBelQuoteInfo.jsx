import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";

import { MUST_QUOTE_PREFIX, QUOTATION_PREFIX } from "../../utils/constants";
import { getPBelCoverageInfo } from "../../utils/pBel/pBelCoverageInfo";
import { pBelFlowStepCompletedThunk } from "../../reduxToolkit/pBel/pBelFlowSlice";
import recommended from "../../images/recommended.png";
import Spinner from "../../utils/Spinner";
import "./PBelQuoteInfo.css";

function PBelQuoteInfo({ coverageType }) {
  const mustQuote = useSelector(
    (state) => state.pBelFlow.quoteInfo[MUST_QUOTE_PREFIX + coverageType.item]
  );
  const insurance = useSelector(
    (state) => state.pBelFlow.quoteInfo[QUOTATION_PREFIX + coverageType.item]
  );
  const dispatch = useDispatch();

  const coverageItem = getPBelCoverageInfo(coverageType.item);

  const handleClick = () => {
    dispatch(pBelFlowStepCompletedThunk({ insurance }));
  };

  return (
    <>
      {mustQuote ? (
        <Spinner size="medium" />
      ) : (
        <div id="content" className="col-12 md:col-6">
          <div className="md:px-3 py-3 h-full">
            <div className="shadow-4 p-3 flex flex-column border-round border-primary border-2 bg-card">
              {coverageItem.isPopular && (
                <>
                  <div className="bg-primary font-bold text-sm inline-block p-2 mb-3 text-center m-auto w-7 md:w-6 popular">
                    POPULAR
                  </div>
                  <img
                    className="recomended w-4rem md:w-6rem"
                    src={recommended}
                    alt="recomendado"
                  />
                </>
              )}
              <div className="font-bold text-2xl mb-2 text-primary text-center">
                {coverageType.label}
              </div>
              <div>{coverageItem.planDescription}</div>
              <hr className="my-3 mx-0 border-top-1 border-bottom-none border-400 border-primary" />
              <div className="flex align-items-center m-auto">
                <span className="font-bold text-2xl text-primary">
                  {`${insurance.simboloMoneda} ${parseFloat(
                    insurance.premioFacturar
                  ).toLocaleString("es-ES", {
                    style: "decimal",
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}`}
                </span>
                <span className="ml-2 text-sm text-600">total (imp. inc.)</span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-bottom-none border-400 border-primary" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                {coverageItem.benefits.map((benefit) => {
                  return (
                    <li
                      key={benefit.id}
                      className="flex align-items-center mb-3"
                    >
                      <i
                        className={`pi pi-check-circle ${benefit.checkColor} mr-2`}
                      ></i>
                      {benefit.benefit}
                    </li>
                  );
                })}
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-400 border-primary" />
              <Button
                label="Contratar"
                className={`p-3 w-full ${coverageItem.buttonType} tienda-button`}
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PBelQuoteInfo;
