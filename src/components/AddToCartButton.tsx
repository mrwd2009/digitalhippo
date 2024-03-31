'use client';
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setisSuccess] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setisSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button onClick={() => {
      addItem(product)
      setisSuccess(true);
    }} size="lg" className="w-full">
      { isSuccess ? 'Added!' : 'Add to cart' }
    </Button>
  )
}

export default AddToCartButton;