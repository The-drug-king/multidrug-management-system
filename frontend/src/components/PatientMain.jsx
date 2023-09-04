import React from "react";
import eximage from "../assets/example.png";

const posts = [
  {
    id: 1,
    title: "2023년 9월 3일 11:00 AM",
    href: "#",
    image: eximage,
    description: "여기에 뭐가 들어오지?",
  },
  {
    id: 2,
    title: "2023년 9월 4일 11:00 AM",
    href: "#",
    image: eximage,
    description: "여기에 뭐가 들어오지?",
  },
  {
    id: 3,
    title: "2023년 9월 5일 11:00 AM",
    href: "#",
    image: eximage,
    description: "여기에 뭐가 들어오지?",
  },
  {
    id: 4,
    title: "2023년 9월 6일 11:00 AM",
    href: "#",
    image: eximage,
    description: "여기에 뭐가 들어오지?",
  },
];

export default function PatientMain() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            약물 분석 결과
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            약물 복용 분석 결과 리스트 입니다.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="group relative">
                <h3
                  className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                  style={{ paddingBottom: "20px" }}
                >
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <div className="flex items-center gap-x-4 text-xs">
                  <img
                    src={post.image}
                    alt=""
                    className="w-16 h-16 rounded-lg"
                  />
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
