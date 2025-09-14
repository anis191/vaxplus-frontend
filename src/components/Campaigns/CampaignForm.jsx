import { Controller, useForm } from "react-hook-form";
import useFetchDoctors from "../../hooks/useFetchDoctors";
import useFetchVaccines from "../../hooks/useFetchVaccines";
import useFetchCategories from "../../hooks/useFetchCategories";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";

const AddCampaign = ({ campaign, cDoctors }) => {
  // if(!campaign || !cDoctors){return(<span>Loading</span>)}
  // {!campaign || !cDoctors && (<p>Loading....</p>)}
  const isEdit = Boolean(campaign);
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [bannerPreview, setBannerPreview] = useState("");

  const {doctors} =  useFetchDoctors()
  const {vaccines} =  useFetchVaccines()
  const {categories} =  useFetchCategories()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({defaultValues: campaign || {}});

  useEffect(() => {
  if (!campaign) return;
  console.log(cDoctors)
  console.log(campaign)
  setValue("title", campaign.title || "");
  setValue("description", campaign.description || "");
  setValue("category", campaign.category || "");
  setValue("vaccine", campaign.vaccine_details?.map(v => v.id) || []);
  setValue("doctor", cDoctors?.map(d => d.id) || []);
  setValue("is_premium", campaign.is_premium || false);
  setValue("registration_fee", campaign.registration_fee || "");
  setValue("start_date", campaign.start_date?.slice(0,10) || "");
  setValue("end_date", campaign.end_date?.slice(0,10) || "");
  setValue("status", campaign.status || "Upcoming");

  if (campaign.banner) {
    setBannerPreview(campaign.banner);
  }
}, [campaign, setValue, cDoctors]);

  const handleProductAdd = async (data) => {
  if (!images.length && !isEdit) return alert("Please select images"); 

  const formData = new FormData();

  images.forEach((img) => formData.append("banner", img));

  for (let key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((val) => formData.append(key, val));
    } else {
      formData.append(key, data[key]);
    }
  }

  setLoading(true);
  try {
    let response;
    if (isEdit) {
      response = await authApiClient.put(`/campaigns/${campaign.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data)
      alert("Campaign updated successfully!");
    } else {
      response = await authApiClient.post("/campaigns/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Campaign created successfully!");
    }
    console.log("response:", response.data);
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files)
    setImages(files)
  }
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 px-4 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Campaign</h2>

      <form onSubmit={handleSubmit(handleProductAdd)} className="space-y-4">
        {/* Campaign title */}
        <div>
          <label className="block mb-1">Title </label>
          <input
            {...register("title", { required: true, maxLength: 100 })}
            className="input input-bordered w-full"
          />
          {errors.title && <span className="text-red-500 text-sm">Required</span>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description *</label>
          <textarea
            {...register("description", { required: true, maxLength: 500 })}
            className="textarea textarea-bordered w-full"
          />
          {errors.description && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Category </label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Vaccine *</label>
          <Controller
            control={control}
            name="vaccine"
            rules={{ required: true }}
            render={({ field }) => (
              <select
                multiple
                value={field.value || []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map((opt) =>
                    parseInt(opt.value)
                  );
                  field.onChange(selected);
                }}
                className="select select-bordered w-full h-32"
              >
                {vaccines.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div>
          <label className="block mb-1">Doctors *</label>
          <Controller
            control={control}
            name="doctor"
            rules={{ required: true }}
            render={({ field }) => (
              <select
                multiple
                value={field.value || []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map((opt) =>
                    parseInt(opt.value)
                  );
                  field.onChange(selected);
                }}
                className="select select-bordered w-full h-32"
              >
                {doctors.map((d) => (
                  <option key={d.bio.id} value={d.bio.id}>
                    {d.bio.first_name} {d.bio.email}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("is_premium")} className="checkbox" />
            Is Premium
          </label>

          <div className="flex-1">
            <label>Registration Fee</label>
            <input
              type="text"
              {...register("registration_fee")}
              className="input input-bordered w-full"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label>Start Date *</label>
            <input
              type="date"
              {...register("start_date", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex-1">
            <label>End Date *</label>
            <input
              type="date"
              {...register("end_date", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label>Status</label>
          <select {...register("status")} className="select select-bordered w-full">
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Paused">Paused</option>
            <option value="Ended">Ended</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        <h3 className="text-lg font-medium mb-2">Upload Banner</h3>
        {bannerPreview && (
          <img
            src={bannerPreview}
            alt="Existing Banner"
            className="mb-2 w-full max-h-60 object-cover rounded"
          />
        )}

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) => {
            handleImageChange(e);
            // preview selected image
            setBannerPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Campaign" : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;