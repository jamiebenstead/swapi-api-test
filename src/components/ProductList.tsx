import React, { useState, useEffect, useCallback } from "react";
import { Column, Grid, Pagination } from "@carbon/react";
import ProductCard from "./ProductCard";
import { Starship } from "../types/Starship";

export default function ProductList() {
  const [data, setData] = useState<Starship[]>([]);
  const [count, setCount] = useState<number>();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(
    async (url: string = "https://swapi.dev/api/starships") => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const jsonData = await response.json();
        setCount(jsonData.count);
        setData(jsonData.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number) => {
    const url = `https://swapi.dev/api/starships/?page=${page}`;
    setCurrentPage(page);
    fetchData(url);
  };

  if (loading) return <div className="status-message">Loading...</div>; // The force is slow...
  if (error) return <div className="status-message">Error: {error}</div>; // The force is not strong!

  return (
    <div>
      <div
        style={{
          paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingBottom: "50px",
        }}
      >
        <Grid>
          {data.map((product, index) => (
            <Column
              key={index}
              lg={8}
              md={8}
              sm={4}
              style={{ padding: "16px" }}
            >
              <ProductCard key={index} product={product} />
            </Column>
          ))}
        </Grid>
      </div>

      <div>
        <Pagination
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
          }}
          page={currentPage}
          totalItems={count}
          pageSizeInputDisabled={true}
          pageSizes={[10]}
          onChange={(pagination) => {
            handlePageChange(pagination.page);
          }}
        />
      </div>
    </div>
  );
}
