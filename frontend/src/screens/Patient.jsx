import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import eximage from "../assets/images/example.png";

const posts = [
  {
    imageId: 1,
    image: eximage,
    createAt: "2023년 9월 3일 11:00 AM",
  },
  {
    imageId: 2,
    image: eximage,
    createAt: "2023년 9월 4일 11:00 AM",
  },
  {
    imageId: 3,
    image: eximage,
    createAt: "2023년 9월 5일 11:00 AM",
  },
  {
    imageId: 4,
    image: eximage,
    createAt: "2023년 9월 6일 11:00 AM",
  },
  {
    imageId: 5,
    image: eximage,
    createAt: "2023년 9월 7일 11:00 AM",
  },
];

export default function PatientMain() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-4 max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            약물 분석 결과
          </h2>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            건강한 삶을 위해 매일 복용하는 약물을 간편하게 기록해보세요.
          </p>
          <div className="mx-auto mt-20 max-w-2xl lg:mx-0 flex gap-4">
            <Link to="/Patient/follow">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
                나의 의료인 관리하기
              </button>
            </Link>
            <Link to="/Patient/Post">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
                분석하러 가기
              </button>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.imageId}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="group relative">
                <div className="flex items-center gap-x-4 text-xs">
                  <img
                    src={post.image}
                    alt=""
                    className="w-16 h-16 rounded-lg"
                  />
                  <h2
                    className="mt-3 text-lg font-semibold leading-8 text-gray-900 group-hover:text-gray-600"
                    style={{ paddingBottom: "20px" }}
                  >
                    <a href={"/patient/result"}>
                      <span className="absolute inset-0" />
                      {post.createAt}
                      <p>뷴석 결과 보기</p>
                    </a>
                  </h2>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
