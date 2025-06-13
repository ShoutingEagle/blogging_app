import React from "react";

const articles = [
  {
    id: 1,
    title: "The Evolution of Open-World Games",
    description: "How open-world design has reshaped the gaming industry.",
    type: "feature",
  },
  {
    id: 2,
    title: "Top 10 RPGs of the Decade",
    description: "A countdown of the most influential RPGs from 2015 to 2025.",
    type: "grid",
  },
  {
    id: 3,
    title: "Building Realistic AI in Games",
    description: "How developers are pushing NPC intelligence to the next level.",
    type: "grid",
  },
  {
    id: 4,
    title: "Best Indie Games You Missed",
    description: "Hidden gems that deserve your attention.",
    type: "grid",
  },
  {
    id: 5,
    title: "Graphics vs Gameplay",
    description: "Why visual fidelity isn't everything.",
    type: "grid",
  },
  {
    id: 6,
    title: "Gaming on a Budget in 2025",
    description: "How to build a great experience without breaking the bank.",
    type: "feature",
  },
];

const FeaturedArticles = () => {
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-semibold text-black mb-6">Featured Articles</h2>

      <div className="grid grid-cols-4 grid-rows-2 gap-4 text-white">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={`${
              article.type === "feature"
                ? "row-span-2 p-5 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]"
                : "p-4 bg-gradient-to-br from-[#1c1c1c] to-[#2b2b2b]"
            } rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300 ${
              index === 0 ? "col-span-1" : index === 5 ? "col-start-4 col-span-1 row-span-2" : ""
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-300">{article.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
