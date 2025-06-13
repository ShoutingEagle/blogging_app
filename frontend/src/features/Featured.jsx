import { useSelector } from "react-redux";
import featured from "../assets/featured.png";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const {isProfileComplete} = useSelector(state => state.status)
  const navigate = useNavigate()

    const handleClick = (e) => {
    navigate(`/blog/684afd72cc55bf20ee32dfd4`)

  }
  return (
    <div className={`relative h-[25rem] lg:w-[1050px] xl:w-[1250px] 2xl:w-[1450px] overflow-hidden rounded-2xl shadow-lg` }>
      <img src={featured} alt="Featured" className="w-full h-full object-cover brightness-75" />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-10 text-white">
        <div className="mb-2 flex items-center gap-4 text-sm uppercase tracking-wide text-orange-400 font-semibold">
          <span className="bg-orange-500/30 px-2 py-1 rounded">Featured</span>
          <span className="bg-green-500/30 px-2 py-1 rounded">Rating: 4.8/5</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
          Grand Theft Auto VI
        </h2>

        <p className="text-sm md:text-base text-gray-100 max-w-2xl mb-4 leading-relaxed">
          “GTA 6 Is Official: Story, Setting, Characters, and Why It Might Redefine Open-World Gaming”
        </p>

        <div className="flex items-center gap-4 text-sm sm:text-base  mb-6 font-medium text-gray-300">
          <span className="bg-white/10 px-3 py-1 ">Releasing Mid 2026</span>
          <span className="bg-white/10 px-3 py-1 ">Open World</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-5 py-2 bg-orange-600 hover:bg-orange-700 transition-all duration-300 rounded-md text-sm font-semibold">
            <a href="https://www.youtube.com/embed/QdBZY2fkU-0?si=RMisjIrVI9TY3CXj" target="_blank">
              🎬 Watch Trailer
            </a>
          </button>
          <button onClick={handleClick} className="px-5 py-2 bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 rounded-md text-sm font-semibold text-white cursor-pointer">
            📰 Read Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
