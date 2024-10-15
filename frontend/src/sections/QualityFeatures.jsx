import QualityFeaturesCard from "../components/QualityFeaturesCard"
import { QualityFeaturesList } from "../utils"

const QualityFeatures = () => {
    return (
        <section className="container">
            <div className="mx-20 max-md:mx-10 max-sm:mx-3">
                <div className="text-center  font-bold">
                    <h1 className="text-xiaomi-color text-2xl"> <span className="text-white">Tech</span> Mastery</h1>
                    <p className="text-gray-400">Explore the powerful innovations in Xiaomi products</p>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {QualityFeaturesList.map((item) => (
                        <>
                            <QualityFeaturesCard 
                            title = {item.title}
                            description = {item.description}
                            image = {item.image}
                            />
                        </>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default QualityFeatures
