import ReviewCard from "./ReviewCard";

const ReviewList = ({reviews, user, editReview, setEditReview, editingId, setEditingId, handleUpdateReview, handleDeleteReview}) => {
    return (
        <div className="space-y-2">
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} user={user} editReview={editReview} setEditReview={setEditReview} onEditClick={()=>{setEditingId(review.id); setEditReview({ratings:review.ratings, comment:review.comment})}} onCancelEdit={()=> setEditingId(null)} isEditing={editingId === review.id} handleUpdateReview={handleUpdateReview} handleDeleteReview={()=>handleDeleteReview(review.id)}/>
            ))}
        </div>
    );
};

export default ReviewList;