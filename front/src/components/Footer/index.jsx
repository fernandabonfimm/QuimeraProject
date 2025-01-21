import React from "react";
import "./styles.css";
import { Row, Col, Layout, Divider } from "antd";
import { AiOutlineHeart } from "react-icons/ai";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <>
      <Footer className="footer">
        <Row gutter={[32, 22]}>
          <Col xs={24} xl={24}>
            <span className="description-footer">
            © 2023 Quimera - All rights reserved | Developed with              <AiOutlineHeart className="icon-footer" />
              by{" "}
              <a href="https://github.com/fernandabonfimm/">Fernanda Bonfim</a>
            </span>
          </Col>
        </Row>
      </Footer>
    </>
  );
};
export default FooterComponent;
