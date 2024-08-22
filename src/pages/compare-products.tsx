import React from "react";
import { Table, Button, Modal } from "antd";
import AddProductsModal from "./add-products-modal";

interface CompareProductsProps {
  comparedProducts: { id: string }[];
  onRemove: (id: string) => void;
  onAdd: (data: { id: string }) => void;
}

const CompareProducts = ({
  comparedProducts,
  onRemove,
  onAdd,
}: CompareProductsProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Price", dataIndex: "price" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Category", dataIndex: "category" },
    {
      title: "Remove",
      render: ({ id }: { id: string }) => (
        <Button onClick={() => onRemove(id)}>Remove</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={comparedProducts as never}
        columns={columns}
        pagination={false}
      />
      <Button onClick={() => setIsModalVisible(true)}>Add More</Button>

      <Modal
        title="Add Products to Compare"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddProductsModal onAdd={onAdd} comparedProducts={comparedProducts} />
      </Modal>
    </div>
  );
};

export default CompareProducts;
