import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import homepageVideo from "../assets/homepage.mp4";
import perfumeVideo from "../assets/perfumes.mp4";
import hairVideo from "../assets/hair.mp4";
import faceVideo from "../assets/face.mp4";
import bodyVideo from "../assets/body.mp4";


const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleExplore = () => {
        if (!user) {
            navigate("/login");
        } else {
            console.log("Exploring more features...");
        }
    };

    return (
        <div className="relative w-full h-[400px] bg-fuchsia-50">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            >
                <source src={homepageVideo} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-200 drop-shadow-lg">
                    Afrique Essence
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Elevate your glow – where beauty meets luxury.
                </p>
                <button
                    onClick={handleExplore}
                    className="mt-6 px-6 py-2 bg-purple-800 text-white rounded-full hover:bg-violet-800 transition"
                >
                    Explore Now
                </button>
            </div>

            <div className="py-16 bg-fuchsia-50 text-gray-700">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-purple-800">Meet Our Team</h1>
                    <div className="w-24 h-1 bg-purple-800 mx-auto mt-2 rounded"></div>
                </div>

                {/* Cards */}
                <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-10">
                    {/* Card 1 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Ray</h2>
                        <p className="mt-2"><strong>Manager.</strong><br /> "Leading with style, managing with grace."</p>

                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Milka</h2>
                        <p className="mt-2"><strong>Beautician.</strong><br /> "Creating beauty, enhancing confidence."</p>

                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Elvis</h2>
                        <p className="mt-2"><strong>Sales Associate.</strong><br />"Closing deals with charm and finesse."</p>

                    </div>

                    {/* Card 4 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Natalie</h2>
                        <p className="mt-2"><strong>Front Desk Assistant.</strong><br /> "The face of our salon, welcoming all with a smile."</p>

                    </div>
                </div>
            </div> <hr />

            <div className="bg-fuchsia-50 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-purple-800 mb-4">Best Sellers</h1>
                    <p className="text-gray-600">Explore our top-rated beauty products.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 bg-fuchsia-50">

                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Hair Oil</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Argan Hair Oil</h2>
                            <p className="text-gray-700 text-sm mb-4">Nourishes and strengthens dry, frizzy hair.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  5712 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Lipstick</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Matte Lipstick</h2>
                            <p className="text-gray-700 text-sm mb-4">Long-lasting, bold color for every occasion.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 8342 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Skin Cream</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Hydrating Cream</h2>
                            <p className="text-gray-700 text-sm mb-4">Deep moisture for radiant, glowing skin.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  6787 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Perfume</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Velvet Rose</h2>
                            <p className="text-gray-700 text-sm mb-4">Luxury fragrance with hints of jasmine & rose.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 7497 reviews</strong>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Nail Polish</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Glossy Pink</h2>
                            <p className="text-gray-700 text-sm mb-4">Chip-resistant, high-shine nail polish.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 9794 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Foundation</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Silk Touch</h2>
                            <p className="text-gray-700 text-sm mb-4">Lightweight foundation with full coverage.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  6787 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Face Mask</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Glow Boost Mask</h2>
                            <p className="text-gray-700 text-sm mb-4">Brightens skin and reduces dullness instantly.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  4569 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Body Lotion</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Silken Touch</h2>
                            <p className="text-gray-700 text-sm mb-4">Smooth and soft skin all day long.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 8768 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Serum</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Vitamin C Serum</h2>
                            <p className="text-gray-700 text-sm mb-4">Brightens skin and reduces fine lines.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 7633 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[140px] bg-purple-800 flex items-center justify-center text-white text-sm">Eyeshadow</div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Shimmer Palette</h2>
                            <p className="text-gray-700 text-sm mb-4">Blendable shimmer colors for stunning eyes.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs"> ⭐⭐⭐⭐✩  6787 reviews</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div><hr />

            {/*categories*/}
            <div className="bg-fuchsia-50 py-16 ">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-purple-800 mb-4">Categories</h1>
                    <p className="text-gray-600">Explore our top-rated beauty products.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-fuchsia-50">
                    {/* Card 1 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={hairVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold text-purple-800 mb-2">Hair & Beard</h2>
                            <p className="text-gray-700 text-sm mb-4">Nourishes and strengthens dry, frizzy hair.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">Amazing strong and healthy hair</strong>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={faceVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold text-purple-800 mb-2">Face</h2>
                            <p className="text-gray-700 text-sm mb-4">Long-lasting, bold color for every occasion.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">Amazing glow and radiance</strong>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={bodyVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold text-purple-800 mb-2">Body</h2>
                            <p className="text-gray-700 text-sm mb-4">Deep moisture for radiant, glowing skin.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">Amazing hydration and nourishment</strong>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={perfumeVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold text-purple-800 mb-2">Fragrance</h2>
                            <p className="text-gray-700 text-sm mb-4">Luxury fragrance with hints of jasmine & rose.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">Amazing scent and radiance</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <hr />

            {/*Reviews*/}
            <div className="py-16 bg-fuchsia-50 text-gray-700">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-purple-800">Reviews</h1>
                    <div className="w-24 h-1 bg-purple-800 mx-auto mt-2 rounded"></div>
                </div>

                {/* Cards */}
                <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-10">
                    {/* Card 1 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                                alt="Ray"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Winston</h2>
                        <p className="mt-2"><strong>"Absolutely love it!"</strong> <br />
                            The Argan Hair Oil has completely transformed my hair—it's softer, shinier, and smells amazing. I'll definitely be reordering!
                            <br />— Winston M."</p>

                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://cdn.expertphotography.com/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                                alt="Milka"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Linda</h2>
                        <p className="mt-2"><strong>"Great but a bit pricey"</strong><br />
                            I adore the Velvet Rose perfume. It lasts all day and I always get compliments. Just wish it was a little more affordable.<br />
                            — Linda K.</p>

                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Elvis"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Nina</h2>
                        <p className="mt-2"><strong>"Perfect matte finish!"</strong><br />
                            The Matte Lipstick glides on smoothly and stays put all day without drying out my lips. Highly recommend!<br />
                            — Nina N.</p>

                    </div>

                    {/* Card 4 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://images.squarespace-cdn.com/content/v1/5aee389b3c3a531e6245ae76/1628444769450-0AAE0PZIJ0K03LXI66JB/Franklin_Knox_Headshots+%283%29.jpg"
                                alt="Natalie"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Tyrone</h2>
                        <p className="mt-2"><strong>"My skin has never felt better"</strong><br />
                            The Hydrating Cream is my holy grail! I've struggled with dry patches for years, and this gave me glowing skin in just a week.<br />
                            — Tyrone W.</p>

                    </div>
                </div>
            </div> <hr />


            {/*location*/}
            <div className="w-full bg-fuchsia-50 py-16">
                <div className="max-w-6xl mx-auto px-6 py-16 bg-fuchsia-50">
                    <h2 className="text-5xl font-bold text-purple-800 mb-10 text-center">Our Location</h2>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Google Map */}
                        <div className="flex-1 h-[400px] rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                title="shop-location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.093715999743!2d36.8219461!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d98a3d4f3d%3A0x5091b41bdf79c2f0!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1629734519384!5m2!1sen!2ske"
                                width="800%"
                                height="100%"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Contact Info */}
                        <div className="flex-1 bg-purple-50 p-8 rounded-xl shadow-lg space-y-5 ">
                            <h3 className="text-2xl font-semibold text-purple-800">Visit or Contact Us</h3>
                            <p className="text-gray-700">
                                <strong>Address:</strong><br />
                                Beauty Haven Store, Kimathi Street, Nairobi, Kenya
                            </p>
                            <p className="text-gray-700">
                                <strong>Phone:</strong><br />
                                +254 789 767 893
                            </p>
                            <p className="text-gray-700">
                                <strong>Email:</strong><br />
                                contact@afriqueessence.co.ke
                            </p>
                            <p className="text-gray-700">
                                <strong>Opening Hours:</strong><br />
                                Mon – Sat: 9:00 AM – 7:00 PM<br />
                                Sun: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;

