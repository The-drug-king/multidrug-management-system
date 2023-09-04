import React from "react";
import { Link } from "react-router-dom";

const people = [
  {
    name: "윤서영",
    patientId: "id_123",
    email: "michael.foster@example.com",
    birthYear: "1999",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "허건혁",
    patientId: "12345",
    email: "michael.foster@example.com",
    birthYear: "1999",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "김재윤",
    patientId: "12345",
    email: "michael.foster@example.com",
    age: "43세",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "30days ago",
    lastSeenDateTime: "2023-09-03",
  },
  {
    name: "이창희",
    patientId: "12345",
    email: "michael.foster@example.com",
    birthYear: "1999",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "바다",
    patientId: "12345",
    email: "michael.foster@example.com",
    birthYear: "1999",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "새우",
    patientId: "12345",
    email: "michael.foster@example.com",
    birthYear: "1999",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const MedicalsMain = () => {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100"
      style={{ padding: "20px 30px 20px 20px" }}
    >
      {people.map((person) => (
        <li key={person.patientNumber} className="py-5">
          <Link to={`/PatientMain/${person.patientId}`}>
            <div className="flex justify-center">
              <form
                className="border rounded-lg p-4"
                style={{ minWidth: "650px" }}
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={person.imageUrl}
                    alt=""
                  />

                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      환자 ID: {person.patientId}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Email: {person.email}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Birth Year: {person.birthYear}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MedicalsMain;
