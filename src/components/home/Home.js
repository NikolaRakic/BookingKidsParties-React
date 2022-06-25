import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Offers from "./Offers";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

export default function Home() {


  function checkSearchDataFromLocalStorage(name){
    const dataFromLocalStorage = localStorage.getItem(name);
    switch(dataFromLocalStorage){
      case null:
        return "";
      default:
        return dataFromLocalStorage;
    }
  }

  const [formData, setFormData] = useState({
    city: checkSearchDataFromLocalStorage("city"),
    numberOfKids: checkSearchDataFromLocalStorage("numberOfKids"),
    numberOfAdults: checkSearchDataFromLocalStorage("numberOfAdults"),
    date: checkSearchDataFromLocalStorage("date"),
    startTime: checkSearchDataFromLocalStorage("startTime"),
    endTime: checkSearchDataFromLocalStorage("endTime"),
  });
  const [visibleForm, setVisibleForm] = useState(true);
  const [visibleBtn, setVisibleBtn] = useState(true);

  const onSubmitHandler = () => {
    let token = localStorage.getItem("token");
    localStorage.clear();
    localStorage.setItem("token", token);
    Object.entries(formData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    setVisibleForm(false);
    setVisibleBtn(false);
  };

  const showForm = () => {
    setVisibleForm(true);
    setVisibleBtn(true);
  };

  return (
    <div>
      <Form
        onSubmitHandler={onSubmitHandler}
        visible={visibleForm}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        className="showFormBtn"
        style={visibleBtn ? { display: "none" } : { display: "block" }}
        onClick={showForm}
        variant="outline-dark"
      >
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: 25 }} />
        &nbsp; Prikaži formu za pretragu
      </Button>
      {!visibleForm && <Offers visible={visibleForm} formData={formData} />}
    </div>
  );
}
