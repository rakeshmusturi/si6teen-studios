"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

/*
 Cart item shape:
 { variantId, slug, name, label, image, unitPaise, qty }
 unitPaise is for display only. The server recalculates prices at checkout.
*/
const MAX_QTY = 10;
const KEY = "s6_cart_v1";

function reducer(state, a) {
  switch (a.type) {
    case "load":
      return a.items;
    case "add": {
      const found = state.find((i) => i.variantId === a.item.variantId);
      if (found) {
        return state.map((i) =>
          i.variantId === a.item.variantId
            ? { ...i, qty: Math.min(MAX_QTY, i.qty + a.item.qty) }
            : i,
        );
      }
      return [...state, { ...a.item, qty: Math.min(MAX_QTY, a.item.qty) }];
    }
    case "setQty":
      return a.qty <= 0
        ? state.filter((i) => i.variantId !== a.variantId)
        : state.map((i) =>
            i.variantId === a.variantId ? { ...i, qty: Math.min(MAX_QTY, a.qty) } : i,
          );
    case "remove":
      return state.filter((i) => i.variantId !== a.variantId);
    case "clear":
      return [];
    default:
      return state;
  }
}

const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false); // false until localStorage is read
  const [open, setOpen] = useState(false); // cart drawer

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "load", items: JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const value = useMemo(
    () => ({
      items,
      ready,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotalPaise: items.reduce((n, i) => n + i.qty * i.unitPaise, 0),
      add: (item) => dispatch({ type: "add", item }),
      setQty: (variantId, qty) => dispatch({ type: "setQty", variantId, qty }),
      remove: (variantId) => dispatch({ type: "remove", variantId }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [items, ready, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
