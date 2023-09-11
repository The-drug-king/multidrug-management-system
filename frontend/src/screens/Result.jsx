import React from "react";
import { Link } from "react-router-dom";
import eximage from "../assets/images/example.png";

const Result = () => {
  const pillInfo = {
    pillNames: "타이레놀" + ", 게보린",
    pilldescripe: "어찌저찌",
    duplepill: "중복성분",
  };

  return (
    <div style={{ margin: "100px" }}>
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900">
          분석결과
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          2023년 9월 1일 11:00 AM
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              포함 약물
            </dt>
            <dd className="mt-1 text-lg leading-7 text-gray-700 sm:col-span-2 sm:mt-0">
              {pillInfo.pillNames}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              약물 정보
            </dt>
            <dd className="mt-1 text-lg leading-7 text-gray-700 sm:col-span-2 sm:mt-0">
              {pillInfo.pilldescripe}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              중복성분
            </dt>
            <dd className="mt-1 text-lg leading-7 text-gray-700 sm:col-span-2 sm:mt-0">
              {pillInfo.duplepill}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6">
        <Link to="/Patient" className="text-blue-500 hover:underline">
          Go to main
        </Link>
      </div>
    </div>
  );
};

export default Result;
