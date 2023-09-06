import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import doctorbg from "../assets/images/doctorbg.jpg"; // 이미지 경로 수정
import "../styles/MedicalsMain.css";
const MedicalsMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [newPatientId, setNewPatientId] = useState("");
  const [isAddPatientFormVisible, setIsAddPatientFormVisible] = useState(false);

  // 환자 데이터 example
  const mockPatients = [
    {
      patientName: "윤서영",
      patientId: "id_123",
    },
    {
      patientName: "허건혁",
      patientId: "12sd5",
    },
    {
      patientName: "김재윤",
      patientId: "1234fd5",
    },
    {
      patientName: "이창희",
      patientId: "1as345",
    },
    {
      patientName: "바다",
      patientId: "as2345",
    },
    {
      patientName: "새우",
      patientId: "1234vds5",
    },
  ];

  useEffect(() => {
    // fetch("/api/patients")
    //   .then((response) => response.json())
    //   .then((data) => setPatients(data))
    //   .catch((error) => console.error("Error fetching patients:", error));

    setPatients(mockPatients);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.patientName &&
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = async () => {
    try {
      const response = await fetch("/api/add-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ followId: newPatientId }),
      });

      if (response.status === 200) {
        // 성공 시 환자 목록 업데이트
        const updatedPatients = [...patients];
        updatedPatients.push({
          patientName: `새 환자 ${newPatientId}`,
          patientId: newPatientId,
        });
        setPatients(updatedPatients);
        setNewPatientId(""); // 입력 필드 초기화
        setIsAddPatientFormVisible(false); // 폼 숨김
      } else {
        console.error("Failed to add patient");
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div>
      <div className="medicals-main">
        <h1>
          "환자의 약물 복용 모니터링을 통해
          <br />
          당신의 보다 나은 진료를 지원합니다."
        </h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="환자 ID 입력"
            value={newPatientId}
            onChange={(e) => setNewPatientId(e.target.value)}
          />
          <button onClick={handleAddPatient}>
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            환자 추가
          </button>
        </div>
      </div>

      <div className="patient-list-container">
        <h1 className="patient-list-title">My 환자 리스트 확인하기</h1>
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
            placeholder="환자 이름 검색"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-4 pr-4 py-2 w-full rounded-lg bg-gray-200"
          />
        </div>

        <ul
          role="list"
          className="flex flex-col divide-y divide-gray-100 justify-center items-center"
        >
          {filteredPatients.length === 0 && (
            <li className="py-5 text-gray-500">검색 결과가 없습니다.</li>
          )}
          {filteredPatients.map((patient, index) => (
            <li key={index} className="py-5">
              <Link to={`/patient/${patient.patientId}`}>
                <div className="flex justify-between items-center">
                  <form
                    className="border rounded-lg p-4"
                    style={{ minWidth: "80vw" }}
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="h-12 w-12 flex-none rounded-full bg-gray-100">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="h-8 w-12 text-gray-300"
                        />
                      </div>

                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {patient.patientName}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          환자 ID: {patient.patientId}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <button
                          onClick={() =>
                            openDeletePatientModal(patient.patientId)
                          }
                          className="text-red-500 hover:text-red-600 ml-2"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span className="ml-1">환자 삭제</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicalsMain;
