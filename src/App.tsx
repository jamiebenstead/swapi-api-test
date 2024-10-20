import React from "react";
import { BasketProvider } from "./contexts/BasketContext";
import ProductList from "./components/ProductList";
import AppHeader from "./components/Header";
import "./custom.scss";

function App() {
  return (
    <BasketProvider>
      <AppHeader />
      <ProductList />
    </BasketProvider>
  );
}

export default App;
