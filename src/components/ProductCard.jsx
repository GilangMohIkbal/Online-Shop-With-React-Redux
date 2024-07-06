import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";
import { fetchCart } from "@/services/cartService";

// eslint-disable-next-line react/prop-types
export const ProductCard = ({ image, product, stock, price, id }) => {
  const [quantity, setQuantity] = useState(0);
  const userSelector = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const fetchCart = async () => {
  //   try {
  //     const cartResponse = await axiosInstance.get("/carts", {
  //       params: {
  //         userId: userSelector.id,
  //         _embed: "product",
  //       },
  //     });
  //     console.log(cartResponse.data);
  //     dispatch({
  //       type: "CART_GET",
  //       payload: cartResponse.data,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addToCart = async () => {
    if (!userSelector.id) {
      alert("please login first");
      return;
    }
    try {
      const cartResponse = await axiosInstance.get("/carts", {
        params: {
          userId: userSelector.id,
          _embed: "product",
        },
      });
      const existingProduct = cartResponse.data.find(
        (cart) => cart.productId == id
      );
      if (!existingProduct) {
        await axiosInstance.post("/carts", {
          userId: userSelector.id,
          productId: id,
          quantity,
        });
        setQuantity(0);
      } else {
        if (
          existingProduct.quantity + quantity >
          existingProduct.product.stock
        ) {
          alert("quantity is over the stock");
          return;
        }
        await axiosInstance.patch("/carts/" + existingProduct.id, {
          quantity: existingProduct.quantity + quantity,
        });
        setQuantity(0);
      }

      alert("Item added to cart");
      fetchCart(useSelector.id);
    } catch (error) {
      console.log(error);
    }
  };
  // // note : Mount
  // useEffect(() => {
  //   alert("component did mount");
  // }, []);

  // // note : update -> akan dijalankan saat proses mount juga
  // useEffect(() => {
  //   alert("component did update");
  // }, [quantity]);

  // useEffect(() => {
  //   // note : unMount
  //   return () => {
  //     alert("component un mount");
  //   };
  // }, []);
  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <Link
        to={"/product/" + id}
        className="aspect-square w-full overflow-hidden "
      >
        <img className="w-full" src={image} alt="product" />
      </Link>
      <Link to={"/product/" + id}>
        <p className="text-md">{product}</p>
        <p className="text-xl font-semibold">
          Rp. {price.toLocaleString("id-ID")}
        </p>
        <p className=" text-muted-foreground text-sm">In stock {stock}</p>
      </Link>
      {/* button quntity */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
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
            disabled={quantity >= stock}
            size="icon"
            variant="ghost"
            onClick={() => quantity < stock && setQuantity(quantity + 1)}
          >
            <IoIosAdd className="W-6 H-6" />
          </Button>
        </div>
        {/* button add to cart */}
        <Button
          disabled={!quantity || !stock}
          className="w-full"
          onClick={addToCart}
        >
          {!stock ? "Out of stock" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};
