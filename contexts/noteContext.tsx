import { createContext, useContext, useState, ReactNode } from "react";

type NoteContextType = {
  note: string;
  setNote: (note: string) => void;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export function NoteProvider({ children }: { children: ReactNode }) {
  const [note, setNote] = useState("");

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNote() {
  const context = useContext(NoteContext);

  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }

  return context;
}
