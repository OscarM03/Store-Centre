

const Footer = () => {
    return (
        <section className="container relative bottom-0">
            <div className="border-t mx-20 mt-20 text-gray-400 flex py-6 border-b max-md:flex-col max-md:items-center max-md:mx-10">
                <div className="flex justify-around w-[50%] max-md:justify-center max-md:gap-40  v max-sm:text-center max-sm:gap-10">
                    <div>
                        <p>At SmartMobiCell, our customers are our top priority. <br />We are dedicated to providing
                            exceptional service <br />and support to meet your needs.
                            Contact us today and <br />experience our commitment to your satisfaction.</p>
                        <h1 className="mt-2 text-white"><span className="text-xiaomi-color">Email:</span> smartmobicell@gmail.com</h1>
                        <h1 className="mt-2 text-white"><span className="text-xiaomi-color">Phone No.</span>+254 723456723</h1>
                    </div>
                    <div>
                        <h1 className="text-xiaomi-color font-semibold pb-2">Categories</h1>
                        <ul>
                            <li className="pb-2">SmartPhones</li>
                            <li className="pb-2">Laptops</li>
                            <li className="pb-2">Watches</li>
                            <li className="pb-2">Screens</li>
                            <li>HeadPhones</li>
                        </ul>
                    </div>
                </div>
                <div className="flex  gap-24 w-[50%] justify-center max-md:mt-10 max-md:gap-60  max-sm:text-center max-sm:gap-20">
                    <div>
                        <h1 className="text-xiaomi-color font-semibold pb-2">About Us</h1>
                        <ul>
                            <a href="/all"><li className="pb-2">All Products</li></a>
                            <a href="/profile"><li className="pb-2">My Account</li></a>
                            <li className="pb-2">About Us</li>
                            <li className="pb-2">Privacy Policy</li>
                            <li>Terms and Conditions</li>
                        </ul>
                    </div>
                    <div>
                    <h1 className="text-xiaomi-color font-semibold pb-2">Reach Us Here</h1>
                    <ul>
                            <li className="pb-2">Facebook</li>
                            <li className="pb-2">X</li>
                            <li className="pb-2">Instagram</li>
                            <li>Tiktok</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h1 className="text-gray-400 text-center py-1 text-sm">All Rights Reserved SmartMobicell@2024</h1>
        </section>
    )
}

export default Footer
