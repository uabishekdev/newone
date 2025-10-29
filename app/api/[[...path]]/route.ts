import { NextRequest, NextResponse } from "next/server";

const farmConfigs: Record<string, any> = {
  "farmer-joe": {
    farmSlug: "farmer-joe",
    name: "Farmer Joe's Dairy",
    tagline: "No Kill, No Soy, No Corn, No Silage - No Bullshit",
    domain: "farmerjoe.com",
    layout: "boxed",
    sections: [
      { type: "hero", variant: "image-left" },
      { type: "products", variant: "grid" },
      { type: "locations", variant: "map" },
      { type: "eventShare", variant: "card" },
      { type: "distributor", variant: "form" },
    ],
    theme: {
      colors: {
        primary: "#D2691E",
        secondary: "#5E9A5C",
        cream: "#FCFCF9",
        brown: "#5E5240",
      },
      fontFamily: "Inter, sans-serif",
      fontDisplay: "Poppins, sans-serif",
      borderRadius: "12px",
    },
    contact: {
      email: "hello@farmerjoe.com",
      phone: "(555) 123-MILK",
    },
    social: {
      instagram: "@farmerjoe_dairy",
      facebook: "Farmer Joe Dairy",
      youtube: "Farmer Joe Stories",
    },
  },
};

export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const segments = path.split("/").filter(Boolean);

    // Handle different API routes
    if (segments[0] === "api") {
      // GET /api/farms/:farmSlug - Get farm configuration
      if (segments[1] === "farms" && segments[2]) {
        const farmSlug = segments[2];
        const config = farmConfigs[farmSlug];

        if (!config) {
          return NextResponse.json(
            { error: "Farm not found" },
            { status: 404 }
          );
        }

        return NextResponse.json(config);
      }

      // GET /api/locations?farmSlug=farmer-joe - Get pickup locations
      if (segments[1] === "locations") {
        const farmSlug = request.nextUrl.searchParams.get("farmSlug");

        const locations = [
          {
            id: "1",
            name: "Downtown Pickup Point",
            address: "123 Main St, City Center",
            lat: 37.7749,
            lng: -122.4194,
            type: "pickup",
          },
          {
            id: "2",
            name: "Northside Farm Store",
            address: "456 North Ave, Suburb",
            lat: 37.7849,
            lng: -122.4094,
            type: "store",
          },
          {
            id: "3",
            name: "Main Farm Location",
            address: "789 Farm Road, Countryside",
            lat: 37.7649,
            lng: -122.4294,
            type: "farm",
          },
        ];

        return NextResponse.json({ locations });
      }

      // GET /api/products?farmSlug=farmer-joe - Get products
      if (segments[1] === "products") {
        const products = [
          {
            id: "1",
            name: "Raw A2 Milk",
            description: "No Corn • No Soy",
            price: "$12.99/bottle",
            image:
              "https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/roh0bgz9_WhatsApp%20Image%202025-10-25%20at%2015.11.27_b85b7a24.jpg",
            features: ["100% Grass-Fed", "A2 Protein", "No Hormones"],
          },
          {
            id: "2",
            name: "Raw A2 Ghee",
            description: "100% Pure Grass-Fed",
            price: "$24.99/jar",
            image:
              "https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg",
            features: ["Clarified Butter", "High Smoke Point", "Rich Flavor"],
          },
          {
            id: "3",
            name: "Paneer",
            description: "Handcrafted from A2 Cow Milk",
            price: "$16.99/pack",
            image:
              "https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/bpolvpr8_WhatsApp%20Image%202025-10-25%20at%2015.08.50_7128accb.jpg",
            features: ["No Preservatives", "No Vinegar", "100% Natural"],
          },
        ];

        return NextResponse.json({ products });
      }
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const segments = path.split("/").filter(Boolean);

    if (segments[0] === "api") {
      // POST /api/distributor-signup - Distributor application
      if (segments[1] === "distributor-signup") {
        const data = await request.json();

        // Mock: In production, save to database/Firebase
        console.log("Distributor signup:", data);

        // Mock successful response
        return NextResponse.json({
          success: true,
          message: "Application received! We will contact you within 48 hours.",
          applicationId: `APP-${Date.now()}`,
        });
      }

      // POST /api/event-share - Social media share submission
      if (segments[1] === "event-share") {
        const data = await request.json();

        console.log("Event share:", data);

        return NextResponse.json({
          success: true,
          message: "Thank you for sharing your experience!",
        });
      }
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
