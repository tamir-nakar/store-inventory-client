// src/components/SimpleTable.tsx

import React from "react";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import CustomTable, { RowData } from "./table";
import ProductAdder from "./product_adder";
import { Button, Box } from "@mui/material";
import { makeApiCall } from "../utils";
const Container: React.FC = () => {
  useEffect(() => {
    async function fetchAllProducts() {
      return makeApiCall("product/all");
    }

    async function fetchAllInventory() {
      return makeApiCall("inventory");
    }

    async function fetchData() {
      try {
        console.log(
          "🌐 fetching product list for the select input and inventory list for table"
        );
        const [products, inventory] = await Promise.all([
          fetchAllProducts(),
          fetchAllInventory(),
        ]);
        setRows(inventory);
        setProducts(products.map((p: any) => p.name));
      } catch (e) {
        alert("The API is down at the moment, please try again later");
      }
    }

    fetchData();
  }, []);

  const handleQuantityChanged = (event: any) => {
    setCurrentQuantity(event.target.value);
  };

  const handleProductChanged = (event: any) => {
    setCurrentProduct(event.target.value);
  };

  const handleChangeQuantityBtnClicked = (event: any) => {
    console.log(`Item: ${currentProduct}, Quantity: ${currentQuantity}`);
    const isProductExistOnTable = rows.find(
      (row) => row.name === currentProduct
    );
    const isProductExistOnPendingTable = pendingRows.find(
      (row) => row.name === currentProduct
    );
    const newPendingRows = pendingRows.filter(
      (row) => row.name !== currentProduct
    );
    if (isProductExistOnTable) {
      const oldQuantity = isProductExistOnTable.quantity;
      const newRows = rows.filter((row) => row.name !== currentProduct);
      const newQuantity = Number(oldQuantity) + Number(currentQuantity);
      const updatedRow = {
        name: currentProduct,
        quantity: newQuantity > 0 ? newQuantity : 0,
      };
      setRows(newRows);
      setPendingRows([...newPendingRows, updatedRow]);
    } else {
      const newQuantity =
        Number(
          isProductExistOnPendingTable
            ? isProductExistOnPendingTable.quantity
            : 0
        ) + Number(currentQuantity);
      setPendingRows([
        ...newPendingRows,
        {
          name: currentProduct,
          quantity: newQuantity > 0 ? newQuantity : 0,
        },
      ]);
    }
  };

  const handleSaveBtnClicked = async () => {
    if (pendingRows.length) {
      console.log("saving");
      console.log(pendingRows);
      const res = await makeApiCall("inventory", "POST", pendingRows);
      setPendingRows([]);
      setRows(res);
    }
  };
  const [rows, setRows] = useState<RowData[]>([]);
  const [pendingRows, setPendingRows] = useState<RowData[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);
  const [currentProduct, setCurrentProduct] = useState<string>("");

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <ProductAdder
        items={products}
        quantity={currentQuantity}
        onQuantityChange={handleQuantityChanged}
        onClick={handleChangeQuantityBtnClicked}
        onProductChange={handleProductChanged}
        selectedProduct={currentProduct}
      />
      <CustomTable
        headers={["Product Name", "Quantity"]}
        rows={rows}
        pendingRows={pendingRows}
      />
      <Box display="flex" alignItems="center" gap={1}>
        <Button variant="contained" onClick={handleSaveBtnClicked}>
          SAVE 💾
        </Button>
        <Button
          variant="contained"
          href="/products"
          style={{ backgroundColor: "green" }}
        >
          GO TO PRODUCTS PAGE
        </Button>
      </Box>
    </Paper>
  );
};

export default Container;
