import React from "react";

const reviews = [
  {
    id: 1,
    user: "Alex Johnson",
    title: "Amazing Gameplay!",
    text: "The graphics were stunning and the gameplay was so smooth. 10/10 would recommend.",
    rating: 5,
    image: "https://via.placeholder.com/100", // Replace with your local or actual image
  },
  {
    id: 2,
    user: "Emily Carter",
    title: "Fun but short",
    text: "Loved the story and characters, but it ended too soon for me.",
    rating: 4,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    user: "Michael Lee",
    title: "Too many bugs",
    text: "Had a decent concept, but I faced several game-breaking bugs.",
    rating: 2,
    image: "https://via.placeholder.com/100",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="text-yellow-400 text-sm">
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? "★" : "☆"
      ).join(" ")}
    </div>
  );
};

const LatestReviews = () => {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Latest Reviews</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map(({ id, user, title, text, rating, image }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={image}
                alt={user}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{user}</h4>
                <StarRating rating={rating} />
              </div>
            </div>
            <h5 className="text-md font-semibold text-gray-700">{title}</h5>
            <p className="text-sm text-gray-600 mt-1">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
