import React from 'react';

const blogPosts = [
  {
    title: "Managing Diabetes Effectively",
    doctor: "Dr. Meera Kapoor",
    intro: "Learn how to manage diabetes with expert tips on lifestyle, medication, and diet.",
  },
  {
    title: "Heart Health Tips You Must Know",
    doctor: "Dr. Ramesh Iyer",
    intro: "Discover daily habits and preventive care tips that can keep your heart strong.",
  },
  {
    title: "Back Pain: Causes and Cures",
    doctor: "Dr. Anjali Rao",
    intro: "Understand common causes of back pain and learn what you can do to relieve it.",
  }
];
 
function Hblogs() {
  return (
    <section className="bg-gradient-to-b from-white  to-[#e3f0f7] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Health Insights from Our Experts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((blog, i) => (
            <div
              key={i}
              className="bg-white/30 backdrop-blur-lg border border-blue-100 text-gray-800 
                p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-900">{blog.title}</h3>
              <p className="text-sm text-black mt-2 mb-4">by {blog.doctor}</p>
              <p className="text-sm text-black mb-6">{blog.intro}</p>
              <button className="mt-auto text-blue-700 font-medium hover:underline hover:text-blue-900">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hblogs;
