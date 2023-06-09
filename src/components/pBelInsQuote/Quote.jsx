import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  pBelAddQuoteInfo,
  selectPBelFlowQuoteInfo,
  selectPBelFlowSelectedData,
} from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { API_PBEL_QUOTE, API_P_BEL_COVERAGE_TYPES } from "../../utils/apiUrls";
import useDataCollection from "../../hooks/useDataCollection";
import { clientApi } from "../../utils/clientApi";
import { MUST_QUOTE_PREFIX, QUOTATION_PREFIX } from "../../utils/constants";
import Spinner from "../common/Spinner";
import QuoteInfo from "./QuoteInfo";

function Quote() {
  const [loadingCoverageTypes, coverageTypes] = useDataCollection(
    API_P_BEL_COVERAGE_TYPES
  );
  const selectedData = useSelector(selectPBelFlowSelectedData);
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
          tipoObjeto: selectedData.objectType.item,
          valorObjeto: selectedData.cost,
          movilidad: selectedData.mobilityType.item,
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
    selectedData,
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
      <div id="top" className="font-bold text-3xl mb-4 text-center title">
        PLANES DE COBERTURA
      </div>
      <div className="text-700 text-xl mb-4 text-center line-height-3">
        Elige la cobertura que mejor se adapta a tus necesidades
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
