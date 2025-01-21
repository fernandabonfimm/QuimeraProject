import React from "react";
import { Card } from "antd";
import WaterfallChart from "../WaterfallChart";
import Base from "../../../components/BaseLayoutStudent";
import { MdOutlineBiotech } from "react-icons/md";
import "./styles.css";
import { useParams } from "react-router-dom";
import CardChecked from "../../../components/CardChecked";
import Swal from "sweetalert2";
import {
  getOptions,
  getPhaseOne,
  getGraphic,
  getDataByPin,
  getInicialGraphic,
} from "../../../services/routes/api/Experiment";
import { postAnswer } from "../../../services/routes/api/AuthStudent";

const Experiment = () => {
  const { pin } = useParams();
  const idStudent = localStorage.getItem("idStudent");
  const storedName = localStorage.getItem("name");
  const [showB1, setShowB1] = React.useState(false);
  const [showB2, setShowB2] = React.useState(false);
  const [options, setOptions] = React.useState({
    optionsOne: [],
    optionsTwo: [],
  });
  const [phaseOne, setPhaseOne] = React.useState({});
  const [graphic, setGraphic] = React.useState({});
  const [inicialGraphic, setInicialGraphic] = React.useState({});
  const [experimentData, setExperimentData] = React.useState([]);
  const [liberateRoomValue, setLiberateRoomValue] = React.useState(false);

  React.useEffect(() => {
    console.log(experimentData.title);
  }, [experimentData]);

  React.useEffect(() => {
    getOptions().then((response) => {
      setOptions({
        optionsOne: response.data.optionsOne,
        optionsTwo: response.data.optionsTwo,
      });
    });
    getPhaseOne().then((response) => {
      setPhaseOne(response.data);
    });
    getDataByPin(pin).then((response) => {
      setExperimentData(response.data.experiment);
    });
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      getDataByPin(pin).then((response) => {
        setLiberateRoomValue(response.data.experiment.liberateRoom);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectOptionB1 = (option) => {
    setSelectedOptionsB1({ [option.value]: true });
  };

  const handleSelectOptionB2 = (option) => {
    setSelectedOptionsB2({ [option.value]: true });
  };

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [answerOneStorage, setAnswerOneStorage] = React.useState("");
  const [answerTwoStorage, setAnswerTwoStorage] = React.useState("");

  const getDatas = () => {
    getInicialGraphic(idStudent).then((response) => {
      setInicialGraphic(response.data);
    });
    getGraphic(idStudent).then((response) => {
      setGraphic(response.data);
    });
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      getDatas();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonDisabled = () => {
    const answerOneString = Object.keys(selectedOptionsB1)[0].toString();
    const answerTwoString = Object.keys(selectedOptionsB2)[0].toString();
    const answerOne = options.optionsOne.find(
      (option) => option.value === answerOneString
    );
    const answerTwo = options.optionsTwo.find(
      (option) => option.value === answerTwoString
    );
    const answer = {
      answerOne: answerOne.label,
      answerTwo: answerTwo.label,
    };
    setAnswerOneStorage(answerOne.label);
    setAnswerTwoStorage(answerTwo.label);
    postAnswer(idStudent, answer).then((response) => {
      Swal.fire({
        icon: "success",
        title: "Resposta enviada com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      getDatas();
      setIsButtonDisabled(true);
    });
  };

  const [selectedOptionsB1, setSelectedOptionsB1] = React.useState({});

  const [selectedOptionsB2, setSelectedOptionsB2] = React.useState({});

  React.useEffect(() => {
    if (
      Object.keys(selectedOptionsB1).length > 0 &&
      Object.keys(selectedOptionsB2).length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedOptionsB1, selectedOptionsB2]);

  const getSelectedLabelB1 = () => {
    const selectedValue = Object.keys(selectedOptionsB1)[0];
    const selectedOption = options.optionsOne.find(
      (option) => option.value === selectedValue
    );
    return selectedOption ? selectedOption.label : "Nenhuma";
  };

  const getSelectedLabelB2 = () => {
    const selectedValue = Object.keys(selectedOptionsB2)[0];
    const selectedOption = options.optionsTwo.find(
      (option) => option.value === selectedValue
    );
    return selectedOption ? selectedOption.label : "Nenhuma";
  };

  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={"Experiment"}
      titlepage={`the experiment room: ${pin}, `}
      nameofuser={storedName}
      children={
        <div className="divCol">
          {liberateRoomValue && (
            <Card className="notaCard">
              <h3 className="titleNotaCard">
              YOUR GRADE WAS:{" "}
                <b className="pontosNotaCard">{graphic?.data?.nota} PONTOS</b>
              </h3>
            </Card>
          )}
          <div className="divCards">
            <Card className="card-chartsExperiment">
              <h3 className="title-cardExperiment">
                Title: {experimentData.title}
              </h3>
              <span className="description-cardExperiment">
                Description: {experimentData.description}
              </span>
              <br />
              <p className="subtitle-cardExperiment">
              Inform OP1 and OP2 (Options) to perform the experiment
              </p>
              <div className="contentChoices-cardExperiment">
                <div className="contentB1-Choices">
                  {!showB1 && (
                    <div className="content-ButtonAndLabel">
                      {!liberateRoomValue && (
                        <button
                          onClick={() => setShowB1(true)}
                          className="button-Experiment"
                        >
                          OP1
                        </button>
                      )}
                      <label>
                        Choice: <b>{getSelectedLabelB1()}</b>
                      </label>
                    </div>
                  )}
                  {showB1 && (
                    <>
                      {!liberateRoomValue && (
                        <button
                          onClick={() => setShowB1(false)}
                          className="button-Experiment"
                        >
                          OP1
                        </button>
                      )}
                      <div className="min-height-answer">
                        {options.optionsOne.map((item, index) => (
                          <div key={index}>
                            <CardChecked
                              handleClick={() => handleSelectOptionB1(item)}
                              isClicked={selectedOptionsB1[item.value]}
                            >
                              {item.label}
                            </CardChecked>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="contentB1-Choices">
                  {!showB2 && (
                    <div className="content-ButtonAndLabel">
                      {!liberateRoomValue && (
                        <button
                          onClick={() => setShowB2(true)}
                          className="button-Experiment"
                        >
                          OP2
                        </button>
                      )}
                      <label>
                      Choice: <b>{getSelectedLabelB2()}</b>
                      </label>
                    </div>
                  )}
                  {showB2 && (
                    <>
                      {!liberateRoomValue && (
                        <button
                          onClick={() => setShowB2(false)}
                          className="button-Experiment"
                        >
                          OP2
                        </button>
                      )}
                      <div className="min-height-answer">
                        {options.optionsTwo.map((item, index) => (
                          <div key={index}>
                            <CardChecked
                              handleClick={() => handleSelectOptionB2(item)}
                              isClicked={selectedOptionsB2[item.value]}
                            >
                              {item.label}
                            </CardChecked>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="contentB1-Choices">
                  <button
                    className="btnRealizarExperimento"
                    disabled={isButtonDisabled}
                    onClick={handleButtonDisabled}
                  >
                    {liberateRoomValue
                      ? "Experiment performed"
                      : "Perform Experiment"}
                  </button>
                </div>
              </div>
            </Card>
            <Card className="card-chartsExperiment">
              {liberateRoomValue && (
                <>
                  {answerOneStorage === "Hipotálamo" &&
                  answerTwoStorage === "ADH" ? (
                    <div>
                      <h3>
                      You got both answers right., {answerOneStorage} 80% e{" "}
                        {answerTwoStorage} 20%
                      </h3>
                    </div>
                  ) : answerOneStorage === "Hipotálamo" ? (
                    <div>
                      <h3>
                      You got the first answer right, {answerOneStorage} 80%
                      </h3>
                    </div>
                  ) : answerTwoStorage === "ADH" ? (
                    <div>
                      <h3>
                      You got the second answer right, {answerTwoStorage} 20%
                      </h3>
                    </div>
                  ) : (
                    <div>
                      <h3>You haven't got any answers right yet.</h3>
                    </div>
                  )}
                </>
              )}
              {!liberateRoomValue && (
                <>
                  <h3>Waiting for the result to be released by the teacher</h3>
                </>
              )}
              <div className="contentChart-cardExperiment">
                {(liberateRoomValue && graphic?.data?.expectedValue) ||
                (!liberateRoomValue && inicialGraphic?.data?.expectedValue) ? (
                  <WaterfallChart
                    experimentData={
                      liberateRoomValue
                        ? graphic?.data.expectedValue
                        : inicialGraphic?.data.expectedValue
                    }
                    studentData={
                      liberateRoomValue
                        ? graphic?.data.studentValue
                        : inicialGraphic?.data.studentValue
                    }
                  />
                ) : (
                  <h3>Loading graph...</h3>
                )}
              </div>
            </Card>
          </div>
        </div>
      }
    />
  );
};

export default Experiment;
