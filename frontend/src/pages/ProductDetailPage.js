import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Image,
  Rate,
  Space,
  Button,
  InputNumber,
  message,
  Row,
  Col,
} from "antd";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // State to store product details
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [quantity, setQuantity] = useState(1); // State to store the quantity

  useEffect(() => {
    // Fetch product data from the API
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data); // Set the fetched product data
      } catch (error) {
        console.error("Error fetching product details", error);
        message.error("Product not found.");
        navigate("/products"); // Redirect to the product list page if error occurs
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    try {
      const itemToAdd = {
        productId: product.id,
        price: product.price,
        quantity,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://qed42-assignment-ecommerce-1.onrender.com/api/v1/cart/addToCart",
        itemToAdd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success(`${quantity} × ${product.title} added to cart!`);
      } else {
        message.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      message.error("Error adding item to cart. Please try again.");
    }
  };

  if (!product) return null;

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/home")}
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        Back to Products
      </Button>
      <Card
        style={{
          maxWidth: "750px",
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
          padding: "24px",
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          {/* Product Image (Left) */}
          <Col xs={24} md={10}>
            <Image
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Col>

          <Col xs={24} md={14}>
            <Text
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "10px",
                color: "#555",
              }}
            >
              Category:{" "}
              <span style={{ fontWeight: "bold" }}>{product.category}</span>
            </Text>
            {/* Title */}
            <Title level={3}>{product.title}</Title>
            {/* Rating in the Center */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <Rate
                allowHalf
                disabled
                defaultValue={product.rating?.rate}
                style={{ fontSize: "18px" }}
              />
              <Text
                style={{ marginLeft: "8px", fontSize: "14px", color: "#555" }}
              >
                ({product.rating?.count} reviews)
              </Text>
            </div>
            {/* Price */}
            <div
              style={{
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#B12704",
              }}
            >
              ₹{product.price.toFixed(2)}
            </div>

            <Paragraph
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#555",
                textAlign: "left",
              }}
            >
              {product.description}
            </Paragraph>
            {/* Quantity Selector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Text
                style={{
                  marginRight: "10px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#555",
                }}
              >
                Quantity:
              </Text>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                style={{ maxWidth: "100px" }}
              />
            </div>
            {/* Add to Cart Button */}
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{
                backgroundColor: "#FF9900",
                borderColor: "#FF9900",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "10px",
                width: "100%",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
