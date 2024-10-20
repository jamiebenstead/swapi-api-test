import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import AppHeader from "./components/Header";
import ProductList from "./components/ProductList";
import ProductCard from "./components/ProductCard";
import { BasketProvider } from "./contexts/BasketContext";
import { Starship } from "./types/Starship";

const mockProduct: Starship = {
  MGLT: "10 MGLT",
  cargo_capacity: "1000000000000",
  consumables: "3 years",
  cost_in_credits: "1000000000000",
  created: "2014-12-10T16:36:50.509000Z",
  crew: "342953",
  edited: "2014-12-10T16:36:50.509000Z",
  hyperdrive_rating: "4.0",
  length: "120000",
  manufacturer:
    "Imperial Department of Military Research, Sienar Fleet Systems",
  max_atmosphering_speed: "n/a",
  model: "DS-1 Orbital Battle Station",
  name: "Death Star",
  passengers: "843342",
  films: ["https://swapi.dev/api/films/1/"],
  pilots: [],
  starship_class: "Deep Space Mobile Battlestation",
  url: "https://swapi.dev/api/starships/9/",
};

afterAll(() => {
  jest.resetAllMocks();
});

describe("AppHeader Component", () => {
  test("renders AppHeader", () => {
    render(<App />);
    expect(screen.getByLabelText("SWAPI API Test Header")).toBeInTheDocument();
  });

  test("displays basket text", () => {
    render(
      <BasketProvider>
        <AppHeader />
      </BasketProvider>
    );
    expect(screen.getByText(/basket:/i)).toBeInTheDocument();
  });
});

describe("ProductList Component", () => {
  test("displays loading message initially", () => {
    render(<ProductList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

describe("ProductCard Component", () => {
  test("renders product information correctly", () => {
    render(
      <BasketProvider>
        <ProductCard key={1} product={mockProduct} />
      </BasketProvider>
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.model)).toBeInTheDocument();
    expect(screen.getByText(/passengers/i)).toHaveTextContent(
      mockProduct.passengers
    );
  });

  test("adds item to basket and shows notification", () => {
    render(
      <BasketProvider>
        <ProductCard key={1} product={mockProduct} />
      </BasketProvider>
    );
    const addButton = screen.getByRole("button", { name: /add to basket/i });
    fireEvent.click(addButton);
    expect(screen.getByText(/item added to basket/i)).toBeInTheDocument();
  });
});
