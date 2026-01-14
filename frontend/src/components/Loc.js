import React from 'react'

function Loc() {
  return (
    <section className="bg-gradient-to-b from-[#e9f3f8] to-white py-12">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8 text-black">
      Our Maharashtra Branches
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[
        { city: "Mumbai", info: "Flagship multispecialty hospital" },
        { city: "Pune", info: "Advanced orthopedic & neuro care" },
        { city: "Nagpur", info: "Cardiac and trauma excellence" },
        { city: "Nashik", info: "Family health & wellness center" },
        { city: "Aurangabad", info: "Diagnostics and day care" },
        { city: "Solapur", info: "24/7 emergency & maternity care" }
      ].map((branch, index) => (
        <div
          key={index}
          className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition duration-300 border border-blue-100"
        >
          <h3 className="text-xl font-semibold text-blue-700">{branch.city}</h3>
          <p className="text-sm text-gray-600 mt-2">{branch.info}</p>
        </div>
      ))}
    </div> 
  </div>
</section>

  )
}

export default Loc