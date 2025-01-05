import React, { useState, useEffect } from "react";
import { Card, Col, Row, Typography, Input, Button, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const { Search } = Input;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const viewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Top Products
      </Title>
      <Search
        placeholder="Search products"
        value={searchQuery}
        onChange={onSearchChange}
        style={{
          marginBottom: "20px",
          maxWidth: "400px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <Row gutter={[16, 16]} justify="center">
        {filteredProducts.map((product, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                position: "relative",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {/* Ranking Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#FF9900",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                #{index + 1}
              </div>
              {/* Product Image */}
              <img
                alt={product.title}
                src={product.image}
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              {/* Product Title */}
              <Title
                level={5}
                style={{
                  fontSize: "14px",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                {product.title}
              </Title>
              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Rate
                  allowHalf
                  disabled
                  defaultValue={product.rating.rate}
                  style={{ fontSize: "14px" }}
                />
                <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                  ({product.rating.count})
                </span>
              </div>
              {/* Product Price */}
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#B12704",
                  marginBottom: "10px",
                }}
              >
                ₹{product.price.toFixed(2)}
              </p>
              {/* View Details Button */}
              <Button
                type="primary"
                size="small"
                style={{
                  backgroundColor: "#FF9900",
                  borderColor: "#FF9900",
                  fontWeight: "bold",
                }}
                onClick={() => viewDetails(product.id)}
              >
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListPage;
