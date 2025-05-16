import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "hooks/use-redux";
import { useCallback } from "react";
import { IProducts } from "store/types";

import * as Action from "store/actions";
import { addToCartCheckOut } from "utils/local-storage";
import { useRouter } from "next/navigation";
//------------------------------------------------------
type Props = {
  product: IProducts;
};
//------------------------------------------------------

export function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = useCallback(
    (id: string) => {
      dispatch(Action.fetchAddToCart({ id: id }));
    },
    [dispatch]
  );

  const handleBuyNow = useCallback(
    (id: string) => {
      const addSuccess = addToCartCheckOut([{ productId: id, quantity: 1 }]);
      if (addSuccess) {
        router.push("/check-out");
      }
    },
    [addToCartCheckOut, router]
  );

  return (
    <Card sx={{ margin: 2, height: "100%" }}>
      <CardMedia
        sx={{ minHeight: 200, objectFit: "cover" }}
        image={product.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          price : {product.price} THB
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant={"contained"}
          onClick={() => handleBuyNow(product.id)}
        >
          Buy Now
        </Button>
        <Button
          size="small"
          variant={"outlined"}
          onClick={() => handleAddToCart(product.id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
