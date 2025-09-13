// import React from 'react';

const EditButton = ({isEditing, setIsEditing, children, isSubmitting}) => {
    return (
        <div className="text-center">
            {isEditing ? (
                <div className="space-x-2">
                    <button type="submit" className="btn btn-outline btn-primary" disabled={isSubmitting}>{isSubmitting ? "Saving" : "Save Change"}</button>
                    <button onClick={()=>setIsEditing(false)} className="btn btn-outline btn-error">Cancel</button>
                </div>
            ) : (
                <button onClick={()=>setIsEditing(true)} className="btn btn-outline btn-primary">{children}</button>
            )}
        </div>
    );
};

export default EditButton;