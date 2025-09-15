import { useState } from "react";
import useFetchCategories from "../hooks/useFetchCategories";
import TableSkeleton from "../components/Skeletons/TableSkeleton";
import authApiClient from "../services/auth-api-client";
import CategoryForm from "../components/Dashboard/CategoryForm";

const Categories = () => {
  const { categories, fetchCategory } = useFetchCategories();
  console.log(categories)
  const [editingCategory, setEditingCategory] = useState(null);
  const [dtl, setDtl] = useState(false);

  const tableHeaders = ["Serial", "Name", "Description", "Campaign Count", "Action"];

  if (!categories || categories.length === 0) return <TableSkeleton />;

  const handleDelete = async (cat_id) => {
    try{
      setDtl(true);
      await authApiClient.delete(`/categories/${cat_id}/`);
    }catch(err){console.log(err)
    }finally{fetchCategory();
      setDtl(false)
    }
  }

  return (
    <div className="overflow-x-auto">
      {editingCategory ? (
        <CategoryForm
          category={editingCategory}
          onCancel={() => setEditingCategory(null)}
          onSuccess={() => {
            fetchCategory()
            setEditingCategory(null);
          }}/>
      ) : (
        <>
          {dtl && (
            <div className="flex justify-center items-center mt-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
            <thead className="bg-gray-100">
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th key={idx}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id} className="border-b even:bg-gray-50 hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium truncate">{category.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 truncate">{category.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{category.campaign_count}</td>
                  <td className="px-4 py-2 text-sm flex gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => setEditingCategory(category)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-red"
                      onClick={() => handleDelete(category.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Categories;
