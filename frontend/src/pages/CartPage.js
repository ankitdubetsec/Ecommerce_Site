import React, { useState, useEffect } from "react";
import { Card, Typography, Image, Button, Row, Col, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/cart/getCart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const items = response.data.cart.items;

        const uniqueProductIds = [
          ...new Set(items.map((item) => item.productId)),
        ];
        const productRequests = uniqueProductIds.map((id) =>
          axios.get(`https://fakestoreapi.com/products/${id}`)
        );
        const productResponses = await Promise.all(productRequests);
        console.log(productResponses);
        const fetchedProducts = productResponses.map((res) => res.data);

        setProducts(fetchedProducts);
        setCartItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items or product details", error);
        message.error("Failed to load cart items or product details.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === parseInt(item.productId));
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/v1/cart/removeFromCart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Item removed from cart!");
        setCartItems(cartItems.filter((item) => item.productId !== productId));
      } else {
        message.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      message.error("Error removing item from cart. Please try again.");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Title level={2} style={{ marginBottom: "20px", textAlign: "center" }}>
        My Cart
      </Title>

      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <Card
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <Row gutter={[16, 16]}>
            {cartItems.map((item) => {
              const product = products.find(
                (p) => p.id === parseInt(item.productId)
              );
              return (
                <Col span={24} key={item.productId}>
                  <Card
                    style={{
                      border: "1px solid #f0f0f0",
                      borderRadius: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <Row align="middle" gutter={[16, 16]}>
                      <Col xs={6}>
                        <Image
                          src={product?.image}
                          alt={product?.title}
                          style={{
                            maxWidth: "100%",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </Col>
                      <Col xs={12}>
                        <Title level={5}>{product?.title}</Title>
                        <Text
                          style={{
                            display: "block",
                            color: "#555",
                            fontSize: "14px",
                          }}
                        >
                          ₹{product?.price?.toFixed(2)}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginTop: "8px",
                            color: "#555",
                          }}
                        >
                          Quantity: {item.quantity}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginTop: "8px",
                            color: "#555",
                          }}
                        >
                          Total: ₹{(product?.price * item.quantity).toFixed(2)}
                        </Text>
                      </Col>
                      <Col xs={6}>
                        <Button
                          type="primary"
                          danger
                          style={{ marginBottom: "10px" }}
                          onClick={() => handleRemoveFromCart(item.productId)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Title level={4}>
              Total Price: ₹{calculateTotalPrice().toFixed(2)}
            </Title>
            <Button
              type="primary"
              size="large"
              style={{
                marginTop: "10px",
                backgroundColor: "#FF9900",
                borderColor: "#FF9900",
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Cart;
