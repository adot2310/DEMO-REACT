import React, { useEffect, useState } from "react";
import { Typography, Spin, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import bannerImage from "../assets/img/sport1.jpg";

const { Title } = Typography;

const ContentComponent: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products.slice(0, 9));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const bannerStyle: React.CSSProperties = {
    backgroundImage: `url(${bannerImage})`,
    height: "400px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 36,
    fontWeight: 700,
    letterSpacing: 1,
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f9f9f9" }}>
      <div style={bannerStyle}>
        <div style={overlayStyle}>Bùng nổ phong cách thể thao</div>
      </div>

      <section style={{ padding: "40px 32px" }}>
        <Title level={2} style={{ color: "#333" }}>
          Sản phẩm nổi bật
        </Title>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          <Row gutter={[24, 24]}>
            {products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={8} key={product.id}>
                <div style={{ textAlign: "center", border: "1px solid #ddd", padding: 16 }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "auto", marginBottom: 16 }} />
                  <h3>{product.name}</h3>
                  <p>{product.price} VND</p>
                  <Link to={`/product/detail/${product.id}`}>
                    <Button type="primary">Chi tiết sản phẩm</Button>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </div>
  );
};

export default ContentComponent;
