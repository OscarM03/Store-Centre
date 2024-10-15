const Button = ({ label, onClick }) => {
    return (
            <button 
                className="text-xiaomi-color font-bold border border-gray-400 py-1 px-2 hover:border-xiaomi-color hover:text-gray-400 cursor-pointer"
                onClick={onClick ? onClick : undefined}
            >
                {label}
            </button>
    );
};

export default Button;

