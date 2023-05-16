import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  pBelAddQuoteInfo,
  selectPBelFlowQuoteInfo,
  selectPBelFlowSelectedData,
} from "../../reduxToolkit/pBel/pBelFlowSlice";
import { API_PBEL_QUOTE, API_P_BEL_COVERAGE_TYPES } from "../../utils/apiUrls";
import useDataCollection from "../../hooks/useDataCollection";
import { clientApi } from "../../utils/clientApi";
import { MUST_QUOTE_PREFIX, QUOTATION_PREFIX } from "../../utils/constants";
import Spinner from "../../utils/Spinner";
import QuoteInfo from "./QuoteInfo";

function Quote() {
  const [loadingCoverageTypes, coverageTypes] = useDataCollection(
    API_P_BEL_COVERAGE_TYPES
  );
  const basicData = useSelector(selectPBelFlowSelectedData);
  const quoteInfo = useSelector(selectPBelFlowQuoteInfo);
  const dispatch = useDispatch();
  const [quoteInProgress, setQuoteInProgress] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current.click();
  }, []);

  useEffect(() => {
    const getQuote = async (coverageItem) => {
      const response = await clientApi(
        "post",
        API_PBEL_QUOTE,
        false,
        {},
        {
          planCobertura: coverageItem,
          tipoObjeto: basicData.pBelObjectType.item,
          valorObjeto: basicData.pBelCost,
          movilidad: basicData.pBelMobilityType.item,
        }
      );

      if (response.ok) {
        const quoteInfo = {
          [MUST_QUOTE_PREFIX + coverageItem]: false,
          [QUOTATION_PREFIX + coverageItem]: response.data,
        };
        dispatch(pBelAddQuoteInfo(quoteInfo));
      }
    };

    if (!loadingCoverageTypes && !quoteInProgress) {
      coverageTypes.forEach((coverageType) => {
        if (quoteInfo[MUST_QUOTE_PREFIX + coverageType.item]) {
          getQuote(coverageType.item);
        }
      });
      setQuoteInProgress(true);
    }
  }, [
    basicData,
    coverageTypes,
    dispatch,
    loadingCoverageTypes,
    quoteInfo,
    quoteInProgress,
  ]);

  return (
    <div className="surface-0">
      <a style={{ display: "none" }} href="#top" ref={topRef}>
        Link hidden
      </a>
      <div
        id="top"
        className="text-900 font-bold text-3xl mb-4 text-center text-primary"
      >
        PLANES DE COBERTURA
      </div>
      <div className="text-700 text-xl mb-4 text-center line-height-3">
        Elegí la cobertura que mejor se adapta a tus necesidades
      </div>
      <div className="grid grid-nogutter justify-content-center">
        {loadingCoverageTypes ? (
          <Spinner size="small" />
        ) : (
          <>
            {coverageTypes.map((coverageType) => {
              return (
                <QuoteInfo key={coverageType.id} coverageType={coverageType} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Quote;
