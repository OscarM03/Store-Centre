const QualityFeaturesCard = ({title, description, image}) => {
    return (
        <div className="border border-xiaomi-color  rounded-lg bg-gradient-bg bg-center bg-cover relative -z-20 group">
            {/* <div className="absolute bg-dark-bg right-0 left-0 top-0 bottom-0 bg-opacity-80 -z-10 group-hover:bg-opacity-50"></div> */}
            <div className="bg-dark-bg bg-opacity-80">
                <h1 className=" text-2xl text-center font-medium pt-4 text-xiaomi-color z-20">
                    {title}
                </h1>
                <div className=" text-white font-semibold text-[16px] p-2 text-center z-50">
                    <p>
                    {description}
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <img src={image} alt="Redmi Camera" width={200} />
                </div>
            </div>
        </div>
    );
};

export default QualityFeaturesCard;
