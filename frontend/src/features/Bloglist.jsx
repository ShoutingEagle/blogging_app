import { useDispatch, useSelector } from "react-redux"
import apiClient from "../services/apiClient.js"
import { baseUrl, blogList } from "../network/endPoints.js"
import { setBlogLists } from "../slices/blogSlice.js"
import { useRef, useEffect, useState, useCallback } from "react"
import { setGlobalError } from "../slices/errorSlice.js"
import { setCursor, setHasMore } from "../slices/systemSlice.js"
import {useNavigate} from "react-router-dom"

const Bloglist = () => {
  const {bloglists} = useSelector(state => state.blog)
  const {tag} = useSelector(state => state.blog)
  const {hasMore,cursor} = useSelector(state => state.system) 
  const dispatch = useDispatch()
  const observerRef = useRef()
  const navigate = useNavigate()
  
  const fetchBlogs = async (val) => {
  try {
    const response = await apiClient({
      method: "POST",
      url: blogList,
      baseURL: baseUrl,
      data: { tag, lastId: cursor, limit: 20 },
      withCredentials: true
    });
    if(!response.success) {
      dispatch(setGlobalError(response.message))
      return
    }
    
    const {blogs,nextCursor} = response.data

    if(val){
      dispatch(setBlogLists(blogs))
    }else{
      const newList = [...bloglists,...blogs]
      dispatch(setBlogLists(newList))
    }
    dispatch(setCursor(nextCursor))
    dispatch(setHasMore(!!nextCursor))

  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    if (bloglists.length === 0) {
    fetchBlogs();
    }
  },[])

  useEffect(() => {
    fetchBlogs(true);
  },[tag])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          fetchBlogs();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [bloglists, hasMore]); 

  const handleClick = (e) => {
    const card =  e.target.closest("[data-id]")
    if(!card){
      // need to fix this global message 
    }
    const blogId = card.getAttribute("data-id")
    navigate(`/blog/${blogId}`)
  }



  

  return (
    <>  
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Articles</h2>
        {bloglists.length===0 ? (
          <div className="flex justify-center items-center w-full text-center">
            <div className="max-w-md p-8 bg-white shadow-lg">
              <span className="text-4xl mb-4 block">📭</span>
              <h3 className="text-2xl text-gray-800 mb-2">No Blogs to Display</h3>
              <p className="text-gray-600">It looks like there are no blogs available right now.</p>
              <p className="text-gray-600">Check back later or create your own!</p>
            </div>
          </div>
          ) : (
          <div className="columns-1 gap-2 md:columns-2 md:gap-2 lg:columns-3 lg:gap-2   2xl:columns-4 2xl:gap-4"
            onClick={handleClick}

          >
            
            {bloglists.map((item,index) => (
              <div
                key={item._id}
                className="w-full mb-6 transition-transform duration-300 ease-in-out shadow-lg bg-white overflow-hidden cursor-pointer hover:scale-[1.03] z-[1]"
                data-id={item._id}
                ref={index === bloglists.length-1 ? observerRef : null}
              >
                <div className="relative">
                <div className="absolute inset-0 flex flex-col justify-between p-2 z-30 ">
                  {/* TOP: User Info */}
                  <div className="flex gap-2">
                    <div className="w-[3rem] h-[3rem] overflow-hidden">
                      <img 
                        src={item.owner.profile_pic}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-white">
                      <div>{item.owner.username}</div>
                      <div>
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM: Title + Category + Sentiment */}
                  <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                      <div className="px-4 py-1 bg-white/20 border border-white/20 rounded-md text-sm font-semibold text-white">
                        {item.category}
                      </div>
                      <div
                        className={`text-sm font-semibold rounded-md text-white px-4 py-1 ${
                          item.sentiment.toLowerCase() === "positive"
                            ? "bg-green-500/30 border border-green-500/50"
                            : item.sentiment.toLowerCase() === "neutral"
                            ? "bg-yellow-500/30 border border-yellow-500/50"
                            : "bg-red-500/30 border border-red-500/50"
                        }`}
                      >
                        {item.sentiment}
                      </div>
                    </div>

                    <div className="text-white text-lg font-semibold mb-2">
                      {item.title}
                    </div>

                  </div>
                </div>

                <div className="absolute inset-0 bg-black/60 z-20"></div>
                <img
                  src={item.article_image}
                  alt="img"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02] z-10"
                />
                </div>

              </div>
            ))}
          </div>
      )}

      
    </>
  )
}

export default Bloglist