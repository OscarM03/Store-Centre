import { DeliveryIcon, PriceIcon, QualityIcon, SupportIon } from "../constants"

const Assuarance = () => {
    return (
        <section className="container max-xl:hidden">
            <div className="bg-lighter-dark-bg mt-10 rounded-md">
            <div className="flex justify-between mx-20">
                <div className="flex justify-center items-center gap-4">
                    <img src={DeliveryIcon} alt="Delivery Truck" width={90}/>
                    <div>
                        <h1 className="text-lg text-xiaomi-color font-semibold">Timely Delivery</h1>
                        <p className="text-gray-400">CountryWide</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <img src={QualityIcon} alt="Delivery Truck" width={80}/>
                    <div>
                        <h1 className="text-lg text-xiaomi-color font-semibold">Quality Products</h1>
                        <p className="text-gray-400">With Warranty</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <img src={PriceIcon} alt="Delivery Truck" width={80}/>
                    <div>
                        <h1 className="text-lg text-xiaomi-color font-semibold">Amazing Discounts</h1>
                        <p className="text-gray-400">And Offers</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <img src={SupportIon} alt="Delivery Truck" width={80}/>
                    <div>
                        <h1 className="text-lg text-xiaomi-color font-semibold">VIP Support</h1>
                        <p className="text-gray-400">24/7</p>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default Assuarance

