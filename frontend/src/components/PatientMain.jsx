import React from "react";

const PatientMain = ({ match }) => {
  const patientId = match.params.patientId;

  return (
    <div>
      <h2>환자 상세 정보</h2>
      <p>환자 번호: {patientNumber}</p>
    </div>
  );
};

export default PatientMain;
