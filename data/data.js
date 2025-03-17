export const categories = [
  {
    id: "menu_cat_1",
    name: "Pizza",
    createdAt: "2025-03-14T12:00:00Z"
  },
  {
    id: "menu_cat_2",
    name: "Sushi",
    createdAt: "2025-03-14T12:00:00Z"
  },
  {
    id: "menu_cat_3",
    name: "Burgers",
    createdAt: "2025-03-14T12:00:00Z"
  },
  {
    id: "menu_cat_4",
    name: "Plats à base de viande",
    createdAt: "2025-03-14T12:00:00Z"
  },
  {
    id: "menu_cat_5",
    name: "Plats à base de poisson",
    createdAt: "2025-03-14T12:00:00Z"
  },
  {
    id: "menu_cat_6",
    name: "Burgers",
    createdAt: "2025-03-14T12:00:00Z"
  }
];



export const restaurants = [
  {
    id: "rest2",
    profile: {
      name: "Saveurs du Cameroun",
      description: "Cuisine camerounaise authentique avec des ingrédients locaux",
      phoneNumber: "+237654321987",
      email: "contact@saveurscameroun.com",
      website: "www.saveurscameroun.com",
      isActive: true,
      cuisine: "Camerounaise",
      priceRange: "$$",
      openingHours: {
        monday: { open: "10:00", close: "22:00" },
        tuesday: { open: "10:00", close: "22:00" },
        wednesday: { open: "10:00", close: "22:00" },
        thursday: { open: "10:00", close: "22:00" },
        friday: { open: "10:00", close: "23:00" },
        saturday: { open: "12:00", close: "23:00" },
        sunday: { open: "12:00", close: "21:00" }
      }
    },
    address: {
      street: "123 Rue de la Gastronomie",
      city: "Douala",
      state: "Littoral",
      postalCode: "BP 1234",
      coordinates: {
        latitude: 4.0511,
        longitude: 9.7679
      }
    },
    ratings: {
      averageRating: 4.8,
      totalRatings: 200
    },
    images: {
      cover: "https://img.freepik.com/photos-gratuite/salle-restaurant-murs-briques-rouges-tables-tuyaux-bois-au-plafond_140725-8504.jpg?t=st=1742204134~exp=1742207734~hmac=894dfa60437669d33ec350b056b63e38319784285261453c88f26ed8c2fa1597&w=826",
      logo: "https://img.freepik.com/photos-gratuite/restaurant-interieur_1127-3392.jpg?t=st=1742204208~exp=1742207808~hmac=a32a3723c81be5242d43255599bcc4b9e4fe0a29573d831571a950150fc591ba&w=900",
      gallery: [
        "https://example.com/ndole.jpg",
        "https://example.com/poissonbraise.jpg",
        "https://example.com/folere.jpg"
      ]
    },
    restaurantCategories: [
      { id: "resto_cat_1", name: "Entrée" },
      { id: "resto_cat_2", name: "Plat principal" },
      { id: "resto_cat_3", name: "Accompagnement" },
      { id: "resto_cat_4", name: "Dessert" },
      { id: "resto_cat_5", name: "Boisson" }
    ],
    menus: [
      {
        id: "item1",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_2",
        name: "Ndolé aux crevettes",
        description: "Feuilles de ndolé mijotées avec des crevettes et des arachides",
        price: 15.99,
        imageUrl: "https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1215,fit=cover/https://prod.cdn-medias.jeuneafrique.com/medias/2020/12/23/jad20201223-ass-cuisine-ndole.jpg",
        isAvailable: true,
        isPopular: true,
        nutritionInfo: {
          calories: 350,
          protein: 25,
          carbohydrates: 40
        },
        customizationOptions: [
          {
            name: "Accompagnement",
            required: true,
            options: [
              { name: "Plantain mûr", priceModifier: 0 },
              { name: "Riz blanc", priceModifier: 0 },
              { name: "Miondo", priceModifier: 1 }
            ]
          }
        ]
      },
      {
        id: "item2",
        menuCategoryId: "menu_cat_5",
        restaurantCategoryId: "resto_cat_2",
        name: "Poisson braisé",
        description: "Poisson grillé avec épices africaines et sauce pimentée",
        price: 18.50,
        imageUrl: "https://img.freepik.com/photos-gratuite/curry-aigre-poisson-tete-serpent-fondue-epicee-jardin-cuisine-thailandaise_1150-26407.jpg?t=st=1742204514~exp=1742208114~hmac=294cfd626c8ce18a9cceb4621a863eee0051fcef25090571f43999846574a34b&w=996",
        isAvailable: true,
        isPopular: true,
        customizationOptions: [
          {
            name: "Type de poisson",
            required: true,
            options: [
              { name: "Bar", priceModifier: 0 },
              { name: "Tilapia", priceModifier: -2 },
              { name: "Capitaine", priceModifier: 3 }
            ]
          },
          {
            name: "Accompagnement",
            required: true,
            options: [
              { name: "Plantains frits", priceModifier: 0 },
              { name: "Riz sauté", priceModifier: 1 },
              { name: "Frites de patates douces", priceModifier: 2 }
            ]
          }
        ]
      },
      {
        id: "item3",
        menuCategoryId: "menu_cat_3",
        restaurantCategoryId: "resto_cat_5",
        name: "Foléré",
        description: "Boisson rafraîchissante à base de fleurs d'hibiscus",
        price: 3.50,
        imageUrl: "https://bellessecrets.org/cdn/shop/products/istockphoto-1273714189-612x612.jpg?v=1671635007&width=612",
        isAvailable: true,
        isPopular: false,
        customizationOptions: [
          {
            name: "Sucre",
            required: false,
            options: [
              { name: "Sans sucre", priceModifier: 0 },
              { name: "Peu sucré", priceModifier: 0 },
              { name: "Sucré", priceModifier: 0 }
            ]
          }
        ]
      },
      {
        id: "item4",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_1",
        name: "Beignets haricot",
        description: "Beignets croustillants accompagnés d’haricots en sauce",
        price: 6.00,
        imageUrl: "https://i.pinimg.com/736x/3f/dd/14/3fdd142f4f7b16f6b4cc2282d5ccb6dc.jpg",
        isAvailable: true,
        isPopular: true,
        customizationOptions: [
          {
            name: "Portion",
            required: true,
            options: [
              { name: "Petite", priceModifier: 0 },
              { name: "Moyenne", priceModifier: 2 },
              { name: "Grande", priceModifier: 4 }
            ]
          }
        ]
      }
    ]
  },
  

  {
    id: "rest3",
    profile: {
      name: "Chez Mama Fanta",
      description: "Spécialités camerounaises faites maison avec des produits locaux",
      phoneNumber: "+237699112233",
      email: "contact@mamafanta.com",
      website: "www.mamafanta.com",
      isActive: true,
      cuisine: "Camerounaise",
      priceRange: "$$",
      openingHours: {
        monday: { open: "09:00", close: "21:00" },
        tuesday: { open: "09:00", close: "21:00" },
        wednesday: { open: "09:00", close: "21:00" },
        thursday: { open: "09:00", close: "21:00" },
        friday: { open: "09:00", close: "22:00" },
        saturday: { open: "10:00", close: "22:00" },
        sunday: { open: "10:00", close: "20:00" }
      }
    },
    address: {
      street: "456 Avenue des Saveurs",
      city: "Yaoundé",
      state: "Centre",
      postalCode: "BP 5678",
      coordinates: {
        latitude: 3.8480,
        longitude: 11.5021
      }
    },
    ratings: {
      averageRating: 4.7,
      totalRatings: 150
    },
    images: {
      cover: "https://img.freepik.com/photos-gratuite/restaurant-interieur_1127-3394.jpg?t=st=1742203638~exp=1742207238~hmac=7ca493c3e43bd00a4feb48526da5e181dcae1ebecd836f2fc716d6a80e9906c6&w=996",
      logo: "https://img.freepik.com/photos-gratuite/salle-ancienne-chine_1417-1692.jpg?t=st=1742203773~exp=1742207373~hmac=5f09a86830f649f8d933c89e6907103cedd75af77f58bc3e4b1079352fe28e5c&w=996",
      gallery: [
        "https://example.com/eru.jpg",
        "https://example.com/kondre.jpg",
        "https://example.com/kossam.jpg"
      ]
    },
    restaurantCategories: [
      { id: "resto_cat_1", name: "Entrée" },
      { id: "resto_cat_2", name: "Plat principal" },
      { id: "resto_cat_3", name: "Accompagnement" },
      { id: "resto_cat_4", name: "Dessert" },
      { id: "resto_cat_5", name: "Boisson" }
    ],
    menus: [
      {
        id: "item1",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_2",
        name: "Eru et Waterfufu",
        description: "Feuilles d'éru cuites avec viande fumée et huile de palme, servies avec du waterfufu",
        price: 14.99,
        imageUrl: "https://example.com/eru.jpg",
        isAvailable: true,
        isPopular: true,
        customizationOptions: [
          {
            name: "Type de viande",
            required: true,
            options: [
              { name: "Viande fumée", priceModifier: 0 },
              { name: "Poisson fumé", priceModifier: 1 },
              { name: "Gésiers", priceModifier: 1 }
            ]
          }
        ]
      },
      {
        id: "item2",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_2",
        name: "Kondrè",
        description: "Plat traditionnel de plantains mijotés avec du porc et des épices",
        price: 16.50,
        imageUrl: "https://cm.jeloutoo.com/wp-content/uploads/2024/08/image-29.webp",
        isAvailable: true,
        isPopular: true,
        customizationOptions: [
          {
            name: "Type de viande",
            required: true,
            options: [
              { name: "Porc", priceModifier: 0 },
              { name: "Poulet", priceModifier: 1 }
            ]
          }
        ]
      },
      {
        id: "item3",
        menuCategoryId: "menu_cat_3",
        restaurantCategoryId: "resto_cat_5",
        name: "Kossam",
        description: "Lait caillé traditionnel du Grand-Nord Cameroun",
        price: 3.00,
        imageUrl: "https://miassar.fr/wp-content/uploads/2024/09/bol-de-yaourt-grec-44720692-1.jpg",
        isAvailable: true,
        isPopular: false,
        customizationOptions: [
          {
            name: "Sucre",
            required: false,
            options: [
              { name: "Sans sucre", priceModifier: 0 },
              { name: "Peu sucré", priceModifier: 0 },
              { name: "Sucré", priceModifier: 0 }
            ]
          }
        ]
      },
      {
        id: "item4",
        menuCategoryId: "menu_cat_5",
        restaurantCategoryId: "resto_cat_2",
        name: "Mbongo Tchobi",
        description: "Sauce noire épicée à base de poissons et épices locales, servie avec du riz ou du plantain",
        price: 17.00,
        imageUrl: "https://i.ytimg.com/vi/2b6S_S8VPTQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCWMgQ8M1v3zLlRRNTmOfpbNmWgcw",
        isAvailable: true,
        isPopular: true,
        customizationOptions: [
          {
            name: "Accompagnement",
            required: true,
            options: [
              { name: "Riz", priceModifier: 0 },
              { name: "Plantains", priceModifier: 1 }
            ]
          }
        ]
      }
    ]
  },
  

  {
    id: "rest4",
    profile: {
      name: "Delizia Burger & Pizza",
      description: "Un restaurant qui propose de délicieuses pizzas, burgers et jus naturels",
      phoneNumber: "+237698765432",
      email: "contact@deliziabp.com",
      website: "www.deliziabp.com",
      isActive: true,
      cuisine: "Internationale",
      priceRange: "$$",
      openingHours: {
        monday: { open: "10:00", close: "22:00" },
        tuesday: { open: "10:00", close: "22:00" },
        wednesday: { open: "10:00", close: "22:00" },
        thursday: { open: "10:00", close: "22:00" },
        friday: { open: "10:00", close: "23:00" },
        saturday: { open: "12:00", close: "23:00" },
        sunday: { open: "12:00", close: "21:00" }
      }
    },
    ratings: {
      averageRating: 4.7,
      totalRatings: 150
    },

    address: {
      street: "456 Avenue des Saveurs",
      city: "Yaoundé",
      state: "Centre",
      postalCode: "BP 5678",
      coordinates: {
        latitude: 3.8480,
        longitude: 11.5021
      }
    },

    images: {
      cover: "https://img.freepik.com/photos-gratuite/burger-boeuf-viande-laitue-tomate-fromage-vue-laterale_141793-3524.jpg?t=st=1742205438~exp=1742209038~hmac=b9ec95122665b612aa931016c1c5dee8c453e42c8bbc49d0ea9caf1ace77f48a&w=996",
      logo: "https://img.freepik.com/photos-gratuite/vue-laterale-pizza-aux-champignons-fromage-olive-noire-au-tomate-frites-salade-cesar-aux-crevettes-grillees-table_141793-5027.jpg?t=st=1742205441~exp=1742209041~hmac=673a2373c348070d43a60f37fa7fc33bdd5cda577e338f75d41dd20154aa9df8&w=996",
      gallery: [
        "https://example.com/eru.jpg",
        "https://example.com/kondre.jpg",
        "https://example.com/kossam.jpg"
      ]
    },
    restaurantCategories: [
      { id: "resto_cat_1", name: "Pizza" },
      { id: "resto_cat_2", name: "Burger" },
      { id: "resto_cat_3", name: "Boisson" },
      { id: "resto_cat_4", name: "Dessert" }
    ],
    menus: [
      {
        id: "item1",
        menuCategoryId: "menu_cat_1",
        restaurantCategoryId: "resto_cat_1",
        name: "Pizza Margherita",
        description: "Pizza classique avec sauce tomate, mozzarella et basilic frais",
        price: 12.5,
        imageUrl: "https://img.freepik.com/photos-gratuite/vue-laterale-pizza-aux-aubergines-tranches-grillees-fromage-aubergine-tomate-viande-rouge-poivron-table_141793-4890.jpg?t=st=1742205529~exp=1742209129~hmac=0f0ed7a2bda76c4a147d1ee7e62fc04e364c624f6b4971272055dbc17f0a8324&w=996",
        isAvailable: true,
        customizationOptions: [
          {
            name: "Taille",
            required: true,
            options: [
              { name: "Petite", priceModifier: -2 },
              { name: "Moyenne", priceModifier: 0 },
              { name: "Grande", priceModifier: 3 }
            ]
          }
        ]
      },
      {
        id: "item2",
        menuCategoryId: "menu_cat_2",
        restaurantCategoryId: "resto_cat_2",
        name: "Burger Classique",
        description: "Burger avec steak haché, fromage, salade et sauce maison",
        price: 8.5,
        imageUrl: "https://img.freepik.com/photos-gratuite/vue-face-savoureux-burger-tomates-au-fromage-olives-salade-verte-interieur-assiette-ronde_140725-11661.jpg?t=st=1742205519~exp=1742209119~hmac=552a2cbb9b239773da3ce82cf58e93b3fc7796032a1498518f644eb488dcc2da&w=740",
        isAvailable: true,
        customizationOptions: [
          {
            name: "Accompagnement",
            required: true,
            options: [
              { name: "Frites", priceModifier: 0 },
              { name: "Salade verte", priceModifier: 0 },
              { name: "Onion rings", priceModifier: 1 }
            ]
          }
        ]
      },
      {
        id: "item3",
        menuCategoryId: "menu_cat_3",
        restaurantCategoryId: "resto_cat_3",
        name: "Jus d'orange frais",
        description: "Jus naturel pressé à base d'oranges fraîches",
        price: 3.0,
        imageUrl: "https://img.freepik.com/photos-gratuite/fruits-orange-verre-jus-table-bois_114579-11987.jpg?t=st=1742205617~exp=1742209217~hmac=dc7547d44bd0bc6f049527a7fc6112ce24cc3220c5c3750d5038635b4b71243d&w=996",
        isAvailable: true
      },
      {
        id: "item4",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_4",
        name: "Glace au chocolat",
        imageUrl: "https://img.freepik.com/psd-gratuit/creme-glacee-au-chocolat-decadente-biscuits-creme-fouettee_84443-37061.jpg?t=st=1742205643~exp=1742209243~hmac=6e309ddfbc51095e60adaf5f8b331fa25bb262c62cd9e8ae27f94a4c759e9106&w=740",
        description: "Glace crémeuse au chocolat avec pépites de chocolat noir",
        price: 4.5,
        isAvailable: true
      }
    ]
  },

  


]
