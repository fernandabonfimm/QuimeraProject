import React from "react";
import Base from "../../../../components/BaseLayout";
import { MdOutlineDashboard } from "react-icons/md";
import { Table, Button, Card, Row, Col, Modal } from "antd";
import "../styles.css";
import WaterfallChart from "pages/StudentPages/WaterfallChart";
import { useParams } from "react-router-dom";
import { findExperimentById } from "../../../../services/routes/api/Experiment";
import { getStudentByPin } from "../../../../services/routes/api/AuthStudent";
import { getTotalCorrectGraphic } from "../../../../services/routes/api/Experiment";
import { formatDate } from "utils/formats";

const ExperimentDetailsTeacher = () => {
  const { id } = useParams();
  const [responseDetails, setResponseDetails] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [pin, setPin] = React.useState();
  const [responseGraphic, setResponseGraphic] = React.useState({});
  const [selectedStudentId, setSelectedStudentId] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const teacherId = localStorage.getItem("_idTeacher");

  const handleShowResultClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedStudentId(null);
    setIsModalVisible(false);
  };

  React.useEffect(() => {
    findExperimentById(teacherId, id).then((response) => {
      setResponseDetails(response.data.experiment);
      setPin(response.data.experiment.pin);
    });
    const interval = setInterval(() => {
      getStudentByPin(pin)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [students]);

  const getDatasByStudentId = (id) => {
    getTotalCorrectGraphic(id)
      .then((response) => {
        setResponseGraphic(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (selectedStudentId) {
      getDatasByStudentId(selectedStudentId);
    }
  }, [selectedStudentId]);

  const findStudentName = (id) => {
    const student = students.find((student) => student._id === id);
    return student?.name;
  };

  return (
    <>
      <Base
        goTo={"/dashboard"}
        Icon={<MdOutlineDashboard />}
        goToName={"Dashboard"}
        titlepage={"to Dashboard"}
        nameofuser={"Teacher"}
        children={
          <div className="cardsColSpace">
            <Card className="page-card-home">
              <div classBame="ColDivCard">
                <div className="rowDiv">
                  <h3>Experiment ID:</h3>
                  <span>{responseDetails._id}</span>
                </div>
                <div className="rowDiv">
                  <h3>Day and time of the experiment:</h3>
                  <span>{formatDate(responseDetails.createdAt)}</span>
                </div>
                <div className="rowDiv">
                  <h3>Experiment Room Pin:</h3>
                  <span>{responseDetails.pin}</span>
                </div>
                <div className="colDiv">
                  <h3>Experiment title:</h3>
                  <span>{responseDetails.title}</span>
                </div>
                <div className="colDiv">
                  <h3>Experiment description:</h3>
                  <span>{responseDetails.description}</span>
                </div>
              </div>
            </Card>
            <Card className="page-card-home">
              <div className="colDiv">
                <h3>All students who participated:</h3>
                <div className="divStudetns">
                  {students.map((student) => (
                    <div key={student.id} className="divNameAndSeeMore">
                      <label>Name: {student.name}</label>
                      <Button
                        onClick={() => handleShowResultClick(student._id)}
                      >
                        Show result
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        }
      />
      <Modal
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={"50%"}
      >
        <Row gutter={[16, 16]}>
          <Col xs={8} xl={24}>
            <h3>Student graph, {findStudentName(selectedStudentId)}</h3>
            <span>Student Grade: <b>{responseGraphic.data?.nota} points</b></span>
            {responseGraphic.data?.expectedValue &&
            responseGraphic.data?.studentValue ? (
              <div className="graficosClass">
                <WaterfallChart
                  experimentData={responseGraphic.data.expectedValue}
                  studentData={responseGraphic.data.studentValue}
                />
              </div>
            ) : (
              <h3>Loading the student graph...</h3>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ExperimentDetailsTeacher;
