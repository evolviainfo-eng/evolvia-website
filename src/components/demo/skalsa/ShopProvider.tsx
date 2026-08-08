"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CATALOG, FREE_SHIPPING_FROM, SHIPPING_FEE } from "./data";

export interface CartLine {
  id: string;
  qty: number;
}

interface ShopValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  /** Kiek trūksta iki nemokamo pristatymo (0, jei jau nemokamas). */
  missing: number;
  freeShipping: boolean;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  /** Relative change. Prefer this over setQty for +/- controls — see below. */
  bump: (id: string, delta: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const ShopContext = createContext<ShopValue | null>(null);

export function useShop(): ShopValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop: trūksta <ShopProvider>");
  return ctx;
}

/** Visa parduotuvės būsena — viename kliento komponente.
 *
 *  Jokio localStorage ir jokio backendo: tai demonstracinė parduotuvė, todėl
 *  krepšelis gyvuoja tik tol, kol atidarytas puslapis. Sekcijos ateina kaip
 *  serveryje atvaizduoti `children`, tad turinys lieka HTML'e. Antraštė ir
 *  stalčius įdedami puslapyje, o ne čia — kad išvengtume ciklinio importo.
 */
export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((id: string) => {
    if (!CATALOG[id]) return;
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (!found) return [...prev, { id, qty: 1 }];
      return prev.map((l) =>
        l.id === id ? { ...l, qty: Math.min(l.qty + 1, 99) } : l,
      );
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 99) } : l)),
    );
  }, []);

  /* The +/- buttons must not compute the next quantity from the value they
     rendered with. Two clicks inside one React batch both read the same stale
     qty, so the second overwrites the first and the counter moves by one
     instead of two. Passing a delta and resolving it against `prev` makes each
     click independent of what was on screen when it happened. */
  const bump = useCallback((id: string, delta: number) => {
    setLines((prev) =>
      prev.flatMap((l) => {
        if (l.id !== id) return [l];
        const next = l.qty + delta;
        return next <= 0 ? [] : [{ ...l, qty: Math.min(next, 99) }];
      }),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const value = useMemo<ShopValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce(
      (sum, l) => sum + (CATALOG[l.id]?.price ?? 0) * l.qty,
      0,
    );
    const freeShipping = subtotal >= FREE_SHIPPING_FROM;
    const shipping = count === 0 || freeShipping ? 0 : SHIPPING_FEE;
    return {
      lines,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      missing: freeShipping ? 0 : FREE_SHIPPING_FROM - subtotal,
      freeShipping,
      add,
      setQty,
      bump,
      remove,
      clear,
      open,
      openCart,
      closeCart,
    };
  }, [lines, open, add, setQty, bump, remove, clear, openCart, closeCart]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
