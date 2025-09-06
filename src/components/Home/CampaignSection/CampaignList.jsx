
import Campaign from "../../Campaigns/Campaign";
import CampaignSummary from "../../Campaigns/CampaignSummary";
import CardGroup from "./CardGroup";

const CampaignList = () => {
const campaignsData = [
  {
    campaign: {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_gwGVUAxiNNGe35FwWzMUmmHacxhl_3oBTA&s",
      title: "Denmark close to wiping out leading cancer-causing HPV strains after vaccine",
      date: "2 Sep 2025 · 3 min read",
      tags: ["HPV", "Spotlight on HPV"],
    },
    campaign_summary: [
      {
        image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2217713936.jpg?c=original&q=w_860,c_fill",
        title: "Scientists make breakthrough towards ‘universal’ antiviral drugs",
        date: "29 Aug 2025 · 3 min read",
      },
      {
        image: "https://blogs.worldbank.org/content/dam/sites/blogs/img/detail/mgr/vaccination.png",
        title: "In Kenya’s Maasailand, “Guardian mothers” take up the HPV…",
        date: "2 Sep 2025 · 7 min read",
      },
    ],
  },
  {
    campaign: {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvPwh2SPW6NZ0dsyDuRq-QlxiiiICEUpDiQ&s",
      title: "How a vaccine-wary community in Borno state got protected",
      date: "5 Sep 2025 · 4 min read",
      tags: ["Spotlight on conflict and fragility", "Routine immunisation"],
    },
    campaign_summary: [
      {
        image: "https://www.unicef.org/supply/sites/unicef.org.supply/files/styles/hero_extended/public/pakistan-UN0324721-banner.jpg.webp?itok=aFSB_AgV",
        title: "As climate change burdens grow, community mental health alarm…",
        date: "25 Aug 2025 · 12 min read",
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbpaPpzrQR4WfrrdycYMmmuRnsiycM2PjYRQ&s",
        title: "Microbes with memory: why some infections fight back",
        date: "27 Aug 2025 · 3 min read",
      },
    ],
  },
  {
    campaign: {
      image: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2025-08/250829-covid-vaccine-aa-417-91db6d.jpg",
      title: "Why people embrace conspiracy theories: it’s about community",
      date: "26 Aug 2025 · 5 min read",
      tags: ["Cross-posts", "COVID-19"],
    },
    campaign_summary: [
      {
        image: "https://www.doctorsoftheworld.org.uk/wp-content/uploads/2021/02/COVID-19-Vaccine-Project-Website-home-banner-desktop.jpg",
        title: "Togo has a cancer problem, but the government says vaccines…",
        date: "1 Sep 2025 · 5 min read",
      },
      {
        image: "https://www.bruegel.org/sites/default/files/styles/16_9_large_with_focalk/public/wp_images/-GettyImages-1231098966.jpg?h=a93ce628&itok=LOvGHB36",
        title: "Chikungunya: what travellers should know about this…",
        date: "22 Aug 2025 · 5 min read",
      },
    ],
  },
];
  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-4 py-5 md:py-10">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {campaignsData.map((obj, idx)=>(
          <div key={idx} className="space-y-4">
            <Campaign key={idx} image={obj.campaign.image} title={obj.campaign.title} date={obj.campaign.date} tags={obj.campaign.tags}/>
          
            {obj.campaign_summary.map((summary, i) => (
              <CampaignSummary key={i} image={summary.image} title={summary.title} date={summary.date}/>
            ))}
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out sm:w-auto text-center">
              View all
            </button>
          </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="space-y-8 md:hidden">
          {campaignsData.slice(0, 2).map((obj, idx) => (
            <CardGroup key={idx} campaign={obj.campaign} campaign_summary={obj.campaign_summary} />
          ))}
        </div>
      </section> 
    </div>
  )
};

export default CampaignList;