import { useClickOutside as _useClickOutside } from "@mantine/hooks";
import useHTMLElementList from "./useHTMLElementList";

/**
 * An ergonomic wrapper around Mantine's `useOutsideClick` hook.
 * Makes it easier to consider multiple nodes "internal".
 */
export default function useClickOutside(
  handler: () => void,
  events?: string[] | null | undefined
) {
  const { register, data: internalHTMLElements } = useHTMLElementList();

  _useClickOutside(handler, events, internalHTMLElements);

  return register;
}
