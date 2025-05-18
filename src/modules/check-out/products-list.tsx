import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { IProductsCart } from "store/types";

type Props = {
  product: IProductsCart;
};

const ProductsList = ({ product }: Props) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        <img
          loading="lazy"
          style={{
            width: "100px",
            height: "80px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          src={product.image}
        />
        <Stack direction={"column"}>
          <Typography variant={"body1"} fontWeight={600}>
            {product.name}
          </Typography>
          <Typography variant={"body1"}>{product.description}</Typography>
          <Box>
            <Chip
              label={product.category}
              variant="outlined"
              color="primary"
              size="small"
            />
          </Box>
        </Stack>
      </Stack>
      <Typography variant={"body1"}>
        {product.quantity} x {product.price.toLocaleString()} THB
      </Typography>
    </Stack>
  );
};

export default ProductsList;
