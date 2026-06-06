import { PrismaClient, CollegeType } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology Bombay",
    location: "Powai, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    type: CollegeType.PUBLIC,
    establishedYear: 1958,
    website: "https://www.iitb.ac.in",
    overallRating: 4.8,
    description: "One of India's premier engineering institutions with world-class research facilities.",
    courses: [
      { name: "B.Tech Computer Science", degreeType: "B.Tech", duration: 4, feesPerYear: 250000, totalSeats: 120 },
      { name: "B.Tech Electrical Engineering", degreeType: "B.Tech", duration: 4, feesPerYear: 250000, totalSeats: 90 },
      { name: "M.Tech Data Science", degreeType: "M.Tech", duration: 2, feesPerYear: 150000, totalSeats: 60 },
    ],
    placements: [
      { year: 2024, avgPackage: 2100000, highestPackage: 8500000, placementRate: 96, topRecruiters: "Google,Microsoft,Goldman Sachs,Uber,Flipkart" },
      { year: 2023, avgPackage: 1950000, highestPackage: 7200000, placementRate: 95, topRecruiters: "Amazon,Apple,DE Shaw,JP Morgan" },
    ],
  },
  {
    name: "Indian Institute of Technology Delhi",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: CollegeType.PUBLIC,
    establishedYear: 1961,
    website: "https://home.iitd.ac.in",
    overallRating: 4.7,
    description: "A leading technical university known for innovation and research in engineering.",
    courses: [
      { name: "B.Tech Computer Science", degreeType: "B.Tech", duration: 4, feesPerYear: 230000, totalSeats: 100 },
      { name: "B.Tech Mechanical Engineering", degreeType: "B.Tech", duration: 4, feesPerYear: 230000, totalSeats: 80 },
      { name: "MBA", degreeType: "MBA", duration: 2, feesPerYear: 400000, totalSeats: 50 },
    ],
    placements: [
      { year: 2024, avgPackage: 2000000, highestPackage: 7800000, placementRate: 94, topRecruiters: "Microsoft,Google,McKinsey,Bain,Nvidia" },
    ],
  },
  {
    name: "BITS Pilani",
    location: "Vidya Vihar, Pilani, Rajasthan",
    city: "Pilani",
    state: "Rajasthan",
    type: CollegeType.DEEMED,
    establishedYear: 1964,
    website: "https://www.bits-pilani.ac.in",
    overallRating: 4.5,
    description: "A premier engineering institute known for its dual degree programs and industry connections.",
    courses: [
      { name: "B.E. Computer Science", degreeType: "B.E.", duration: 4, feesPerYear: 540000, totalSeats: 150 },
      { name: "B.E. Electronics", degreeType: "B.E.", duration: 4, feesPerYear: 540000, totalSeats: 120 },
      { name: "B.Pharm", degreeType: "B.Pharm", duration: 4, feesPerYear: 480000, totalSeats: 60 },
    ],
    placements: [
      { year: 2024, avgPackage: 1600000, highestPackage: 6200000, placementRate: 92, topRecruiters: "Qualcomm,Texas Instruments,Cisco,Zomato,KPMG" },
    ],
  },
  {
    name: "National Institute of Technology Trichy",
    location: "Tanjore Main Road, Tiruchirappalli, Tamil Nadu",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: CollegeType.PUBLIC,
    establishedYear: 1964,
    website: "https://www.nitt.edu",
    overallRating: 4.3,
    description: "One of the top NITs in India with strong placements and research programs.",
    courses: [
      { name: "B.Tech Computer Science", degreeType: "B.Tech", duration: 4, feesPerYear: 150000, totalSeats: 120 },
      { name: "B.Tech Civil Engineering", degreeType: "B.Tech", duration: 4, feesPerYear: 150000, totalSeats: 90 },
      { name: "M.Tech VLSI Design", degreeType: "M.Tech", duration: 2, feesPerYear: 80000, totalSeats: 30 },
    ],
    placements: [
      { year: 2024, avgPackage: 1100000, highestPackage: 4500000, placementRate: 88, topRecruiters: "TCS,Infosys,Wipro,Zoho,Samsung" },
    ],
  },
  {
    name: "Vellore Institute of Technology",
    location: "Katpadi, Vellore, Tamil Nadu",
    city: "Vellore",
    state: "Tamil Nadu",
    type: CollegeType.DEEMED,
    establishedYear: 1984,
    website: "https://vit.ac.in",
    overallRating: 4.1,
    description: "A large private university known for its tech programs and global collaborations.",
    courses: [
      { name: "B.Tech Computer Science", degreeType: "B.Tech", duration: 4, feesPerYear: 220000, totalSeats: 600 },
      { name: "B.Tech IT", degreeType: "B.Tech", duration: 4, feesPerYear: 210000, totalSeats: 300 },
      { name: "MBA", degreeType: "MBA", duration: 2, feesPerYear: 350000, totalSeats: 120 },
    ],
    placements: [
      { year: 2024, avgPackage: 750000, highestPackage: 4200000, placementRate: 82, topRecruiters: "TCS,Cognizant,Accenture,Capgemini,HCL" },
    ],
  },
  {
    name: "IIM Ahmedabad",
    location: "Vastrapur, Ahmedabad, Gujarat",
    city: "Ahmedabad",
    state: "Gujarat",
    type: CollegeType.PUBLIC,
    establishedYear: 1961,
    website: "https://www.iima.ac.in",
    overallRating: 4.9,
    description: "India's top business school with unmatched alumni network and placement record.",
    courses: [
      { name: "PGP (MBA)", degreeType: "MBA", duration: 2, feesPerYear: 1250000, totalSeats: 385 },
      { name: "PGP-FABM", degreeType: "MBA", duration: 2, feesPerYear: 1100000, totalSeats: 60 },
      { name: "Executive MBA", degreeType: "EMBA", duration: 1, feesPerYear: 3000000, totalSeats: 100 },
    ],
    placements: [
      { year: 2024, avgPackage: 3400000, highestPackage: 12000000, placementRate: 100, topRecruiters: "McKinsey,BCG,Bain,Goldman Sachs,Amazon" },
    ],
  },
  {
    name: "Delhi University - SRCC",
    location: "North Campus, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: CollegeType.PUBLIC,
    establishedYear: 1926,
    website: "https://srcc.edu",
    overallRating: 4.2,
    description: "One of India's most prestigious commerce colleges with a rich legacy.",
    courses: [
      { name: "B.Com (Hons)", degreeType: "B.Com", duration: 3, feesPerYear: 25000, totalSeats: 530 },
      { name: "M.Com", degreeType: "M.Com", duration: 2, feesPerYear: 20000, totalSeats: 60 },
    ],
    placements: [
      { year: 2024, avgPackage: 850000, highestPackage: 3800000, placementRate: 78, topRecruiters: "Deloitte,PwC,EY,KPMG,JP Morgan" },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal, Udupi, Karnataka",
    city: "Udupi",
    state: "Karnataka",
    type: CollegeType.DEEMED,
    establishedYear: 1957,
    website: "https://manipal.edu/mit",
    overallRating: 4.0,
    description: "A well-established private engineering institute with international student exposure.",
    courses: [
      { name: "B.Tech Computer Science", degreeType: "B.Tech", duration: 4, feesPerYear: 350000, totalSeats: 300 },
      { name: "B.Tech Mechatronics", degreeType: "B.Tech", duration: 4, feesPerYear: 340000, totalSeats: 120 },
      { name: "M.Tech AI/ML", degreeType: "M.Tech", duration: 2, feesPerYear: 250000, totalSeats: 60 },
    ],
    placements: [
      { year: 2024, avgPackage: 900000, highestPackage: 4000000, placementRate: 84, topRecruiters: "Infosys,Wipro,Honeywell,Oracle,SAP" },
    ],
  },
  {
    name: "Jadavpur University",
    location: "Raja S C Mallick Road, Kolkata, West Bengal",
    city: "Kolkata",
    state: "West Bengal",
    type: CollegeType.PUBLIC,
    establishedYear: 1955,
    website: "https://jadavpuruniversity.in",
    overallRating: 4.2,
    description: "A top government university in Eastern India with strong engineering and arts programs.",
    courses: [
      { name: "B.E. Computer Science", degreeType: "B.E.", duration: 4, feesPerYear: 35000, totalSeats: 75 },
      { name: "B.E. Electronics", degreeType: "B.E.", duration: 4, feesPerYear: 35000, totalSeats: 75 },
    ],
    placements: [
      { year: 2024, avgPackage: 950000, highestPackage: 4800000, placementRate: 85, topRecruiters: "TCS,Wipro,Cognizant,IBM,Ericsson" },
    ],
  },
  {
    name: "Christ University",
    location: "Hosur Road, Bangalore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    type: CollegeType.DEEMED,
    establishedYear: 1969,
    website: "https://christuniversity.in",
    overallRating: 3.9,
    description: "A reputed private university known for arts, sciences, and management programs.",
    courses: [
      { name: "BBA", degreeType: "BBA", duration: 3, feesPerYear: 180000, totalSeats: 400 },
      { name: "B.Com", degreeType: "B.Com", duration: 3, feesPerYear: 150000, totalSeats: 600 },
      { name: "MBA", degreeType: "MBA", duration: 2, feesPerYear: 400000, totalSeats: 200 },
    ],
    placements: [
      { year: 2024, avgPackage: 650000, highestPackage: 2800000, placementRate: 76, topRecruiters: "Deloitte,Accenture,HDFC Bank,ICICI Bank,EY" },
    ],
  },
  {
    name: "Anna University",
    location: "Sardar Patel Road, Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    type: CollegeType.PUBLIC,
    establishedYear: 1978,
    website: "https://www.annauniv.edu",
    overallRating: 4.0,
    description: "A prominent technical university in Tamil Nadu affiliating 500+ colleges.",
    courses: [
      { name: "B.E. Computer Science", degreeType: "B.E.", duration: 4, feesPerYear: 100000, totalSeats: 180 },
      { name: "B.E. Mechanical", degreeType: "B.E.", duration: 4, feesPerYear: 95000, totalSeats: 120 },
    ],
    placements: [
      { year: 2024, avgPackage: 700000, highestPackage: 3200000, placementRate: 80, topRecruiters: "TCS,Infosys,Cognizant,Zoho,Freshworks" },
    ],
  },
  {
    name: "Amity University Noida",
    location: "Sector 125, Noida, Uttar Pradesh",
    city: "Noida",
    state: "Uttar Pradesh",
    type: CollegeType.PRIVATE,
    establishedYear: 2005,
    website: "https://www.amity.edu",
    overallRating: 3.7,
    description: "One of India's largest private universities with diverse academic programs.",
    courses: [
      { name: "B.Tech Computer Science", degreeType: "B.Tech", duration: 4, feesPerYear: 320000, totalSeats: 500 },
      { name: "BBA", degreeType: "BBA", duration: 3, feesPerYear: 250000, totalSeats: 400 },
      { name: "MBA", degreeType: "MBA", duration: 2, feesPerYear: 500000, totalSeats: 300 },
    ],
    placements: [
      { year: 2024, avgPackage: 600000, highestPackage: 2500000, placementRate: 72, topRecruiters: "Wipro,Infosys,HCL,Mphasis,IBM" },
    ],
  },
  {
    name: "IIT Madras",
    location: "Adyar, Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    type: CollegeType.PUBLIC,
    establishedYear: 1959,
    website: "https://www.iitm.ac.in",
    overallRating: 4.8,
    description: "Ranked #1 in India's NIRF rankings, known for research and innovation.",
    courses: [
      { name: "B.Tech Computer Science", degreeType: "B.Tech", duration: 4, feesPerYear: 240000, totalSeats: 110 },
      { name: "B.Tech Aerospace", degreeType: "B.Tech", duration: 4, feesPerYear: 240000, totalSeats: 60 },
      { name: "M.Tech AI", degreeType: "M.Tech", duration: 2, feesPerYear: 120000, totalSeats: 40 },
    ],
    placements: [
      { year: 2024, avgPackage: 2200000, highestPackage: 9200000, placementRate: 97, topRecruiters: "Google,Microsoft,Apple,ISRO,Boeing" },
    ],
  },
  {
    name: "NIT Warangal",
    location: "Hanamkonda, Warangal, Telangana",
    city: "Warangal",
    state: "Telangana",
    type: CollegeType.PUBLIC,
    establishedYear: 1959,
    website: "https://nitw.ac.in",
    overallRating: 4.2,
    description: "One of the original NITs with strong technical programs and good placement record.",
    courses: [
      { name: "B.Tech CSE", degreeType: "B.Tech", duration: 4, feesPerYear: 145000, totalSeats: 110 },
      { name: "B.Tech ECE", degreeType: "B.Tech", duration: 4, feesPerYear: 145000, totalSeats: 110 },
    ],
    placements: [
      { year: 2024, avgPackage: 1050000, highestPackage: 4200000, placementRate: 87, topRecruiters: "Microsoft,Amazon,Capgemini,TCS,Nvidia" },
    ],
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Kattankulathur, Kanchipuram, Tamil Nadu",
    city: "Kanchipuram",
    state: "Tamil Nadu",
    type: CollegeType.DEEMED,
    establishedYear: 1985,
    website: "https://www.srmist.edu.in",
    overallRating: 3.8,
    description: "A large private university with one of the biggest campuses in South India.",
    courses: [
      { name: "B.Tech CSE", degreeType: "B.Tech", duration: 4, feesPerYear: 260000, totalSeats: 1200 },
      { name: "B.Tech Biomedical", degreeType: "B.Tech", duration: 4, feesPerYear: 240000, totalSeats: 180 },
      { name: "MBA", degreeType: "MBA", duration: 2, feesPerYear: 380000, totalSeats: 300 },
    ],
    placements: [
      { year: 2024, avgPackage: 680000, highestPackage: 3200000, placementRate: 79, topRecruiters: "TCS,Infosys,Wipro,HCL,Accenture" },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  for (const data of colleges) {
    const { courses, placements, ...collegeData } = data;

    const college = await prisma.college.create({
      data: {
        ...collegeData,
        totalReviews: 0,
        courses: { create: courses },
        placements: { create: placements },
      },
    });

    console.log(`Created: ${college.name}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
