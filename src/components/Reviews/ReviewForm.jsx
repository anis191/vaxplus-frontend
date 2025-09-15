import { useForm } from "react-hook-form";
import Rating from "./Rating"

const ReviewForm = ({onSubmit}) => {
  const { register, handleSubmit, setValue, watch, formState:{errors,isSubmitting} } = useForm();
  const ratingValue = watch("rating", 0)

  return (
    <div className="card bg-white shadow-sm border border-gray-200 rounded-lg p-3 my-3 max-w-md mx-auto">
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Rating
          </label>
          <div className="scale-90 origin-left">
            <Rating 
              onChange={(value) => setValue("rating", value, { shouldValidate: true, shouldDirty: true })} 
              rating={ratingValue}/>
          </div>
          <input type="hidden" {...register("rating",{ required: "Rating is required" })} />
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Your Review
          </label>
          <textarea
            {...register("comment",{ required: "Comment is required" })}
            className="w-full textarea textarea-bordered h-16 rounded-md border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            placeholder="Write a short review..."/>
          {errors.comment && (
            <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="btn btn-primary btn-sm px-3 rounded-md"
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm mr-1"></span>
                Submitting...
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ReviewForm;
