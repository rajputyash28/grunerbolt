interface BasicDetails {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  alternateMobileNumber:string;
  mobileNumber: string;
  emailAddress: string;
  fatherName: string;
  education: string;
}

interface KycDocuments {
  aadharCard: string;
}

interface AddressInfo {
  completeAddress: string;
  village: string;
  mandal: string;
  district: string;
  state: string;
  pinCode: string;
}

interface LandDetail {
  landName: string;
  landDetails: string;
  ownLand?: string;
  leasedLand?: string;
}

interface CropDetails {
  landName: string;
  plotNumber: string;
  landArea: string;
  cropSown: string;
  variety: string;
  seedVariety: string;
}

interface LivestockItem {
  name: string;
  count: number;
}

interface LivestockCategory {
  category: string;
  items: LivestockItem[];
}

interface LivestockDetails {
  totalLivestock: number;
  cattle: number;
  poultry: number;
  smallAnimals: number;
  detailedBreakdown: LivestockCategory[];
}

interface QuickStats {
  totalLand: string;
  familyMembers: number;
  livestock: number;
  assets: number;
}

interface FamilyDetails {
  totalAdults: number;
  totalChildren: number;
  workingMembers: number;
}

interface FarmMachineryDetails {
  tractor: number;
  harvester: number;
  truck: number;
  plough: number;
  sprayer: number;
}

export interface Farmer {
  id: number;
  name: string;
  memberId: string;
  kycStatus: string;
  kd: string;
  profileImage: string;
  basicDetails: BasicDetails;
  kycDocuments: KycDocuments;
  addressInfo: AddressInfo;
  landDetails: LandDetail[];
  cropDetails: CropDetails;
  livestockDetails: LivestockDetails;
  quickStats: QuickStats;
  familyDetails: FamilyDetails;
  farmMachineryDetails: FarmMachineryDetails;
}

