import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./LawyerData.css";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
function Data() {
  const [mainData, setMainData] = useState([]);
  const [lawyerData, setLawyerData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedlawyer, setSelectedLawyer] = useState("");

  const getLawyerList = async () => {
    try {
      const response = await fetch("http://localhost:3000/lawyers");
      const data = await response.json();
      setLawyerData(data);
      setMainData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModalfun = (val) => {
    setSelectedLawyer(val);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    getLawyerList();
  };

  useEffect(() => {
    getLawyerList();
  }, []);
  const LawyersList = () => {
    return (
      <>
        {lawyerData &&
          lawyerData.map((val) => {
            return (
              <div key={val.id} className="card" style={{ width: "19em" }}>
                <img src={val.img} className="card-img-top" alt="layer"></img>
                <div className="card-body">
                  <h5 className="card-title">{val.name}</h5>
                  <h6 className="card-title">{val.specialization}</h6>
                  <p className="card-text">
                    {val.firm},{val.address},{val.phone}
                  </p>
                  <h6 className="card-text">{val.availableTime}</h6>
                  <button
                    onClick={() => openModalfun(val)}
                    className="btn btn-primary"
                  >
                    Book appointment
                  </button>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const findLawyer = (e) => {
    const name = e?.target?.value?.toLowerCase();
    const specialization = e?.target?.value?.toLowerCase();
    const newData = mainData.filter(
      (el) =>
        el.name.toLowerCase().includes(name) ||
        el.specialization.toLowerCase().includes(specialization)
    );
    setLawyerData(newData);
  };

  return (
    <div className="lawyers_div">
      <SearchBar findLawyer={findLawyer} />
      <div className="lawyers_data">
        <LawyersList />
        {openModal && (
          <Modal
            lawyersInfo={selectedlawyer}
            setOpenModal={setOpenModal}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
}
export default Data;
