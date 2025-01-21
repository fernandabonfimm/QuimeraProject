import React from "react";
import "./styles.css";
import LogoHA from "../../logoHA.png";
import { Layout, Button, Card, Row, Col } from "antd";
import FooterComponent from "components/Footer";
import { AiOutlineExperiment } from "react-icons/ai";
import { MdOutlineBloodtype } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  return (
    <>
      <Header className="headerHomePG">
        <img src={LogoHA} alt="Logo HA" className="logoHomePG" />
        <div className="divbuttonMakeLogin">
          <h3 className="textanswerAction">Are you a teacher?</h3>{" "}
          <Button
            className="btnMakeLogin"
            onClick={() => navigate("/loginTeacher")}
          >
            Login
          </Button>
        </div>
      </Header>
      <div className="container-HomePage">
        <Card className="container-HomePage-Card">
          <h1 className="titleHomepage">Welcome to QUIMERA!</h1>
          <p className="paragHomePage">
            Quimera is a platform that allows the creation of experiments
            interactives for science classes in veterinary medicine. Through
            With it, teachers can create experiments and students can interact
            with them in real time.
          </p>
          <h2 className="titleHomepage">Choose an experiment:</h2>
        </Card>
        <Row gutter={[32, 22]}>
          <Col xs={24} xl={12}>
            <Card
              className="CardHomePageExp Orange"
              onClick={() => navigate("/loginPin")}
            >
              <div className="contentCardHomePageExp">
                <AiOutlineExperiment className="iconHomePGExp" />
                <h1 className="textHomePGExp">
                Body Water Drop Experiment
                </h1>
              </div>
            </Card>
          </Col>
          <Col xs={24} xl={12}>
            <Card
              className="CardHomePageExp Yellow"
              onClick={() => navigate("/loginPin")}
            >
              <div className="contentCardHomePageExp">
                <MdOutlineBloodtype className="iconHomePGExp" />
                <h1 className="textHomePGExp">
                Blood Pressure and Heart Rate Experiment
                </h1>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <FooterComponent />
    </>
  );
};
export default Home;
