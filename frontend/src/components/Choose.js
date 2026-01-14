import React from 'react';

function Choose() {
  return (
<section className="mt-[-20px] bg-gradient-to-b from-[#d6e9f3] to-[#e9f3f8] py-20">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#2c6e91] relative inline-block">
      Why Choose HopeCare Hospital?
      <span className="block w-24 h-1 bg-[#b3d7eb] mx-auto mt-2 rounded-full"></span>
    </h2>

    <div className="space-y-8">
      {[
        "At HopeCare Hospital, we believe that healing begins with hope — and we’re here to walk with you every step of the way. Whether you're managing a chronic condition, recovering from surgery, or simply striving for a healthier tomorrow, we’re committed to your well-being with personalized, compassionate care.",
        "Backed by advanced medical technology, internationally recognized specialists, and a deeply human approach to healthcare, we’ve created an environment where quality meets comfort. Our holistic care programs, patient-first philosophy, and 24/7 emergency services ensure that you're not just treated — you're understood, supported, and empowered.",
        "Because at HopeCare, we don’t just treat illness — we restore lives, dignity, and independence."
      ].map((text, index) => (
        <p
          key={index}
          className="text-lg md:text-xl leading-relaxed text-[#3a5e74] bg-white/40 backdrop-blur-sm border border-white shadow-md rounded-xl px-6 py-5"
        >
          {text}
        </p>
      ))}
    </div>

    <blockquote className="mt-12 text-2xl md:text-3xl font-semibold italic text-[#2c6e91] bg-white/50 backdrop-blur-sm inline-block px-8 py-4 rounded-xl border border-white shadow">
      "Live without pain and get back to being you."
    </blockquote>

    <div className="mt-10">
      <button className="bg-[#c1e3f0] text-[#2b6e8d] font-medium px-6 py-3 rounded-full hover:bg-[#d6edf5] transition">
        Meet Our Specialists
      </button>
    </div>
  </div>
</section>

  );
}

export default Choose;
