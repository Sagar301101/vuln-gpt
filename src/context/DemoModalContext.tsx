import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type DemoModalContext = { product?: string };

type DemoModalState = {
  isOpen: boolean;
  context: DemoModalContext;
  openDemoModal: (context?: DemoModalContext) => void;
  closeDemoModal: () => void;
};

const Ctx = createContext<DemoModalState | null>(null);

/** Provides a single shared "Schedule a free demo call" modal, openable from anywhere. */
export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<DemoModalContext>({});

  const openDemoModal = useCallback((ctx: DemoModalContext = {}) => {
    setContext(ctx);
    setIsOpen(true);
  }, []);
  const closeDemoModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, context, openDemoModal, closeDemoModal }),
    [isOpen, context, openDemoModal, closeDemoModal],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemoModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemoModal must be used within a DemoModalProvider");
  return ctx;
}
