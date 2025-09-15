import { FaStar } from "react-icons/fa";
import EditReview from "./EditReview.jsx"

const ReviewCard = ({review, user, editReview, setEditReview, onEditClick, isEditing, onCancelEdit, handleUpdateReview, handleDeleteReview}) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border border-base-200 rounded-xl overflow-hidden">
      <div className="card-body">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <p className="font-semibold">{review.name}</p>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-yellow-400" :"text-gray-300"} />
                ))}
              </div>
            </div>
          </div>

          {user && user.id === review.user_id && (
          <div className="flex gap-2">
            <button onClick={onEditClick} className="btn btn-sm btn-outline btn-primary">Edit</button>
            <button onClick={handleDeleteReview} className="btn btn-sm btn-outline btn-error">Delete</button>
          </div>)}
        </div>
        {isEditing ? (
          <EditReview editReview={editReview} setEditReview={setEditReview} onCancelEdit={onCancelEdit} onSaveEdit={()=> handleUpdateReview(review.id)}/>
        ): (
          <div className="mt-4">
            <p className="leading-relaxed whitespace-pre-line">{review.comment}</p>
          </div>)}
      </div>
    </div>
  );
};

export default ReviewCard;