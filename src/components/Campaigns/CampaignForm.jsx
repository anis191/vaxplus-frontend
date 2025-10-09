import { Controller, useForm } from "react-hook-form";
import useFetchDoctors from "../../hooks/useFetchDoctors";
import useFetchVaccines from "../../hooks/useFetchVaccines";
import useFetchCategories from "../../hooks/useFetchCategories";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";

const AddCampaign = ({ campaign, cDoctors }) => {
  const isEdit = Boolean(campaign);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState("");

  const { doctors } = useFetchDoctors();
  const { vaccines } = useFetchVaccines();
  const { categories } = useFetchCategories();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: campaign || {} });

  useEffect(() => {
    if (!campaign) return;
    setValue("title", campaign.title || "");
    setValue("description", campaign.description || "");
    setValue("category", campaign.category || "");
    setValue("vaccine", campaign.vaccine_details?.map((v) => v.id) || []);
    setValue("doctor", cDoctors?.map((d) => d.id) || []);
    setValue("is_premium", campaign.is_premium || false);
    setValue("registration_fee", campaign.registration_fee || "");
    setValue("start_date", campaign.start_date?.slice(0, 10) || "");
    setValue("end_date", campaign.end_date?.slice(0, 10) || "");
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
    const files = Array.from(event.target.files);
    setImages(files);
  };

  return (
    <div className="bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-6xl h-full bg-white shadow-md rounded-lg overflow-hidden grid grid-rows-[auto_1fr]">
        <header className="px-6 py-4 border-b bg-white">
          <h2 className="text-2xl font-semibold">
            {isEdit ? "Edit Campaign" : "Create Campaign"}
          </h2>
        </header>

        {/* Form now wraps both columns: LEFT (inputs) and RIGHT (preview/actions) */}
        <div className="h-full">
          <form onSubmit={handleSubmit(handleProductAdd)} className="h-full grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
            {/* LEFT: form area (scrollable) */}
            <div className="p-6 overflow-auto">
              <div className="space-y-6 max-w-none">
                <section className="space-y-2">
                  <label className="block text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("title", { required: true, maxLength: 100 })}
                    className="input input-bordered w-full"
                    placeholder="Enter campaign title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
                </section>

                <section className="space-y-2">
                  <label className="block text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("description", { required: true, maxLength: 500 })}
                    className="textarea textarea-bordered w-full h-44"
                    placeholder="Short description (max 500 chars)"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">Description is required</p>
                  )}
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Category</label>
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
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">Category is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select {...register("status")} className="select select-bordered w-full">
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Paused">Paused</option>
                      <option value="Ended">Ended</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Vaccine <span className="text-red-500">*</span>
                    </label>
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
                    <label className="block text-sm font-medium">
                      Doctors <span className="text-red-500">*</span>
                    </label>
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
                              {d.bio.first_name} — {d.bio.email}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                </div>

                {/* spacer */}
                {/* <div className="h-8" /> */}
              </div>
            </div>

            {/* RIGHT: sticky preview / actions column */}
            <aside className="p-6 lg:border-l border-0">
              <div className="sticky top-6">
                <div className="mb-4 p-4 bg-white border border-gray-300 rounded space-y-4">
                  <h3 className="text-lg font-medium">Campaign Settings</h3>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...register("is_premium")} className="checkbox" />
                      <span className="text-sm">Is Premium</span>
                    </label>

                    <div className="flex-1">
                      <label className="block text-sm font-medium">Registration Fee</label>
                      <input
                        type="text"
                        {...register("registration_fee")}
                        className="input input-bordered w-full"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("start_date", { required: true })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("end_date", { required: true })}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Banner preview */}
                {(bannerPreview || images.length > 0) && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Banner Preview</h3>
                    <div className="mt-3 w-full bg-gray-100 rounded overflow-hidden h-48 flex items-center justify-center">
                      {bannerPreview ? (
                        <img src={bannerPreview} alt="Banner preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-sm text-gray-500">No banner selected</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Upload section */}
                <div className="mb-4 p-4 bg-white border border-gray-300 rounded">
                  <p className="text-sm font-medium mb-2">Upload</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => {
                      handleImageChange(e);
                      setBannerPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2">Recommended: 16:9 ratio, max 2MB.</p>
                </div>

                {campaign && (
                  <div className="mb-4 p-4 bg-white border rounded">
                    <h4 className="font-medium">Quick Info</h4>
                    <ul className="mt-2 text-sm space-y-1 text-gray-600">
                      <li><strong>Images:</strong>{campaign?.banner ? "1" : "no banner uploaded"}</li>
                      <li><strong>Doctors:</strong> {cDoctors?.length}</li>
                      <li><strong>Vaccines:</strong> {campaign?.vaccine_details?.length}</li>
                    </ul>
                  </div>
                )}

                {!campaign && (
                  <div className="mb-4 p-4 bg-white border rounded">
                    <h4 className="font-medium">Pro Tips</h4>
                    <ul className="text-sm mt-2 text-gray-600 list-disc list-inside space-y-1">
                      <li>Keep title concise (≤100 chars)</li>
                      <li>Short description helps users scan quickly</li>
                      <li>Pick a clear banner with readable text</li>
                    </ul>
                  </div>
                )}

                {/* Submit button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : isEdit ? "Update Campaign" : "Create Campaign"}
                  </button>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
