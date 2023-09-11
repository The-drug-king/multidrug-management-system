import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/Medical.css";

import AddMedicalModal from "../components/AddPatientModal";
import DeleteMedicalModal from "../components/DeletePatientModal";

function PatientAddMedical() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newMedicalId, setNewMedicalId] = useState("");
  const [delMedicalId, setDelMedicalId] = useState("");

  const [isAddMedicalModalOpen, setIsAddMedicalModalOpen] = useState(false);
  const [isDeleteMedicalModalOpen, setIsDeleteMedicalModalOpen] =
    useState(false);

  const [medicals, setMedicals] = useState([]);

  const mockMedicals = [
    {
      medicalName: "의료인1",
      medicalId: "med_123",
    },
    {
      medicalName: "의료인2",
      medicalId: "med_456",
    },
    {
      medicalName: "의료인3",
      medicalId: "med_789",
    },
  ];

  useEffect(() => {
    setMedicals(mockMedicals);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMedicals = medicals.filter(
    (medical) =>
      medical.medicalName &&
      medical.medicalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedical = (newMedicalId) => {
    // Add new medical logic
  };

  const openAddMedicalModal = () => {
    setIsAddMedicalModalOpen(true);
  };

  const closeAddMedicalModal = () => {
    setIsAddMedicalModalOpen(false);
  };

  const handleDeleteMedical = (delMedicalId) => {
    // Delete medical logic
  };

  const openDeleteMedicalModal = () => {
    setIsDeleteMedicalModalOpen(true);
  };

  const closeDeleteMedicalModal = () => {
    setIsDeleteMedicalModalOpen(false);
  };

  return (
    <div>
      <div className="medicals-main">
        <h1>
          "전문가의 조언으로,
          <br />더 건강한 미래를 향해 나아가세요.
        </h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="의료인 ID 입력"
            value={newMedicalId}
            onChange={(e) => setNewMedicalId(e.target.value)}
          />
          <button onClick={openAddMedicalModal}>
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            의료인 추가
          </button>
        </div>
      </div>

      <div className="patient-list-container">
        <h1 className="patient-list-title">My Medical List</h1>
        <div
          className="border rounded-lg mb-4 relative bg-gray-200 focus-within:border-gray mx-auto"
          style={{
            width: "80vw",
            borderColor: "lightgray",
            marginTop: "10%",
          }}
        >
          <input
            type="text"
            placeholder="의료인 이름 검색"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-4 pr-4 py-2 w-full rounded-lg bg-gray-200"
          />
        </div>

        <ul
          role="list"
          className="flex flex-col divide-y divide-gray-100 justify-center items-center"
        >
          {filteredMedicals.length === 0 && (
            <li className="py-5 text-gray-500">검색 결과가 없습니다.</li>
          )}

          {filteredMedicals.map((medical, index) => (
            <li key={index} className="py-5">
              <div className="flex justify-between items-center">
                <form
                  className="border rounded-lg p-4"
                  style={{ minWidth: "80vw" }}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="h-12 w-12 flex-none rounded-full bg-gray-100">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="h-7 w-12 text-gray-300"
                        style={{ marginTop: "7px" }}
                      />
                    </div>

                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {medical.medicalName}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        의료인 ID: {medical.medicalId}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        onClick={() => {
                          setDelMedicalId(medical.medicalId);
                          openDeleteMedicalModal();
                        }}
                        className="text-red-700 hover:text-red-500 mt-1 text-sm font-semibold"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span className="ml-2">의료인 삭제</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AddMedicalModal
        isOpen={isAddMedicalModalOpen}
        onClose={closeAddMedicalModal}
        onAddMedical={handleAddMedical}
        newMedicalId={newMedicalId}
      />

      <DeleteMedicalModal
        isOpen={isDeleteMedicalModalOpen}
        onClose={closeDeleteMedicalModal}
        onDeleteMedical={handleDeleteMedical}
        delMedicalId={delMedicalId}
      />
    </div>
  );
}

export default PatientAddMedical;
