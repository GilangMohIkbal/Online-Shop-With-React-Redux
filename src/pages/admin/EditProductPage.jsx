import { ProductForm } from "@/components/forms/ProductForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    image: "",
    stock: 0,
  });
  const params = useParams();
  const navigate = useNavigate();
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/` + params.productId);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleEditProduct = async (values) => {
    console.log("val", values);
    try {
      await axiosInstance.patch("/products/" + params.productId, values);
      console.log(values);
      alert("product edited");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout title="Edit Product" description="Editing Product">
      {product.id && (
        <ProductForm
          onSubmit={handleEditProduct}
          cardTitle={"Edit Product " + product.name}
          defaultName={product.name}
          defaultPrice={product.price}
          defaultStock={product.stock}
          defaultImage={product.image}
        />
      )}
    </AdminLayout>
  );
};
export default EditProductPage;
