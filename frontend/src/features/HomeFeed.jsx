import BrowseCategories from "./BrowseCategories.jsx";
import LatestReviews from "./LatestReviews.jsx";
import Bloglist from "./Bloglist.jsx";

const HomeFeed = () => {
  return (
    <div className="px-4 flex flex-col gap-10 sm:gap-20 max-w-[1450px] m-auto min-h-screen justify-center pt-5 pb-1 md:pt-25 md:pb-5">
      <BrowseCategories/>
      <Bloglist/>
      <LatestReviews/>
    </div>
  );
};

export default HomeFeed;
