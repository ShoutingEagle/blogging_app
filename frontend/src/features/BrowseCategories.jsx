import { useDispatch, useSelector} from "react-redux";
import { setTag } from "../slices/blogSlice";


const categories = [
  { id: 1, name: "View All", tag: "all" },
  { id: 2, name: "Games", tag: "gaming" },
  { id: 3, name: "PC", tag: "pc" },
  { id: 4, name: "Consoles", tag: "consoles" },
];



const BrowseCategories = () => {
  const dispatch = useDispatch()
  const {isUser} = useSelector(state => state.status)
  const handleCategory = (e) => {
    const {tag} = e.target.dataset
    dispatch(setTag(tag))
  }

  if(isUser){
    return (
      <section className="w-full">
        <p className="font-semibold mb-2">Search By Category</p>
        <div className="flex gap-1 md:gap-2" onClick={handleCategory}>
          {categories.map(({ id, name, tag }) => (
            <div
              key={id}
              data-id={id}
              data-name={name}
              data-tag={tag}
              className="flex items-center justify-center cursor-pointer rounded-sm bg-white text-gray-700 hover:scale-[1.03] hover:bg-gray-200 shadow-lg transition-transform duration-300 text-sm sm:text-md font-medium px-2 sm:px-4 sm:py-2"
            >
              {name}
            </div>
          ))}
        </div>
      </section>
    )}else{
      return null
    }
  }
export default BrowseCategories
