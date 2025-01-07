import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Input,
  Button,
  Rate,
  Select,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "" || product.category === selectedCategory) &&
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") return a.price - b.price;
      if (sortOption === "priceHighToLow") return b.price - a.price;
      if (sortOption === "ratingHighToLow")
        return b.rating.rate - a.rating.rate;
      return 0;
    });

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const onSortChange = (value) => {
    setSortOption(value);
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
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Search
          placeholder="Search products"
          value={searchQuery}
          onChange={onSearchChange}
          style={{
            marginBottom: "20px",
            maxWidth: "400px",
            display: "inline-block",
            marginRight: "10px",
          }}
        />
        <Select
          placeholder="Filter by category"
          onChange={onCategoryChange}
          style={{ width: "200px", marginRight: "10px" }}
          allowClear
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Sort by"
          onChange={onSortChange}
          style={{ width: "200px" }}
          allowClear
        >
          <Option value="priceLowToHigh">Price: Low to High</Option>
          <Option value="priceHighToLow">Price: High to Low</Option>
          <Option value="ratingHighToLow">Rating: High to Low</Option>
        </Select>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ProductListPage;
