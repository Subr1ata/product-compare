import { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ProductDetails from "./pages/product-details";
import CompareProducts from "./pages/compare-products";
import "./App.css";

const { Content, Sider } = Layout;

export interface HandleCRUDProps {
  id: string;
}

const App = () => {
  const [comparedProducts, setComparedProducts] = useState<HandleCRUDProps[]>(
    []
  );

  const handleCompare = (product: HandleCRUDProps) => {
    setComparedProducts([...comparedProducts, product]);
  };

  const handleRemove = (id: string) => {
    setComparedProducts(comparedProducts.filter((p) => p?.id !== id));
  };

  const handleAdd = (product: HandleCRUDProps) => {
    setComparedProducts([...comparedProducts, product]);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Layout>
          <Sider width={256}>
            <Sidebar />
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProductDetails
                      onCompare={handleCompare}
                      oldComparedProducts={comparedProducts}
                    />
                  }
                />

                <Route
                  path="/compare"
                  element={
                    <CompareProducts
                      comparedProducts={comparedProducts}
                      onRemove={handleRemove}
                      onAdd={handleAdd}
                    />
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
