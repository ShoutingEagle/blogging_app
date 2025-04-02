import React from "react";
import "../cssFiles/HomeFeed.css"

const dummyData = [
    { id: 1, title: "Gaming Setup", img: "https://img.freepik.com/free-photo/aerial-view-mountain-covered-fog-beautiful-pink-sky_181624-4676.jpg?semt=ais_hybrid" },
    { id: 2, title: "PC Build", img: "https://img.freepik.com/free-photo/floral-illustration-nature-with-abstract-backgrounds-generated-by-ai_188544-15694.jpg?semt=ais_hybrid" },
    { id: 3, title: "Console Gaming", img: "https://img.freepik.com/premium-vector/sunset-field-silhouette-deer-birds-trees-grass_7993-3210.jpg?semt=ais_hybrid" },
    { id: 4, title: "Gaming Chair", img: "https://img.freepik.com/free-photo/vertical-shot-curvy-road-forest-covered-yellowing-trees-dried-leaves-autum_181624-58749.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 5, title: "RGB Setup", img: "https://img.freepik.com/free-vector/gradient-abstract-mountain-background-design_23-2149178796.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 6, title: "Streaming", img: "https://img.freepik.com/free-photo/beautiful-view-mesmerizing-nature-traditional-styled-japanese-adelaide-himeji-gardens_181624-46195.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 7, title: "Streaming", img: "https://img.freepik.com/free-photo/empty-dark-room-modern-futuristic-sci-fi-background-3d-illustration_35913-2332.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 8, title: "Streaming", img: "https://img.freepik.com/premium-photo/exotic-oriental-pattern-with-peacocks-flowers-bright-colors-generative-ai_190619-5653.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 9, title: "Streaming", img: "https://img.freepik.com/premium-photo/blue-leaves_73485-273.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 10, title: "Streaming", img: "https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957913.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 11, title: "Streaming", img: "https://img.freepik.com/premium-photo/art-wallpaper-golden-turquoise-mountains-triangles-with-deer-tree-birds-white-background_216426-96.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 12, title: "Streaming", img: "https://img.freepik.com/free-photo/misty-julian-alps-peak-round-badge_53876-153331.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 13, title: "Streaming", img: "https://img.freepik.com/free-vector/silhouette-deer-night-forest_1308-14338.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 14, title: "Streaming", img: "https://img.freepik.com/free-vector/tropical-vibes-poster_53876-91286.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 15, title: "Streaming", img: "https://img.freepik.com/free-vector/realistic-monochromatic-tropical-leaves-background_52683-31304.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 16, title: "Streaming", img: "https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148944138.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 17, title: "Streaming", img: "https://img.freepik.com/free-photo/view-misty-krossanesfjall-mountain-iceland_53876-138118.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 18, title: "Streaming", img: "https://img.freepik.com/free-photo/yellow-autumn-fern-branches-green-forest-generated-by-ai_188544-10191.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 19, title: "Streaming", img: "https://img.freepik.com/free-vector/realistic-blurred-spring-wallpaper_23-2148825652.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 20, title: "Streaming", img: "https://img.freepik.com/free-vector/hand-painted-watercolor-nature-background_23-2148941603.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 21, title: "Streaming", img: "https://img.freepik.com/free-photo/bird-s-eye-mountain_198169-185.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 22, title: "Streaming", img: "https://img.freepik.com/premium-vector/silhouette-forest-landscape-background_1308-72627.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 23, title: "Streaming", img: "https://img.freepik.com/premium-vector/silhouette-forest-landscape-background_1308-72627.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 24, title: "Streaming", img: "https://img.freepik.com/free-photo/beautiful-scenery-road-forest-with-lot-colorful-autumn-trees_181624-31720.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },
    { id: 25, title: "Streaming", img: "https://img.freepik.com/premium-photo/abstract-landscape-background-golden-modern-wallpaper-modern-art-wall-murals-carpet-fashion_705737-1566.jpg?ga=GA1.1.324683741.1743191558&semt=ais_hybrid" },

];


const HomeFeed = () => {
    return (
        <div className="home-feed">
            <div className="masonry-grid">
                {dummyData.map((item, index) => (
                    // <div key={item.id} className="masonry-item">
                    <img src={item.img} alt={item.title} className="masonry-image" key={index} />
                    // <p className="masonry-title">{item.title}</p>
                    // </div>
                ))}
            </div>
        </div>
    );
};
export default HomeFeed;
