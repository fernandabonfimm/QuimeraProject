import React, { useState } from "react";
import Base from "../../../components/BaseLayout";
import { MdOutlineBiotech } from "react-icons/md";
import { Card, Row, Col, Tag, Checkbox } from "antd";
import "./styles.css";
import Announcement from "./components/Announcement";
import { useNavigate } from "react-router-dom";
import Alert from "sweetalert2";
import { postExperiment } from "../../../services/routes/api/Experiment";

const Search = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [description, setDescription] = useState("");

  const idTeacher = localStorage.getItem("_idTeacher");

  const handleSearch = () => {
    if (!searchName) {
      Alert.fire({
        icon: "error",
        title: "Insira um titulo no experimento!",
      });
    } else if (!description) {
      Alert.fire({
        icon: "error",
        title: "Insira uma descrição no experimento!",
      });
    } else {
      try {
        const body = {
          title: searchName,
          description: description,
        };

        postExperiment(idTeacher, body).then((response) => {
          Alert.fire({
            icon: "success",
            title: "Experimento criado com sucesso!",
          }).finally(() => {
            navigate(
              `/experimentroom/${response.data.experiment._id}/${response.data.experiment.pin}`
            );
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Base
      goTo={"/search"}
      Icon={<MdOutlineBiotech />}
      goToName={"New experiment"}
      titlepage={"to the new experiment,"}
      nameofuser={"Fernanda Bonfim"}
      children={
        <>
          <Row>
            <Col xs={24} xl={24}>
              <Card className="card-forms">
                <h4 className="center forms-title">
                Shall we start another search?
                </h4>
                <span className="center forms-description">
                Fill out the form below to make your new
                experiment
                </span>
                <span className="start label-input-forms">
                Search title:
                                </span>
                <input
                  id="search-name"
                  name="search-name"
                  className="start input-forms"
                  placeholder="Ex: Body water variation"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <textarea
                  id="search-name"
                  name="search-name"
                  className="start input-forms"
                  placeholder="Ex: Body water variation"
                  maxLength={300}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => handleSearch()}
                    className="center btn-save"
                  >
                   Save new experiment
                  </button>
                </div>
                <Announcement />
              </Card>
            </Col>
          </Row>
        </>
      }
    />
  );
};
export default Search;
