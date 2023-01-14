import React from "react";

export interface UseHTMLElementListReturnType {
  /**
   *
   * Registration function.
   * @param elementId unique id for the HTML element
   * @returns props to be added to the component you'd
   * like to register. Should be spread alongside other component props like:
   *
   * `<MyComponent randomProp="foo" {...register("MyComponentId")} />`
   */
  register: (elementId: string) => {
    id: string;
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
 * Utility hook for maintaining a list of references to HTMLElements. Useful
 * for maintaining an arbitrary number of element refs, which can be difficult
 * to do with `React.useState`
 *
 * @returns a registration function and the list of registered HTMLElement refs
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
        id: elementId,
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
