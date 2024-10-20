import React, { createContext, useContext, useState } from "react";

interface BasketContextType {
  itemCount: number;
  addToBasket: (quantity: number) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [itemCount, setItemCount] = useState<number>(0);

  const addToBasket = (quantity: number) => {
    setItemCount((prevCount) => prevCount + quantity);
  };

  return (
    <BasketContext.Provider value={{ itemCount, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
