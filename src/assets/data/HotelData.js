import hotel1 from "../../assets/hotel/hotel1.jpg";
import hotel2 from "../../assets/hotel/hotel2.jpg";
import hotel3 from "../../assets/hotel/hotel4.jpg";
import hotel4 from "../../assets/hotel/hotel4.jpg";

import room1 from "../../assets/room/room1.jpg";
import room2 from "../../assets/room/room2.jpg";
import room3 from "../../assets/room/room3.jpg";
import room4 from "../../assets/room/room4.jpg";


export const hotelLists = [
    { 
      id:1,
      roomId:[1,2,3],
      name: "Sayeman Heritage",
      destination: "Cox's Bazar",
      country: "Bangladesh",
      images:[
        hotel1,
        hotel2,
        hotel3,
        hotel4
      ],
      rating:"5",
      discount:"47%",
      newprice:"BDT 10,364",
      oldPrice:"BDT 19,763",
      location:" Sayeman Road, Cox's Bazar Sadar",
      nearby:[
        "0.27 km from Radiant Fish World",
       " 2.2 km from Cox's Bazar Beach",
       " 3.9 km from Kolatoli Bus Stand",
      "  3.1 km from Dolphin Moor Police Box"
      ],
      facilities: [
        {
            general:[
             "Accessible Bathroom",
             "Check-In",
             "Check-Out",
             "Air Conditioning",
             "City Centre",
             "Coffee/Tea in Lobby",
             "Elevator",
             "Garden",
             "ID Required",
             "Lockers",
             "Smoke detector",
             "Couple Friendly",
             "Towel"
            ],
            businessFacilities:[
                "Conference Hostess"
            ],
            fitnessWellnessFacilities:[
               " Swimming Pool"
            ],
            mediaTechnology:[
                "Mobile Phone Coverage"
            ],
            parking:[
                "Large Vehicle Parking"
            ],
            safetySecurity:[
               " 24-Hour Security"
            ],
            transportation:[
                "Airport Shuttle Service",
                "Free Airport Shuttle Service"
            ]

        }
      ], 
      policy:[
       {
        checkIn:"14:00",
        checkOut:"12:00",
        childPolicy:[
            "Allowed",
            "02 Children under 5 years of age can stay in the same room and enjoy a complimentary breakfast.",
            "Children between 5 - 10 years of age will need an extra breakfast at the rate of BDT 500/-.",
            "Children above 11 years of age will be considered adults, and an extra bed along with breakfast will be required.",
            "An additional bed with breakfast rate for an adult is BDT 1,600."
        ],
        petPolicy:"Not Allowed"
       }
      ],
      rooms: 156,
      roomsRemaining:6,
      floors:9,
      construction:2023,
      houseRules:"Buffet breakfast timing is: 7 AM- 10.30 AM.1 hour access to pool. Timing is within 7 AM- 10.30 AM. Hotel check-in time is 14:00 hours (02:00 pm), and check-out time is 12:00 hours (12:00 pm).",
      description:`With over 50 years of legacy, Sayeman Heritage is going to bring a new dimension to the tourism industry in Cox’s Bazar. Sayeman, a legendary landmark in Cox’s Bazar frequented by famous celebrities, heads of state, and other dignitaries since 1964, has opened a new chapter in its fifty-year history with the launch of a five-star standard hotel named Sayeman Heritage in Cox’s Bazar. It stands as a prominent residence resort, offering a blend of modern amenities and traditional hospitality on one of the world's longest natural sandy sea beaches.`
    },


    { 
      id:2,
      roomId:[1,2,3],
      name: "Royal Pearl Suites",
      destination: "Cox's Bazar",
      country: "Bangladesh",
      images:[
        hotel1,
        hotel2,
        hotel3,
        hotel4
      ],
      rating:"5",
      discount:"47%",
      newprice:"BDT 10,364",
      oldPrice:"BDT 19,763",
      location:" Sayeman Road, Cox's Bazar Sadar",
      nearby:[
        "0.27 km from Radiant Fish World",
       " 2.2 km from Cox's Bazar Beach",
       " 3.9 km from Kolatoli Bus Stand",
      "  3.1 km from Dolphin Moor Police Box"
      ],
      facilities: [
        {
            general:[
             "Accessible Bathroom",
             "Check-In",
             "Check-Out",
             "Air Conditioning",
             "City Centre",
             "Coffee/Tea in Lobby",
             "Elevator",
             "Garden",
             "ID Required",
             "Lockers",
             "Smoke detector",
             "Couple Friendly",
             "Towel"
            ],
            businessFacilities:[
                "Conference Hostess"
            ],
            fitnessWellnessFacilities:[
               " Swimming Pool"
            ],
            mediaTechnology:[
                "Mobile Phone Coverage"
            ],
            parking:[
                "Large Vehicle Parking"
            ],
            safetySecurity:[
               " 24-Hour Security"
            ],
            transportation:[
                "Airport Shuttle Service",
                "Free Airport Shuttle Service"
            ]

        }
      ], 
      policy:[
       {
        checkIn:"14:00",
        checkOut:"12:00",
        childPolicy:[
            "Allowed",
            "02 Children under 5 years of age can stay in the same room and enjoy a complimentary breakfast.",
            "Children between 5 - 10 years of age will need an extra breakfast at the rate of BDT 500/-.",
            "Children above 11 years of age will be considered adults, and an extra bed along with breakfast will be required.",
            "An additional bed with breakfast rate for an adult is BDT 1,600."
        ],
        petPolicy:"Not Allowed"
       }
      ],
      rooms: 156,
      roomsRemaining:4,
      floors:9,
      construction:2023,
      houseRules:"Buffet breakfast timing is: 7 AM- 10.30 AM.1 hour access to pool. Timing is within 7 AM- 10.30 AM. Hotel check-in time is 14:00 hours (02:00 pm), and check-out time is 12:00 hours (12:00 pm).",
      description:`With over 50 years of legacy, Sayeman Heritage is going to bring a new dimension to the tourism industry in Cox’s Bazar. Sayeman, a legendary landmark in Cox’s Bazar frequented by famous celebrities, heads of state, and other dignitaries since 1964, has opened a new chapter in its fifty-year history with the launch of a five-star standard hotel named Sayeman Heritage in Cox’s Bazar. It stands as a prominent residence resort, offering a blend of modern amenities and traditional hospitality on one of the world's longest natural sandy sea beaches.`
    },
    
  ];





  export const rooms = [
    { 
      id:1,
      name: "Master Suite",
      size: " King",
      person:[
        {
            adult:2,
            child:2,
            maxRoomCapacity:4
        }
      ],
      refundPolicy:"Refundable",
      extraBed:1,
      roomType:"Suite",
      smoking:"Non-Smoking Room",
      price:"BDT 10,364",
      roomCharacteristics:"Executive Deluxe",
      roomView:"City View",
      images:[
        room1,
        room2,
        room3,
        room4
      ],
      facilities: [
        {
            bedroomFacilities:[
             "Air Conditioning",
             "In-Room Safe",
             "Fan",
             "Blankets",
             "Closet",
             "Curtain",
             "Extra Bedding",
             "Connecting Rooms",
            ],
            bathroomFacilities:[
                "Toiletries",
                "Towels",
                "Hot Water",
                "Hairdryer",
                "Bathroom"
            ],
            others:[
               "220V Socket",
               "Electric Kettle",
               "Free Newspaper",
               "Housekeeping",
               "Linens",
               "Non-Smoking",
               "Slippers",
               "Wheelchair Friendly",
               "Living Room",
               "Sofa"
            ],
            foodDrink:[
             "Coffee/Tea Maker",
             "Free Bottled Water",
             "Mini Fridge",
            ],
            mediaTechnology:[
                "Internet",
                "Television Content",
                "Telephone",
                "TV",
                "Wi-Fi"
            ],
        }
      ], 
      
    },

    { 
      id:2,
      name: "Master Suite",
      size: " King",
      person:[
        {
            adult:2,
            child:2,
            maxRoomCapacity:4
        }
      ],
      refundPolicy:"Refundable",
      extraBed:1,
      roomType:"Suite",
      smoking:"Non-Smoking Room",
      roomCharacteristics:"Executive Deluxe",
      roomView:"City View",
      images:[
        room1,
        room2,
        room3,
        room4
      ],
      facilities: [
        {
            bedroomFacilities:[
             "Air Conditioning",
             "In-Room Safe",
             "Fan",
             "Blankets",
             "Closet",
             "Curtain",
             "Extra Bedding",
             "Connecting Rooms",
            ],
            bathroomFacilities:[
                "Toiletries",
                "Towels",
                "Hot Water",
                "Hairdryer",
                "Bathroom"
            ],
            others:[
               "220V Socket",
               "Electric Kettle",
               "Free Newspaper",
               "Housekeeping",
               "Linens",
               "Non-Smoking",
               "Slippers",
               "Wheelchair Friendly",
               "Living Room",
               "Sofa"
            ],
            foodDrink:[
             "Coffee/Tea Maker",
             "Free Bottled Water",
             "Mini Fridge",
            ],
            mediaTechnology:[
                "Internet",
                "Television Content",
                "Telephone",
                "TV",
                "Wi-Fi"
            ],
        }
      ], 
      
    },
    
  ];


  export const hotelArea = [
    {
      value: "Cox's Bazar",
      label: "Cox's Bazar",
      country:"Bangladesh"
    },
    {
      value: "Sylhet",
      label: "Sylhet",
      country:"Bangladesh"
    },
    {
      value: "Sreemangal",
      label: "Sreemangal",
      country:"Bangladesh"
    },
    {
      value: "Gazipur",
      label: "Gazipur",
      country:"Bangladesh"
    },
    {
      value: "Chittagong",
      label: "Chittagong",
      country:"Bangladesh"
    },
  ];