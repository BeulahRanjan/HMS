import React from 'react';

const testimonials = [
  {
    name: "Amit Verma",
    feedback:
      "After my spinal surgery, I never thought I’d be able to walk without pain again. Thanks to the expert care and consistent support from the doctors here, I’ve not only recovered — I’ve returned to an active lifestyle. Truly world-class service and compassion!"
  },
  {
    name: "Priya Sinha",
    feedback:
      "My mother received exceptional cardiac care during her bypass surgery. The entire team was professional, reassuring, and attentive. We felt supported at every step. Forever grateful for the warmth and expertise shown to my family."
  },
  {
    name: "Rahul Das",
    feedback:
      "From my first consultation to post-surgery rehabilitation, the hospital staff treated me with respect and kindness. Their attention to detail and personal care made a huge difference in my recovery. Highly recommend this hospital for anyone seeking quality treatment."
  },
  {
    name: "Anjali Menon",
    feedback:
      "The maternity care here was phenomenal. As a first-time mother, I was nervous, but the doctors and nurses made the experience smooth and joyful. The delivery process, the NICU, and the follow-ups were handled with great care."
  },
  {
    name: "Kiran Jadhav",
    feedback:
      "I was admitted for an emergency procedure and within minutes, the team was fully in action. The hospital is well-equipped and extremely organized. Their quick response saved my life. I will never forget their efforts and kindness."
  }
];

function Ptest() {
  return (
    <section className="  bg-gradient-to-b from-[#cae2ef]  to-[#e9f3f8] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          What Our Patients Say
        </h2>

        <div className="grid grid-cols-6 gap-8">
          {/* Row 1 */} 
          <div className="col-span-2">
            <TestimonialCard {...testimonials[0]} />
          </div>
          <div className="col-span-2">
            <TestimonialCard {...testimonials[1]} />
          </div>
          <div className="col-span-2">
            <TestimonialCard {...testimonials[2]} />
          </div>

          {/* Row 2 */}
          <div className="col-span-1"></div> {/* Spacer for staggered layout */}
          <div className="col-span-2">
            <TestimonialCard {...testimonials[3]} />
          </div>
          <div className="col-span-2">
            <TestimonialCard {...testimonials[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, feedback }) {
  return (
    <div
      className="bg-white/20 backdrop-blur-md border border-white/30 text-black 
        p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full"
    >
      <p className="italic mb-4">"{feedback}"</p>
      <p className="text-black font-semibold">- {name}</p>
    </div>
  );
}

export default Ptest;
