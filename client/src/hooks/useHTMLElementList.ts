import React from "react";

export interface UseHTMLElementListReturnType {
  /** Registration function. Returns a ref callback that will add any element
   * that calls it to the list. Should be provided as props like:
   *
   * <MyComponent {...register("MyComponentId")} />
   */
  register: (elementId: string) => {
    ref: (elementRef: HTMLElement | null) => void;
  };
  /**
   * List of tracked HTML elements. The list reference will be stable between
   * renders. The reference will only change when one of the internal refs changes
   * or a new element is registered.
   */
  data: HTMLElement[];
}

/**
 * Utility hook for maintaining a list of references to HTMLElements.
 *
 * @returns a register callback and a list of HTMLElements
 */
export default function useHTMLElementList(): UseHTMLElementListReturnType {
  const [idToElementMap, setIdToElementMap] = React.useState<
    Record<string, HTMLElement>
  >({});

  const refCallback = React.useCallback(
    (elementId: string, ref: HTMLElement | null) => {
      if (!ref) return;

      setIdToElementMap((prev) => {
        if (prev[elementId] === ref) return prev;

        // We have a new or updated ref for this element id,
        // update the map and rerender!
        return { ...prev, [elementId]: ref };
      });
    },
    []
  );

  const register = React.useCallback(
    (elementId: string) => {
      return {
        ref: (elementRef: HTMLElement | null) =>
          refCallback(elementId, elementRef),
      };
    },
    [refCallback]
  );

  const data = React.useMemo(
    () => Object.values(idToElementMap),
    [idToElementMap]
  );

  return {
    register,
    data,
  };
}
