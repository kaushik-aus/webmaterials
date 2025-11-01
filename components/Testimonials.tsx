"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="container py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 uppercase tracking-wide text-ink">
        What Creators Say
      </h2>

      <div className="max-w-4xl mx-auto relative">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Previous testimonial"
        >
          <svg
            className="w-6 h-6 text-ink"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Testimonial Card */}
        <div className="bg-white rounded-lg shadow-l p-8 md:p-12 transition-all">
          <div className="mb-6">
            <svg
              className="w-12 h-12 text-accent opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="text-lg md:text-xl text-dim mb-8 leading-relaxed italic">
            "{current.content}"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
              {current.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-ink">{current.name}</div>
              <div className="text-sm text-gray-500">{current.role}</div>
            </div>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Next testimonial"
        >
          <svg
            className="w-6 h-6 text-ink"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-accent w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
