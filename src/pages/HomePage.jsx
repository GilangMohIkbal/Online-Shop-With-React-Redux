import { ProductCard } from "../components/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const fetchProduct = async () => {
    setProductIsLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductIsLoading(false);
    }
  };

  const productList = products.map((item) => (
    <ProductCard
      key={item.id}
      id={item.id}
      image={item.image}
      product={item.name}
      price={item.price}
      stock={item.stock}
    />
  ));
  // fetch products data once when, home page is first mounted
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
            Become a trend-setter with us.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            FastCampusCommerce provides you with the fitnest clothings and
            ensures your confident throughout your days.
          </p>
        </div>
        {productIsLoading ? (
          <p>Loading</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">{productList}</div>
        )}
      </main>
    </>
  );
};

export default HomePage;
