import PropTypes from 'prop-types';

const TabletsCard = ({
  image,
  name,
  f_1,
  f_2,
  f_3,
  current_price,
  original_price,
  id,
  discount,
}) => {
  return (
    <div className="relative flex justify-center items-center border-2 rounded-lg border-gray-400 max-md:gap-20 max-sm:gap-2">
      <a href={`/product-details/${id}`}>
        <div>
            <img src={image} alt="" width={210} />
        </div>
      </a>
      <div className="">
        <a href={`/product-details/${id}`}><h1 className="text-xiaomi-color text-xl font-bold">{name}</h1></a>
        <h1 className="text-gray-400 font-semi-bold">{f_1}</h1>
        <h1 className="text-gray-400 font-semi-bold">{f_2}</h1>
        <h1 className="text-gray-400 font-semi-bold">{f_3}</h1>
        <h1 className="text-xiaomi-color font-bold text-xl">
          Ksh {parseFloat(current_price).toLocaleString()}
        </h1>
        <h1 className="line-through text-gray-400 text-sm font-bold">
          Ksh {parseFloat(original_price).toLocaleString()}
        </h1>
      </div>
      <div className="absolute right-1 top-0"> 
                <p className="text-xiaomi-color text-sm font-bold">-{discount}%</p>
            </div>
    </div>
  );
};
TabletsCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    f_1: PropTypes.string.isRequired,
    f_2: PropTypes.string.isRequired,
    f_3: PropTypes.string.isRequired,
    current_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    original_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    discount: PropTypes.number.isRequired,
  };

export default TabletsCard;