const initialfarmer: Farmer[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    memberId: "MEM-F-2024-001",
    kycStatus: "Active",
    kd: "KD-2024-045",
    profileImage: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      mobileNumber: "+91 9876543210",
      alternateMobileNumber: "9999999999999999",
      emailAddress: "rajesh.kumar@email.com",
      fatherName: "Ramesh Kumar",
      education: "12th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-9012"
    },
    addressInfo: {
      completeAddress: "House No 123, Main Street",
      village: "Rampur",
      mandal: "Secunderabad",
      district: "Hyderabad",
      state: "Punjab",
      pinCode: "500001"
    },
    landDetails: [
      {
        landName: "Land 1",
        landDetails: "Own",
        ownLand: "2 Acres"
      },
      {
        landName: "Land 2",
        landDetails: "Leased Land",
        leasedLand: "2 Acres"
      }
    ],
    cropDetails: {
      landName: "Land 2",
      plotNumber: "12345",
      landArea: "101 acres",
      cropSown: "Kharif 2024",
      variety: "Rice, Cotton",
      seedVariety: "Good"
    },
    livestockDetails: {
      totalLivestock: 8,
      cattle: 6,
      poultry: 50,
      smallAnimals: 50,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [
            { name: "Cows", count: 3 },
            { name: "Buffaloes", count: 2 }
          ]
        },
        {
          category: "Small Animals",
          items: [
            { name: "Goats", count: 2 },
            { name: "Sheep", count: 50 }
          ]
        },
        {
          category: "Poultry",
          items: [
            { name: "Chickens", count: 3 },
            { name: "Ducks", count: 2 }
          ]
        }
      ]
    },
    quickStats: {
      totalLand: "5.5 acres",
      familyMembers: 5,
      livestock: 8,
      assets: 50
    },
    familyDetails: {
      totalAdults: 5,
      totalChildren: 3,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 8,
      harvester: 6,
      truck: 50,
      plough: 50,
      sprayer: 50
    }
  },
  {
    id: 2,
    name: "Sunita Devi",
    memberId: "MEM-F-2024-002",
    kycStatus: "Inactive",
    kd: "KD-2024-046",
    profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Sunita Devi",
      dateOfBirth: "1978-11-25",
      gender: "Female",
      mobileNumber: "+91 9988776655",
      alternateMobileNumber:"99999999999999",
      emailAddress: "sunita.devi@email.com",
      fatherName: "Ashok Singh",
      education: "8th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-1234"
    },
    addressInfo: {
      completeAddress: "Village Square, Near Temple",
      village: "Karimnagar",
      mandal: "Sircilla",
      district: "Karimnagar",
      state: "Telangana",
      pinCode: "505001"
    },
    landDetails: [
      {
        landName: "Main Field",
        landDetails: "Own",
        ownLand: "3.5 Acres"
      }
    ],
    cropDetails: {
      landName: "Main Field",
      plotNumber: "98765",
      landArea: "3.5 acres",
      cropSown: "Rabi 2024",
      variety: "Wheat",
      seedVariety: "High Yield"
    },
    livestockDetails: {
      totalLivestock: 15,
      cattle: 4,
      poultry: 100,
      smallAnimals: 5,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [{ name: "Cows", count: 4 }]
        },
        {
          category: "Small Animals",
          items: [{ name: "Goats", count: 5 }]
        },
        {
          category: "Poultry",
          items: [{ name: "Chickens", count: 100 }]
        }
      ]
    },
    quickStats: {
      totalLand: "3.5 acres",
      familyMembers: 4,
      livestock: 15,
      assets: 30
    },
    familyDetails: {
      totalAdults: 4,
      totalChildren: 0,
      workingMembers: 3
    },
    farmMachineryDetails: {
      tractor: 1,
      harvester: 0,
      truck: 0,
      plough: 1,
      sprayer: 1
    }
  },
  {
    id: 3,
    name: "Ravi Shankar",
    memberId: "MEM-F-2024-003",
    kycStatus: "Active",
    kd: "KD-2024-047",
    profileImage: "https://images.pexels.com/photos/7403910/pexels-photo-7403910.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Ravi Shankar",
      dateOfBirth: "1990-09-10",
      gender: "Male",
      alternateMobileNumber: "9999999999999",
      mobileNumber: "+91 8877665544",
      emailAddress: "ravi.shankar@email.com",
      fatherName: "Gopal Shankar",
      education: "B.Sc Agriculture"
    },
    kycDocuments: {
      aadharCard: "****-****-5678"
    },
    addressInfo: {
      completeAddress: "House No 45B, Green Avenue",
      village: "Medak",
      mandal: "Narsapur",
      district: "Medak",
      state: "Telangana",
      pinCode: "502110"
    },
    landDetails: [
      {
        landName: "River Side Plot",
        landDetails: "Own",
        ownLand: "5 Acres"
      },
      {
        landName: "Hill Top Land",
        landDetails: "Leased Land",
        leasedLand: "3 Acres"
      }
    ],
    cropDetails: {
      landName: "River Side Plot",
      plotNumber: "54321",
      landArea: "5 acres",
      cropSown: "Kharif 2024",
      variety: "Sugarcane",
      seedVariety: "Local"
    },
    livestockDetails: {
      totalLivestock: 20,
      cattle: 8,
      poultry: 50,
      smallAnimals: 12,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [{ name: "Buffaloes", count: 8 } , {name : "cat" , count : 20}]
          
        },
        {
          category: "Small Animals",
          items: [{ name: "Goats", count: 12 }]
        },
        {
          category: "Poultry",
          items: [{ name: "Chickens", count: 50 }]
        }
        ,
         {
          category: "Poultry",
          items: [{ name: "Chickens", count: 50 }]
        }
      ]
    },
    quickStats: {
      totalLand: "8 acres",
      familyMembers: 6,
      livestock: 20,
      assets: 75
    },
    familyDetails: {
      totalAdults: 4,
      totalChildren: 2,
      workingMembers: 3
    },
    farmMachineryDetails: {
      tractor: 1,
      harvester: 1,
      truck: 1,
      plough: 1,
      sprayer: 2
    }
  },
  {
    id: 4,
    name: "Priya Sharma",
    memberId: "MEM-F-2024-004",
    kycStatus: "Active",
    kd: "KD-2024-048",
    profileImage: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Priya Sharma",
      dateOfBirth: "1992-03-20",
      alternateMobileNumber:'999999999',
      gender: "Female",
      mobileNumber: "+91 9123456789",
      emailAddress: "priya.sharma@email.com",
      fatherName: "Anand Sharma",
      education: "M.A. in Rural Studies"
    },
    kycDocuments: {
      aadharCard: "****-****-2468"
    },
    addressInfo: {
      completeAddress: "Plot No 789, New Colony",
      village: "Nalgonda",
      mandal: "Devarakonda",
      district: "Nalgonda",
      state: "Telangana",
      pinCode: "508001"
    },
    landDetails: [
      {
        landName: "Family Plot",
        landDetails: "Own",
        ownLand: "2.5 Acres"
      }
    ],
    cropDetails: {
      landName: "Family Plot",
      plotNumber: "67890",
      landArea: "2.5 acres",
      cropSown: "Rabi 2024",
      variety: "Maize",
      seedVariety: "Hybrid"
    },
    livestockDetails: {
      totalLivestock: 10,
      cattle: 2,
      poultry: 50,
      smallAnimals: 8,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [{ name: "Cows", count: 2 }]
        },
        {
          category: "Small Animals",
          items: [{ name: "Goats", count: 8 }]
        },
        {
          category: "Poultry",
          items: [{ name: "Chickens", count: 50 }]
        }
      ]
    },
    quickStats: {
      totalLand: "2.5 acres",
      familyMembers: 3,
      livestock: 10,
      assets: 20
    },
    familyDetails: {
      totalAdults: 2,
      totalChildren: 1,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 0,
      harvester: 0,
      truck: 0,
      plough: 1,
      sprayer: 1
    }
  },
  {
    id: 5,
    name: "Vijay Singh",
    memberId: "MEM-F-2024-005",
    kycStatus: "Active",
    kd: "KD-2024-049",
    profileImage: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Vijay Singh",
      dateOfBirth: "1975-01-05",
      gender: "Male",
      alternateMobileNumber:'alternateMobileNumber',
      mobileNumber: "+91 9012345678",
      emailAddress: "vijay.singh@email.com",
      fatherName: "Babu Singh",
      education: "10th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-1357"
    },
    addressInfo: {
      completeAddress: "Near Bus Stand, Village Road",
      village: "Warangal",
      mandal: "Hanamkonda",
      district: "Warangal",
      state: "Telangana",
      pinCode: "506001"
    },
    landDetails: [
      {
        landName: "Plot A",
        landDetails: "Own",
        ownLand: "6 Acres"
      }
    ],
    cropDetails: {
      landName: "Plot A",
      plotNumber: "11223",
      landArea: "6 acres",
      cropSown: "Kharif 2024",
      variety: "Chilli, Jowar",
      seedVariety: "Good"
    },
    livestockDetails: {
      totalLivestock: 25,
      cattle: 10,
      poultry: 100,
      smallAnimals: 15,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [
            { name: "Cows", count: 5 },
            { name: "Buffaloes", count: 5 }
          ]
        },
        {
          category: "Small Animals",
          items: [{ name: "Goats", count: 15 }]
        },
        {
          category: "Poultry",
          items: [{ name: "Chickens", count: 100 }]
        }
      ]
    },
    quickStats: {
      totalLand: "6 acres",
      familyMembers: 7,
      livestock: 25,
      assets: 100
    },
    familyDetails: {
      totalAdults: 5,
      totalChildren: 2,
      workingMembers: 4
    },
    farmMachineryDetails: {
      tractor: 2,
      harvester: 1,
      truck: 1,
      plough: 2,
      sprayer: 2
    }
  },
  {
    id: 6,
    name: "Gita Rani",
    memberId: "MEM-F-2024-006",
    kycStatus: "Inactive",
    kd: "KD-2024-050",
    profileImage: "https://images.pexels.com/photos/7403910/pexels-photo-7403910.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Gita Rani",
      dateOfBirth: "1988-08-18",
      gender: "Female",
      alternateMobileNumber:'alternateMobileNumber',
      mobileNumber: "+91 9900990099",
      emailAddress: "gita.rani@email.com",
      fatherName: "Subhash Chandra",
      education: "5th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-9876"
    },
    addressInfo: {
      completeAddress: "Lane No 5, Near Post Office",
      village: "Adilabad",
      mandal: "Utnoor",
      district: "Adilabad",
      state: "Telangana",
      pinCode: "504001"
    },
    landDetails: [
      {
        landName: "Jungle Border Land",
        landDetails: "Own",
        ownLand: "1.5 Acres"
      },
      {
        landName: "Village Plot",
        landDetails: "Leased Land",
        leasedLand: "1 Acre"
      }
    ],
    cropDetails: {
      landName: "Jungle Border Land",
      plotNumber: "44556",
      landArea: "1.5 acres",
      cropSown: "Rabi 2024",
      variety: "Cotton",
      seedVariety: "BT Cotton"
    },
    livestockDetails: {
      totalLivestock: 7,
      cattle: 3,
      poultry: 20,
      smallAnimals: 4,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [{ name: "Cows", count: 3 }]
        },
        {
          category: "Small Animals",
          items: [{ name: "Sheep", count: 4 }]
        },
        {
          category: "Poultry",
          items: [{ name: "Chickens", count: 20 }]
        }
      ]
    },
    quickStats: {
      totalLand: "2.5 acres",
      familyMembers: 4,
      livestock: 7,
      assets: 15
    },
    familyDetails: {
      totalAdults: 3,
      totalChildren: 1,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 0,
      harvester: 0,
      truck: 0,
      plough: 0,
      sprayer: 1
    }
  }
];

export default initialfarmer;
