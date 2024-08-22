import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CompareProps {
  id: string;
}

interface ProductDetailsProps {
  onCompare: (data: { id: string }) => void;
  oldComparedProducts: {
    id: string;
    price?: number;
    title?: string;
    description?: string;
    brand?: string;
    category?: string;
  }[];
}

const ProductDetails = ({
  onCompare,
  oldComparedProducts,
}: ProductDetailsProps) => {
  const [products, setProducts] = useState<{ id: string }[]>([]);
  const [comparedProducts, setComparedProducts] = useState<{ id: string }[]>(
    []
  );
  const history = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products));
  }, []);

  const handleCompare = (id: string) => {
    const product = products.find((item) => item.id === id);

    if (!comparedProducts.some((product) => product.id === id) && product) {
      setComparedProducts([...comparedProducts, product]);
      onCompare(product);
      history("/compare");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: { title: string; price: number }, b: { title: string }) =>
        a.title.localeCompare(b.title),
      render: (title: string, { id }: { id: string }) => (
        <span
          className={
            oldComparedProducts.some((product) => product.id === id)
              ? "highlighted"
              : ""
          }
        >
          {title}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (description: string, { id }: { id: string }) => (
        <span
          className={
            oldComparedProducts.some((product) => product.id === id)
              ? "highlighted"
              : ""
          }
        >
          {description}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: { price: number }, b: { price: number }) => a.price - b.price,
      render: (price: number, { id }: { id: string }) => (
        <span
          className={
            oldComparedProducts.some((product) => product.id === id)
              ? "highlighted"
              : ""
          }
        >
          {price}
        </span>
      ),
    },
    { title: "Discount", dataIndex: "discountPercentage" },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (brand: string, { id }: { id: string }) => (
        <span
          className={
            oldComparedProducts.some((product) => product.id === id)
              ? "highlighted"
              : ""
          }
        >
          {brand}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category: string, { id }: { id: string }) => {
        console.log("id:: ", id, category);
        return (
          <span
            className={
              oldComparedProducts.some((product) => product.id === id)
                ? "highlighted"
                : ""
            }
          >
            {category}
          </span>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      render: (text: string) => (
        <img src={text} alt="thumbnail" style={{ width: 50 }} />
      ),
    },
    {
      title: "Compare",
      render: ({ id }: CompareProps) => {
        return (
          <Button
            onClick={() => handleCompare(id)}
            disabled={oldComparedProducts.some((product) => product.id === id)}
          >
            {oldComparedProducts.some((product) => product.id === id)
              ? "Compared"
              : "Compare"}
          </Button>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={products as never}
      columns={columns as never}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductDetails;
