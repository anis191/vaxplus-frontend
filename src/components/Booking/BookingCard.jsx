
const BookingCard = ({ icon: Icon, label, value, iconColor = "text-gray-500" }) => (
  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border border-gray-200 text-sm">
    <Icon className={`${iconColor} h-5 w-5`} />
    <div className="flex-1">
      <span className="text-gray-600 font-medium">{label}</span>
      <p className="text-gray-800 truncate">{value || "N/A"}</p>
    </div>
  </div>
)

export default BookingCard;