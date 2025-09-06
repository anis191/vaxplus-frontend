const CampaignSummary = ({image, title, date }) => {
    return (
        <div className="my-4 md:my-8 flex overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
            <img src={image} alt={title}
              className="h-20 w-20 flex-shrink-0 object-cover transition-transform duration-300 hover:scale-105 md:h-20 md:w-20 sm:h-16 sm:w-16" />
            <div className="p-3">
              <h3 className="cursor-pointer text-sm leading-snug font-semibold hover:text-blue-600">{title}</h3>
              <div className="flex justify-between items-center">
                <p className="mt-1 text-xs text-gray-500">{date}</p>
                <span className="ml-2 inline-block rounded px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700">Free</span>
              </div>
            </div>
        </div>
    );
};

export default CampaignSummary;