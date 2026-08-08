"use client";

import { useSheet } from "@/lib/useSheet";

export { project } from "@/lib/spring";

/** The cart drawer's gesture: a panel on the right edge that leaves to the
 *  right. All of the physics now lives in `useSheet` — the nav menu needs the
 *  same spring on the vertical axis, and one hook drifting into two would be
 *  the start of the two feeling different. */
export function useSheetGesture(open: boolean, onDismiss: () => void) {
  const sheet = useSheet({ open, onDismiss, axis: "x", sign: 1 });
  // Keep the drawer's original names so its component reads as it did.
  return {
    x: sheet.offset,
    width: sheet.travel,
    measure: sheet.measure,
    onDragEnd: sheet.onDragEnd,
    reduce: sheet.reduce,
  };
}
