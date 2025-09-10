import { IoMdPricetag } from "react-icons/io";
import {formatDate} from "../../utils/dateUtils"

const Campaign = ({image, title, start_date, end_date, tags, is_premium, status}) => {

  const formattedStart = formatDate(start_date)
  const formattedEnd = formatDate(end_date)

  let date = ""
  if(status === "Upcoming"){
    date = `Start on: ${formattedStart}`
  }else if(status === "Ongoing"){
    date = `${formattedStart} - ${formattedEnd}`;
  }else if(status === "Ended"){
    date = `Ended on: ${formattedEnd}`;
  }

  const statusClasse = status === "Ongoing" ? "bg-green-600 text-white" : status === "Upcoming"
      ? "bg-blue-600 text-white" : "bg-gray-600 text-white";

    return (
      <div>
      {/* <div> */}
        {/* <h2 className="relative mb-6 text-2xl md:text-3xl font-bold text-gray-900 inline-block pb-4"> */}
          {/* <span className="relative z-10">Ongoing</span> */}
          {/* <span className="relative z-10 ml-2">Campaigns</span> */}
          {/* <span className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-400"></span> */}
          {/* <span className="absolute left-0 bottom-0 h-[4px] w-[110px] bg-blue-600"></span> */}
        {/* </h2> */}
      {/* </div> */}
      
        <div className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
            <img src={image} alt={title}
              className="h-52 w-full object-cover transition-transform duration-300 hover:scale-105"/>
            
            <span className={`ml-4 inline-flex items-center rounded px-2 py-0.5 text-sm font-semibold ${statusClasse}`}>
              <IoMdPricetag className="mr-1 h-4 w-4" /> {status}
            </span>

            <div className="px-4 pb-4 pt-2">
              <h2 className="cursor-pointer text-lg font-semibold hover:text-blue-600">{title}</h2>
              
              <div className="flex justify-between items-center">
                <p className="mt-1 text-sm text-gray-500">{date}</p>
                <span className={`ml-2 inline-block rounded px-3 py-0.5 text-sm font-semibold ${is_premium ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>{is_premium ? "Premium" : "Free"}</span>
              </div>
              
              {tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-blue-100 hover:text-blue-600">{tag}</span>
                  ))}
                </div>
              )}
            </div>
        </div>
      </div>
    );
};

export default Campaign;