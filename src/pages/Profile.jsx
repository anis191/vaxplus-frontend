import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import useAuthContext from "../hooks/useAuthContext";
import EditButton from "../components/Dashboard/Profile/EditButton";
import ChangePasswordForm from "../components/Dashboard/Profile/ChangePasswordForm.jsx"

const Profile = () => {
    const {user, updateUserProfile, changePassword, errorMsg} = useAuthContext()
    const[isEditing, setIsEditing] = useState(false)
    const {register, watch, setValue, handleSubmit, formState:{errors,isSubmitting}} = useForm()
    const[successMsg, setSuccessMsg] = useState("")

    useEffect(()=>{
        Object.keys(user).forEach((key)=> setValue(key, user[key]))
        console.log(user)
    },[user, setValue])

    const onSubmit = async (data) => {
        const profilePayload = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            address: data.address,
            phone_number: data.phone_number
        }
        try{
            // Profile update:
            const response = await updateUserProfile(profilePayload)
            if(response.success){
                setSuccessMsg("Update Profile successfully")
                setIsEditing(false)
                setTimeout(()=> setSuccessMsg(""), 3000)
            }
            // Password Update:
            if(data.current_password && data.new_password){
                const response = await changePassword({current_password:data.current_password, new_password:data.new_password})
                if(response.success){
                    setSuccessMsg("Update Password successfully")
                    setIsEditing(false)
                    setTimeout(()=> setSuccessMsg(""), 3000)
                }
            }
        }catch(error){console.log(error)}
    };

    return (
        <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Profile Info</h2>

                {errorMsg && <span className="text-error font-bold mx-auto">{errorMsg}</span>}
                {successMsg && (
                    <div role="alert" className="alert alert-success alert-soft">
                      <span className="font-bold">
                        {successMsg}
                      </span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ProfileForm register={register} errors={errors} isEditing={isEditing}/>
                    <ChangePasswordForm register={register} errors={errors} watch={watch} isEditing={isEditing}/>
                    <EditButton isEditing={isEditing} setIsEditing={setIsEditing} isSubmitting={isSubmitting}>Edit Profile</EditButton>
                </form>
            </div>
        </div>
    );
};

export default Profile;