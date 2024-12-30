// src/data/seedData.js

export const users = [
  {
    id: "user1",
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "+1234567890",
      createdAt: new Date("2024-01-01"),
      lastLoginAt: new Date("2024-03-15"),
      isActive: true,
    },
    addresses: [
      {
        id: "addr1",
        type: "home",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        isDefault: true,
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      },
      {
        id: "addr2",
        type: "work",
        street: "456 Office Ave",
        city: "New York",
        state: "NY",
        postalCode: "10002",
        isDefault: false,
        coordinates: {
          latitude: 40.7142,
          longitude: -74.0064,
        },
      },
    ],
  },
  {
    id: "user2",
    profile: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phoneNumber: "+1234567891",
      createdAt: new Date("2024-01-15"),
      lastLoginAt: new Date("2024-03-14"),
      isActive: true,
    },
    addresses: [
      {
        id: "addr3",
        type: "home",
        street: "789 Home Rd",
        city: "Brooklyn",
        state: "NY",
        postalCode: "11201",
        isDefault: true,
        coordinates: {
          latitude: 40.6892,
          longitude: -73.9845,
        },
      },
    ],
  },
];

export const restaurants = [
  {
    id: "rest1",
    profile: {
      name: "Pizza Paradise",
      description: "Best New York style pizzas in town",
      phoneNumber: "+1234567892",
      email: "info@pizzaparadise.com",
      website: "www.pizzaparadise.com",
      isActive: true,
      cuisine: "Italian",
      priceRange: "$$",
      openingHours: {
        monday: { open: "11:00", close: "23:00" },
        tuesday: { open: "11:00", close: "23:00" },
        wednesday: { open: "11:00", close: "23:00" },
        thursday: { open: "11:00", close: "23:00" },
        friday: { open: "11:00", close: "00:00" },
        saturday: { open: "12:00", close: "00:00" },
        sunday: { open: "12:00", close: "22:00" },
      },
    },
    address: {
      street: "321 Pizza St",
      city: "New York",
      state: "NY",
      postalCode: "10012",
      coordinates: {
        latitude: 40.7216,
        longitude: -73.9952,
      },
    },
    ratings: {
      averageRating: 4.5,
      totalRatings: 128,
    },
    images: {
      cover:  "https://example.com/pizza-paradise-cover.jpg",
      logo: "https://example.com/pizza-paradise-logo.jpg",
      gallery: [
        "https://example.com/pizza1.jpg",
        "https://example.com/pizza2.jpg",
      ],
    },

    menus : [
      {
        id: "item1",
        categoryId: "cat1",
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, and basil",
        price: 14.99,
        imageUrl: "https://example.com/margherita.jpg",
        isAvailable: true,
        isPopular: true,
        nutritionInfo: {
          calories: 266,
          protein: 11,
          carbohydrates: 33,
        },
        customizationOptions: [
          {
            name: "Size",
            required: true,
            options: [
              { name: 'Small (10")', priceModifier: 0 },
              { name: 'Medium (12")', priceModifier: 4 },
              { name: 'Large (14")', priceModifier: 6 },
            ],
          },
          {
            name: "Extra Toppings",
            required: false,
            options: [
              { name: "Extra Cheese", priceModifier: 2 },
              { name: "Mushrooms", priceModifier: 1.5 },
              { name: "Pepperoni", priceModifier: 2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rest2",
    profile: {
      name: "Sushi Supreme",
      description: "Fresh and authentic Japanese cuisine",
      phoneNumber: "+1234567893",
      email: "info@sushisupreme.com",
      website: "www.sushisupreme.com",
      isActive: true,
      cuisine: "Japanese",
      priceRange: "$$$",
      openingHours: {
        monday: { open: "12:00", close: "22:00" },
        tuesday: { open: "12:00", close: "22:00" },
        wednesday: { open: "12:00", close: "22:00" },
        thursday: { open: "12:00", close: "22:00" },
        friday: { open: "12:00", close: "23:00" },
        saturday: { open: "13:00", close: "23:00" },
        sunday: { open: "13:00", close: "21:00" },
      },
    },
    address: {
      street: "456 Sushi Ave",
      city: "New York",
      state: "NY",
      postalCode: "10013",
      coordinates: {
        latitude: 40.7198,
        longitude: -73.9968,
      },
    },
    ratings: {
      averageRating: 4.7,
      totalRatings: 89,
    },
    images: {
      cover: "https://example.com/sushi-supreme-cover.jpg",
      logo: "https://example.com/sushi-supreme-logo.jpg",
      gallery: [
        "https://example.com/sushi1.jpg",
        "https://example.com/sushi2.jpg",
      ],
    },

    menus : [
      {
        id: "item2",
        categoryId: "cat4",
        name: "California Roll",
        description: "Crab, avocado, cucumber",
        price: 12.99,
        imageUrl: "https://example.com/california-roll.jpg",
        isAvailable: true,
        isPopular: true,
        nutritionInfo: {
          calories: 255,
          protein: 9,
          carbohydrates: 38,
        },
        customizationOptions: [
          {
            name: "Spiciness",
            required: false,
            options: [
              { name: "Regular", priceModifier: 0 },
              { name: "Spicy Mayo", priceModifier: 1 },
            ],
          },
        ],
      },
    ],
  },
];

export const menus = {
  rest1: {
    categories: [
      {
        id: "cat1",
        name: "Classic Pizzas",
        description: "Traditional favorites",
        displayOrder: 1,
      },
      {
        id: "cat2",
        name: "Specialty Pizzas",
        description: "Unique combinations",
        displayOrder: 2,
      },
      {
        id: "cat3",
        name: "Sides",
        description: "Perfect companions",
        displayOrder: 3,
      },
    ],
    items: [
      {
        id: "item1",
        categoryId: "cat1",
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, and basil",
        price: 14.99,
        imageUrl: "https://example.com/margherita.jpg",
        isAvailable: true,
        isPopular: true,
        nutritionInfo: {
          calories: 266,
          protein: 11,
          carbohydrates: 33,
        },
        customizationOptions: [
          {
            name: "Size",
            required: true,
            options: [
              { name: 'Small (10")', priceModifier: 0 },
              { name: 'Medium (12")', priceModifier: 4 },
              { name: 'Large (14")', priceModifier: 6 },
            ],
          },
          {
            name: "Extra Toppings",
            required: false,
            options: [
              { name: "Extra Cheese", priceModifier: 2 },
              { name: "Mushrooms", priceModifier: 1.5 },
              { name: "Pepperoni", priceModifier: 2 },
            ],
          },
        ],
      },
    ],
  },
  rest2: {
    categories: [
      {
        id: "cat4",
        name: "Sushi Rolls",
        description: "Fresh rolled sushi",
        displayOrder: 1,
      },
      {
        id: "cat5",
        name: "Sashimi",
        description: "Fresh raw fish",
        displayOrder: 2,
      },
    ],
    items: [
      {
        id: "item2",
        categoryId: "cat4",
        name: "California Roll",
        description: "Crab, avocado, cucumber",
        price: 12.99,
        imageUrl: "https://example.com/california-roll.jpg",
        isAvailable: true,
        isPopular: true,
        nutritionInfo: {
          calories: 255,
          protein: 9,
          carbohydrates: 38,
        },
        customizationOptions: [
          {
            name: "Spiciness",
            required: false,
            options: [
              { name: "Regular", priceModifier: 0 },
              { name: "Spicy Mayo", priceModifier: 1 },
            ],
          },
        ],
      },
    ],
  },
};

export const deliveryPartners = [
  {
    id: "dp1",
    profile: {
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike@example.com",
      phoneNumber: "+1234567894",
      createdAt: new Date("2024-01-01"),
      lastLoginAt: new Date("2024-03-15"),
      isActive: true,
      isAvailable: true,
      currentLocation: {
        latitude: 40.7128,
        longitude: -74.006,
        lastUpdated: new Date("2024-03-15T10:00:00"),
      },
    },
    documents: {
      drivingLicense: "DL123456",
      vehicleRegistration: "VR123456",
      insurance: "INS123456",
    },
    ratings: {
      averageRating: 4.8,
      totalRatings: 156,
    },
    activeOrder: null,
  },
];

export const orders = [
  {
    id: "order1",
    userId: "user1",
    restaurantId: "rest1",
    deliveryPartnerId: "dp1",
    items: [
      {
        itemId: "item1",
        name: "Margherita Pizza",
        quantity: 2,
        price: 14.99,
        customizations: [
          {
            name: "Size",
            option: 'Medium (12")',
            priceModifier: 4,
          },
          {
            name: "Extra Toppings",
            option: "Extra Cheese",
            priceModifier: 2,
          },
        ],
      },
    ],
    pricing: {
      subtotal: 41.98,
      deliveryFee: 5.0,
      tax: 3.77,
      total: 50.75,
    },
    delivery: {
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      },
      instructions: "Please ring doorbell",
    },
    status: {
      current: "DELIVERED",
      timeline: [
        {
          status: "PLACED",
          timestamp: new Date("2024-03-15T09:00:00"),
          note: "Order received",
        },
        {
          status: "ACCEPTED",
          timestamp: new Date("2024-03-15T09:02:00"),
          note: "Restaurant confirmed order",
        },
        {
          status: "PREPARING",
          timestamp: new Date("2024-03-15T09:05:00"),
          note: "Food preparation started",
        },
        {
          status: "READY",
          timestamp: new Date("2024-03-15T09:25:00"),
          note: "Order ready for pickup",
        },
        {
          status: "PICKED_UP",
          timestamp: new Date("2024-03-15T09:30:00"),
          note: "Driver picked up order",
        },
        {
          status: "DELIVERED",
          timestamp: new Date("2024-03-15T09:45:00"),
          note: "Order delivered successfully",
        },
      ],
    },
    payment: {
      method: "CREDIT_CARD",
      status: "COMPLETED",
      transactionId: "tx123456",
    },
    createdAt: new Date("2024-03-15T09:00:00"),
    updatedAt: new Date("2024-03-15T09:45:00"),
  },
];

export const notifications = [
  {
    id: "notif1",
    userId: "user1",
    userType: "USER",
    type: "ORDER_UPDATE",
    title: "Order Delivered",
    message: "Your order #order1 has been delivered successfully",
    orderId: "order1",
    isRead: false,
    createdAt: new Date("2024-03-15T09:45:00"),
  },
  {
    id: "notif2",
    userId: "rest1",
    userType: "RESTAURANT",
    type: "NEW_ORDER",
    title: "New Order Received",
    message: "New order #order1 received",
    orderId: "order1",
    isRead: true,
    createdAt: new Date("2024-03-15T09:00:00"),
  },
];
