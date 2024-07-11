// src/components/ButtonGroup.jsx

import React from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

interface ProductAdderProps {
  items: string[];
  quantity: number;
  selectedProduct: string;
  onQuantityChange: (event: any) => void;
  onProductChange: (event: any) => void;
  onClick: (event: any) => void;
}

const ProductAdder: React.FC<ProductAdderProps> = ({
  items = [],
  selectedProduct,
  onQuantityChange,
  onClick,
  onProductChange,
  quantity = 0,
}) => {


  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Select
        value={selectedProduct}
        onChange={onProductChange}
        displayEmpty
        variant="outlined"
      >
        <MenuItem value="" disabled>
          Select an item
        </MenuItem>
        {items.map((item, idx) => (
          <MenuItem key={idx} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={onQuantityChange}
        variant="outlined"
      />
      <Button variant="contained" onClick={onClick} disabled={!selectedProduct}>
        +/-
      </Button>
    </Box>
  );
};

export default ProductAdder;
