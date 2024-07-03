import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";

const ProductManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [maxPage, setMaxPage] = useState();
  const [productName, setProductName] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };
  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          //   _limit: 5,
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          name: searchParams.get("search"), //kalau ini kodong, dia akan gak filter berdasarkan nama
        },
      });
      setHasNextPage(Boolean(response.data.next));
      setMaxPage(response.data.last);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const serachProduct = () => {
    if (productName) {
      searchParams.set("search", productName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const handleDeleteProduct = async () => {
    const shouldDelete = confirm(
      `Are you sure you want to delete ${selectedProductIds.length} products`
    );
    if (!shouldDelete) return;
    const deletePromises = selectedProductIds.map((productId) => {
      return axiosInstance.delete("/products/" + productId);
    });
    try {
      await Promise.all(deletePromises);
      alert(`Successfully deleted ${selectedProductIds.length} products!`);
      searchParams.set("page", Number(1));
      setSearchParams(searchParams);
      setSelectedProductIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnCheckAllProduct = (checked) => {
    if (checked) {
      const allProduct = products.map((product) => product.id);
      setSelectedProductIds(allProduct);
    } else {
      setSelectedProductIds([]);
    }
  };

  const hanldeOnCheckedProduct = (productId, checked) => {
    if (checked) {
      const prevSelectedProductIds = [...selectedProductIds];
      prevSelectedProductIds.push(productId);
      setSelectedProductIds(prevSelectedProductIds);
      // setSelectedProductIds([...selectedProductIds], productId);
    } else {
      const productIdIndex = selectedProductIds.findIndex(
        (id) => id == productId
      );
      const prevSelectedProductIds = [...selectedProductIds];
      prevSelectedProductIds.splice(productIdIndex, 1);
      setSelectedProductIds(prevSelectedProductIds);
    }
  };
  useEffect(() => {
    if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);
  useEffect(() => {
    if (!searchParams.get("page") || searchParams.get("page") < 1) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);
  useEffect(() => {
    if (searchParams.get("page") > maxPage) {
      searchParams.set("page", maxPage);
      setSearchParams(searchParams);
    }
  }, [maxPage]);
  //   useEffect(()=> {
  //     if(searchParams.get('page') < 1) {

  //     }
  //   },[])
  return (
    <AdminLayout
      title="Product Management"
      description="managing our product"
      rightSection={
        <div className="flex gap-2">
          {selectedProductIds.length ? (
            <Button onClick={handleDeleteProduct} variant="destructive">
              Delete {selectedProductIds.length} Products
            </Button>
          ) : null}
          <Link to="/admin/products/create">
            <Button>
              <IoAdd className="w-6 h-6 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      }
    >
      <div className="mb-8">
        <Label>Search Product Name</Label>
        <div className="flex gap-4">
          <Input
            className="max-w-[400px]"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            placeholder="search product"
          />
          <Button onClick={serachProduct}>Search</Button>
        </div>
      </div>
      <Table className="p-4 border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                onCheckedChange={(checked) => handleOnCheckAllProduct(checked)}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              // <TableRow key={product.id}>
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    onCheckedChange={(checked) =>
                      hanldeOnCheckedProduct(product.id, checked)
                    }
                    checked={selectedProductIds.includes(product.id)}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  Rp. {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Link to={"/admin/products/edit/" + product.id}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-6 h-6" />
                    </Button>
                  </Link>
                  {/* <Button
                      onClick={() => handledeleteProduct(product.id)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash className="w-6 h-6"></Trash>
                    </Button> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination className="mt-8">
        <PaginationContent>
          {Number(searchParams.get("page")) !== 1 && (
            <PaginationItem>
              <Button variant="ghost" onClick={handlePreviousPage}>
                <ChevronLeft className="w-6 h-6 mr-2" /> Previous
              </Button>
            </PaginationItem>
          )}
          <PaginationItem className="mx-8 font-semibold ">
            Page {searchParams.get("page")}
          </PaginationItem>
          {hasNextPage && (
            <PaginationItem>
              <Button variant="ghost" onClick={handleNextPage}>
                {" "}
                Next <ChevronRight className="w-6 h-6 mr-2" />
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
};
export default ProductManagementPage;
