import { useEffect } from "react";

function useFocusController(elements, errorKeys) {
  useEffect(() => {
    // Finds the first occurrence of element from elements in errorKeys
    const result = elements.findIndex((element) =>
      errorKeys.includes(element.id)
    );

    // Element that currently has focus
    const activeElement = document.activeElement.name;

    if (!activeElement && result >= 0) {
      elements[result].focus();
    }
  }, [elements, errorKeys]);
}

export default useFocusController;
