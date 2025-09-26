
const StatCard = ({ title, value, color }) => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className={`text-3xl font-bold ${color}`}>${value}</p>
        </div>
    );
};

export default StatCard;
