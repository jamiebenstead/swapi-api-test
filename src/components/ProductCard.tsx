import React, { useEffect, useState } from "react";
import { Button, Heading, Tile } from "@carbon/react";
import { Starship } from "../types/Starship";
import { useBasket } from "../contexts/BasketContext";
import Notification from "./Notification";

interface ProductCardProps {
  key: number;
  product: Starship;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const { addToBasket } = useBasket();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Create a random number, so we can display a placeholder starship img for a bit of fun
    setRandomNumber(Math.floor(Math.random() * 7) + 1);
  }, []);

  const handleAddToBasket = () => {
    addToBasket(quantity);

    setShowNotification(true);

    // Needed to add this timeout to allow for adding the same item a second time
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <>
      <Notification
        show={showNotification}
        quantity={quantity}
        productName={product.name}
        onClose={() => setShowNotification(false)}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          height: "100%",
          padding: "1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Tile style={{ marginBottom: "1rem" }}>
          <div style={{ textAlign: "center", paddingBottom: "16px" }}>
            <Heading style={{ margin: "0.5rem 0" }}>{product.name}</Heading>
            <img
              height={"128px"}
              width={"128px"}
              src={`starship-${randomNumber}.png`}
              alt="Starship"
            />
            <p style={{ fontStyle: "italic", color: "#555" }}>
              {product.model}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Passengers: {product.passengers}</p>
            <p>Crew: {product.crew}</p>
            <p>
              Shown in{" "}
              <span style={{ fontWeight: "bold" }}>
                {product.films.length}{" "}
              </span>
              {product.films.length === 1 ? "film" : "films"}
            </p>
          </div>
        </Tile>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{
              width: "60px",
              marginRight: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              padding: "0.2rem",
            }}
          />
          <Button
            style={{
              padding: "0 1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleAddToBasket}
          >
            Add to Basket
          </Button>
        </div>
      </div>
    </>
  );
}
