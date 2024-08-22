import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";

interface AddProductsModalProps {
  comparedProducts: { id: string }[];
  onRemove?: (data: string) => void;
  onAdd: (data: { id: string }) => void;
}

const AddProductsModal = ({
  onAdd,
  comparedProducts,
}: AddProductsModalProps) => {
  const [products, setProducts] = useState<{ id: string }[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products));
  }, []);

  const handleAdd = (id: string) => {
    const product = products.find((item) => item.id === id);

    if (
      comparedProducts.length < 4 &&
      !comparedProducts.some((product) => product.id === id) &&
      product
    ) {
      onAdd(product);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Price", dataIndex: "price" },
    { title: "Brand", dataIndex: "brand" },
    {
      title: "Add",
      render: ({ id }: { id: string }) => (
        <Button
          onClick={() => handleAdd(id)}
          disabled={comparedProducts.some((product) => product.id === id)}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AddProductsModal;
