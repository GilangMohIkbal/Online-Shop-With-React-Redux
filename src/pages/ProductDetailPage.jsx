import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(0);

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    image: "",
    stock: 0,
  });
  const [productIsLoading, setProductIsLoading] = useState(true);
  const params = useParams();

  const fetchProduct = async () => {
    try {
      setProductIsLoading(true);
      const response = await axiosInstance.get(`/products/` + params.productId);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <main className="min-h-screen max-w-screen-lg mx-auto mt-8 px-4">
      <div className="grid grid-cols-2 gap-8">
        {productIsLoading ? (
          <Skeleton className="w-full h-[582px]" />
        ) : (
          <img src={product.image} alt={product.name} className="w-full" />
        )}

        <div className="flex flex-col gap-1 justify-center">
          {productIsLoading ? (
            <Skeleton className="w-[250px] h-[32px]" />
          ) : (
            <h1 className="text-xl ">{product.name}</h1>
          )}

          {productIsLoading ? (
            <Skeleton className="w-[350px] h-[48px]" />
          ) : (
            <h3 className="text-3xl font-bold">
              Rp {product.price.toLocaleString("id-ID")}
            </h3>
          )}

          {productIsLoading ? (
            <Skeleton className="w-[350px] h-[120px] mt-4" />
          ) : (
            <p className="text-sm text-muted-foreground mt-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
              corporis saepe blanditiis optio rem? Cum quibusdam recusandae
              perferendis sint totam officiis vero quaerat sequi voluptate
              deleniti sapiente ipsam possimus animi enim obcaecati.
            </p>
          )}

          <div className="flex items-center gap-8 mt-6">
            <Button
              disabled={quantity <= 0}
              size="icon"
              variant="ghost"
              onClick={() => quantity > 0 && setQuantity(quantity - 1)}
            >
              <IoIosRemove className="H-6 W-6" />
            </Button>
            <p className="text-lg fonbt-bold">{quantity}</p>
            <Button
              disabled={quantity >= product.stock}
              size="icon"
              variant="ghost"
              onClick={() =>
                quantity < product.stock && setQuantity(quantity + 1)
              }
            >
              <IoIosAdd className="W-6 H-6" />
            </Button>
          </div>
          <div className="flex items-center mt-8 gap-4">
            <Button className="w-full" size="lg">
              Add to cart
            </Button>
            <Button className="" size="icon" variant="ghost">
              <IoHeartOutline className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
