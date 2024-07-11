import React from "react";
import { Box, Button, TextField, Paper } from "@mui/material";
import { useRef } from "react";
import { makeApiCall } from "../utils";
import type { Product } from "../models/models";

const Products: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewProduct = async (event: any, product: Product = "") => {
    try {
      await makeApiCall("product", "PUT", { name: product });
      alert("updated successfully ✅");
    } catch (e) {
      alert("update failed ❌");
    }
  };

  return (
    <React.Fragment>
      <h1>Products</h1>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            inputRef={inputRef}
            placeholder="enter product name"
          ></TextField>
          <Button
            variant="contained"
            href="/"
            onClick={(e) => addNewProduct(e, inputRef.current?.value)}
          >
            Save & Return
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "grey" }}
            href="/"
          >
            Go back
          </Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default Products;
