export const categories = [
  {
    id: "menu_cat_1",
    name: "Pizza",
    createdAt: "2025-03-14T12:00:00Z",
    img:'https://media.istockphoto.com/id/157614650/fr/photo/pizzas-dans-un-four-%C3%A0-bois.jpg?s=2048x2048&w=is&k=20&c=S8ig12zc-mNzPcQYGKY6QEa1AyC85Bsge1B09GcyJpY=',
  },
  {
    id: "menu_cat_2",
    name: "Sushi",
    createdAt: "2025-03-14T12:00:00Z",
    img:'https://media.istockphoto.com/id/1932845749/fr/photo/rouleaux-de-sushi-au-saumon-fromage-caviar.jpg?s=2048x2048&w=is&k=20&c=P7KEY5CQ6LCfwaLZM496yORNW26a4eueCOB88hemjbM=',
  },
  {
    id: "menu_cat_3",
    name: "Burgers",
    createdAt: "2025-03-14T12:00:00Z",
    img:'https://media.istockphoto.com/id/2061716709/fr/photo/burger-de-c%C3%B4tes-grill%C3%A9es.jpg?s=2048x2048&w=is&k=20&c=a5Ye2NrPjJJzjwg8V8jkWlo8PAsYVKiQA-uz4mt7zkc=',
  },
  {
    id: "menu_cat_4",
    name: "Plats à base de viande",
    createdAt: "2025-03-14T12:00:00Z",
    img:'https://media.istockphoto.com/id/1157957403/fr/photo/pommes-de-terre-frites-traditionnelles-avec-le-porc-et-les-champignons-plan-rapproch%C3%A9dans-une.jpg?s=2048x2048&w=is&k=20&c=ZAe5BFJh2dITLgvUB9G3trbaSE9PWyY0xDTE5ibQzmA=',
  },
  {
    id: "menu_cat_5",
    name: "Plats à base de poisson",
    createdAt: "2025-03-14T12:00:00Z",
    img:'https://media.istockphoto.com/id/181871156/fr/photo/avec-des-tomates-cerises.jpg?s=1024x1024&w=is&k=20&c=sfGh6fugq0WRzcmHsP2i_V_pHZhO1-xW-EjMMS74Wik=',
  },
  
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
        {id:0, image: "https://img.freepik.com/photos-gratuite/salle-restaurant-murs-briques-rouges-tables-tuyaux-bois-au-plafond_140725-8504.jpg?t=st=1742204134~exp=1742207734~hmac=894dfa60437669d33ec350b056b63e38319784285261453c88f26ed8c2fa1597&w=826"},
          {id:1,image: "https://media.istockphoto.com/id/1343182422/fr/photo/restaurant-design-rustique-vide-avec-des-meubles-en-bois-et-quelques-plantes-d%C3%A9coratives.jpg?s=2048x2048&w=is&k=20&c=gLqDrFaCsO6qQ2WAT9aqXTZSKGUaFujqkEjq2UNcnCE="},
            {id:2,image:  "https://media.istockphoto.com/id/1307190527/fr/photo/serveur-heureux-servant-la-nourriture-au-groupe-damis-dans-un-pub.jpg?s=1024x1024&w=is&k=20&c=RymcxvL3zjGIop__fUhS47u7nFaA98XRIg-2cMUZW9M="},
              {id:3,image:  "https://media.istockphoto.com/id/1409730005/fr/photo/chef-cuisinant-dans-un-restaurant-et-flamboyant-la-nourriture.jpg?s=1024x1024&w=is&k=20&c=o_tpl9Jk-9JKduYWAGYfR9_XJ64z-4_DBp12DaKf3tE="}
      ]
    },
    restaurantCategories: [
      { id: "resto_cat_1", name: "Entrée",img:'https://media.istockphoto.com/id/2154072857/fr/photo/roasted-pork-tostada.jpg?s=1024x1024&w=is&k=20&c=qMEgwoiu6HUnmGUrvlA8sr4s0YSgcqvitJPG1ow3G_E=' },
      { id: "resto_cat_2", name: "Plat principal",img:'https://media.istockphoto.com/id/1302847109/fr/photo/plan-rapproch%C3%A9-sur-une-soupe-de-l%C3%A9gumes-et-de-poulet.jpg?s=1024x1024&w=is&k=20&c=FUcNQ68OF-RbNF3E2FbHRJbecJ0Mv2dFpFwKqJCFeKI='  },
      { id: "resto_cat_4", name: "Dessert",img:'https://media.istockphoto.com/id/2104145623/fr/photo/almond-cookies-and-various-sweet-cakes-for-a-wedding-banquet-a-delicious-reception-a.jpg?s=1024x1024&w=is&k=20&c=o5D07T9omPD0YrCHBx5XD34OcYsorYltqKEQQW68l2A=' },
      { id: "resto_cat_5", name: "Boisson",img:'https://media.istockphoto.com/id/2162110995/fr/photo/soft-drinks.jpg?s=1024x1024&w=is&k=20&c=l9zResODli1TGmZpqAwncGHAH-2p_hl8j_Z87EIEPgQ=' }
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
              { name: "Tilapia", priceModifier: 2 },
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
      },
      {
        id: "item5",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_1",
        name: "Salade de fruits",
        description: "Bol végétalien coloré avec quinoa et patate douce",
        price: 6.00,
        imageUrl: "https://media.istockphoto.com/id/1416818056/fr/photo/bol-v%C3%A9g%C3%A9talien-color%C3%A9-avec-quinoa-et-patate-douce.jpg?s=1024x1024&w=is&k=20&c=8IG6C6_qYsa_uaoiOcTtUMX7RKu70kBf4pReMDO190o=",
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
      },
      {
        id: "item5",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_4",
        name: "Gateau chocolat",
        description: "Dessert Gâteau au chocolat",
        price: 8.00,
        imageUrl: "https://media.istockphoto.com/id/155598375/fr/photo/dessert-g%C3%A2teau-au-chocolat.jpg?s=1024x1024&w=is&k=20&c=mRzJkkAnBdl32bRyeMkQ-e8vMs708Nsh3rNFQC8rRpI=",
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
      },
      {
        id: "item6",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_4",
        name: "Crème",
        description: "Crème glacée de curcuma de couleur dorée faite maison",
        price: 8.00,
        imageUrl: "https://media.istockphoto.com/id/1153599272/fr/photo/cr%C3%A8me-glac%C3%A9e-de-curcuma-de-couleur-dor%C3%A9e-faite-maison.jpg?s=1024x1024&w=is&k=20&c=vhAP1aVPtsOSVSw_o2N1TPODCONqltGEPRLqAkJHJvU=",
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
          {id:0,image:"https://img.freepik.com/photos-gratuite/restaurant-interieur_1127-3394.jpg?t=st=1742203638~exp=1742207238~hmac=7ca493c3e43bd00a4feb48526da5e181dcae1ebecd836f2fc716d6a80e9906c6&w=996"},
          {id:1,image: "https://media.istockphoto.com/id/2048176515/fr/photo/un-chef-parle-%C3%A0-un-%C3%A9tudiant-dans-un-cours-de-cuisine.jpg?s=1024x1024&w=is&k=20&c=MC1UMmdpy9qKnOoqBL7vuPSCSLTYN2Tyb2RALQAk8B8="},
         {id:2,image:"https://media.istockphoto.com/id/1817748583/fr/photo/heureux-jeune-couple-amoureux-sembrassant-boire-du-vin-rouge-avoir-un-d%C3%AEner-romantique.jpg?s=1024x1024&w=is&k=20&c=b3BVMJ9gTz-_uA0cOvNonthH9oOmHMU2c9at1-10M0Q="},
          {id:3,image: "https://media.istockphoto.com/id/1411971240/fr/photo/vin-et-verre-champain-dans-les-mariages-et-%C3%A9v%C3%A9nements-de-luxe.jpg?s=1024x1024&w=is&k=20&c=DKgaDGwOWnJDkom-oOpZo212vgejYh2iKerQjXlTe6A="}
      ]
    },
    restaurantCategories: [
      { id: "resto_cat_1", name: "Entrée",img:'https://media.istockphoto.com/id/2154072857/fr/photo/roasted-pork-tostada.jpg?s=1024x1024&w=is&k=20&c=qMEgwoiu6HUnmGUrvlA8sr4s0YSgcqvitJPG1ow3G_E=' },
      { id: "resto_cat_2", name: "Plat principal",img:'https://media.istockphoto.com/id/1302847109/fr/photo/plan-rapproch%C3%A9-sur-une-soupe-de-l%C3%A9gumes-et-de-poulet.jpg?s=1024x1024&w=is&k=20&c=FUcNQ68OF-RbNF3E2FbHRJbecJ0Mv2dFpFwKqJCFeKI='  },
      { id: "resto_cat_4", name: "Dessert" ,img:'https://media.istockphoto.com/id/2104145623/fr/photo/almond-cookies-and-various-sweet-cakes-for-a-wedding-banquet-a-delicious-reception-a.jpg?s=1024x1024&w=is&k=20&c=o5D07T9omPD0YrCHBx5XD34OcYsorYltqKEQQW68l2A=' },
      { id: "resto_cat_5", name: "Boisson",img:'https://media.istockphoto.com/id/2162110995/fr/photo/soft-drinks.jpg?s=1024x1024&w=is&k=20&c=l9zResODli1TGmZpqAwncGHAH-2p_hl8j_Z87EIEPgQ='  }
    ],
    menus: [
      {
        id: "item1",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_2",
        name: "Eru et Waterfufu",
        description: "Feuilles d'éru cuites avec viande fumée et huile de palme, servies avec du waterfufu",
        price: 14.99,
        imageUrl: "https://cm.jeloutoo.com/wp-content/uploads/2024/08/image-29.webp",
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
        imageUrl: "https://z-p3-scontent.fdla3-2.fna.fbcdn.net/v/t39.30808-6/455787073_1009397060984038_5790602320121678058_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LuFjcVCDgjEQ7kNvgE8JM6S&_nc_oc=AdhBt2td8kfdfCxRf6cVoHvxf15EvYazdF_JK10MuvKoPMQrQuDvgm3RSoIxlxvlQ54&_nc_zt=23&_nc_ht=z-p3-scontent.fdla3-2.fna&_nc_gid=bzlVo4-QgrInhuZXS1vxHA&oh=00_AYFSjelVHUJ2bGM8miRNzkfGGjt9j94c7cmvVgYDBlsA2w&oe=67DF64C7",
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
        imageUrl: "https://z-p3-scontent.fdla3-2.fna.fbcdn.net/v/t39.30808-6/481222718_3923204587937645_4015113520658607025_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=UU7vteJDjgMQ7kNvgF1Ja-k&_nc_oc=AdhjDMpfn3F6G4k9DhWsKQEbzqRd5h649XSMlC0Q-mCLIQyeTfUQYhaczbcq3PhRnq0&_nc_zt=23&_nc_ht=z-p3-scontent.fdla3-2.fna&_nc_gid=SLzoHD1Qq8kAwr93y8e12Q&oh=00_AYFSov1KQE2kP1lr-1qLG4MBkW5uJcxELXToe3hBFBPuwQ&oe=67DF30A3",
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
      },
      {
        id: "item5",
        menuCategoryId: "menu_cat_5",
        restaurantCategoryId: "resto_cat_1",
        name: "Cafe noir",
        description: "Café d'une cafetière à piston",
        price: 5.00,
        imageUrl: "https://media.istockphoto.com/id/493685876/fr/photo/caf%C3%A9-dune-cafeti%C3%A8re-%C3%A0-piston.jpg?s=2048x2048&w=is&k=20&c=eS61ioXR425nsWnTN4Fo_wXRWqj3Nx-CEoPe_BGWRZc=",
        isAvailable: true,
        isPopular: true,
        customizationOptions: [
          {
            name: "Accompagnement",
            required: true,
            options: [
              { name: "Pain simple", priceModifier: 0 },
              { name: "Pain Complet", priceModifier: 1 },
              { name: "Croissant", priceModifier: 2 },
            ]
          }
        ]
      },
       {
        id: "item6",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_1",
        name: "Lait ",
        description: "Lait glacé à l’avocat",
        price: 5.00,
        imageUrl: "https://media.istockphoto.com/id/2166941398/fr/photo/lait-glac%C3%A9-%C3%A0-lavocat.jpg?s=2048x2048&w=is&k=20&c=VXTSZyCBo1vUdQc7iutRKIr84cHzBRSeh7bY5oqjokE=",
        isAvailable: true,
        isPopular: true,
        customizationOptions: [
          {
            name: "Accompagnement",
            required: true,
            options: [
              { name: "Pain simple", priceModifier: 0 },
              { name: "Pain Complet", priceModifier: 1 },
              { name: "Croissant", priceModifier: 2 },
            ]
          }
        ]
      },
      {
        id: "item7",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_4",
        name: "Crêpes ",
        description: "Crêpes avec la crème au chocolat",
        price: 7.00,
        imageUrl: "https://media.istockphoto.com/id/482294017/fr/photo/cr%C3%AApes-avec-la-cr%C3%A8me-au-chocolat.jpg?s=1024x1024&w=is&k=20&c=6OUte00rm6QYeQ4qimX17qiw5w_r-fCgaYnt3q4h9Rc=",
        isAvailable: true,
        isPopular: true,
      },
      {
        id: "item8",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_4",
        name: "Cacahouettes ",
        description: "Cacahouettes au chocolat",
        price: 7.00,
        imageUrl: "https://media.istockphoto.com/id/2160482994/fr/photo/chocolate-peanut-butter-flavored-breakfast-cereal.jpg?s=1024x1024&w=is&k=20&c=PysbOfBUf32006dr5M_bFJi-vGXcStf7l5Y9S0AJzdw=",
        isAvailable: true,
        isPopular: true,
      },
      {
        id: "item9",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_5",
        name: "Bière ",
        description: "Verser de la bière dans un grand verre",
        price: 15.00,
        imageUrl: "https://media.istockphoto.com/id/509658188/fr/photo/de-la-bi%C3%A8re.jpg?s=1024x1024&w=is&k=20&c=GS2J5YY_S73zye_otjvI4SeT_IERDNeawsKRkINPMuA=",
        isAvailable: true,
        isPopular: true,
      },
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
      {id:0,image:"https://img.freepik.com/photos-gratuite/burger-boeuf-viande-laitue-tomate-fromage-vue-laterale_141793-3524.jpg?t=st=1742205438~exp=1742209038~hmac=b9ec95122665b612aa931016c1c5dee8c453e42c8bbc49d0ea9caf1ace77f48a&w=996"},
      {id:1,image: "https://media.istockphoto.com/id/1532635073/fr/photo/table-de-restaurant-en-plein-air-dans-la-vieille-ville-dantibes-sud-de-la-france.jpg?s=1024x1024&w=is&k=20&c=8sCYXfM40oiAkjpiAunsSZpeqWr9OhmKE3xxeuJjmSk="},
        {id:2,image: "https://media.istockphoto.com/id/1483798027/fr/photo/int%C3%A9rieur-du-restaurant-avec-table-buffet.jpg?s=1024x1024&w=is&k=20&c=a--q6grxVNOUKre_GZIUM1yqZOBPvsQOSbP7gA0ggH4="},
          {id:3,image: "https://media.istockphoto.com/id/1198047486/fr/photo/choisir-ce-quil-faut-manger.jpg?s=1024x1024&w=is&k=20&c=yarROti2niUZwEc4uzNh2KlrJXQ4_Akdz4f9jxc3Lb4="}
      ]
    },
    restaurantCategories: [
      { id: "resto_cat_1", name: "Pizza", img:'https://media.istockphoto.com/id/157614650/fr/photo/pizzas-dans-un-four-%C3%A0-bois.jpg?s=2048x2048&w=is&k=20&c=S8ig12zc-mNzPcQYGKY6QEa1AyC85Bsge1B09GcyJpY=', },
      { id: "resto_cat_2", name: "Burger" , img:'https://media.istockphoto.com/id/2061716709/fr/photo/burger-de-c%C3%B4tes-grill%C3%A9es.jpg?s=2048x2048&w=is&k=20&c=a5Ye2NrPjJJzjwg8V8jkWlo8PAsYVKiQA-uz4mt7zkc=',},
      { id: "resto_cat_3", name: "Boisson" ,img:'https://media.istockphoto.com/id/2162110995/fr/photo/soft-drinks.jpg?s=1024x1024&w=is&k=20&c=l9zResODli1TGmZpqAwncGHAH-2p_hl8j_Z87EIEPgQ='},
      { id: "resto_cat_4", name: "Dessert" ,img:'https://media.istockphoto.com/id/2104145623/fr/photo/almond-cookies-and-various-sweet-cakes-for-a-wedding-banquet-a-delicious-reception-a.jpg?s=1024x1024&w=is&k=20&c=o5D07T9omPD0YrCHBx5XD34OcYsorYltqKEQQW68l2A='}
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
      },
      {
        id: "item5",
        menuCategoryId: "menu_cat_5",
        restaurantCategoryId: "resto_cat_3",
        name: "Vin rouge",
        description: "Jus a base des fruits rouge et raisins ",
        price: 15,
        imageUrl: "https://media.istockphoto.com/id/698911580/fr/photo/gar%C3%A7on-verser-un-verre-de-vin-rouge-terrasse-ext%C3%A9rieure-d%C3%A9gustation-en-journ%C3%A9e-ensoleill%C3%A9e.jpg?s=1024x1024&w=is&k=20&c=ZslxkR5vsOU2dtxRwHCmrcjmLl58qy00u2QbHN2mD6Y=",
        isAvailable: true,
      },
      {
        id: "item6",
        menuCategoryId: "menu_cat_1",
        restaurantCategoryId: "resto_cat_1",
        name: "Pizza ",
        description: "Pizza au pepperoni en boîte avec saucisse de salami épicée, fromage mozzarella, sauce tomate",
        price: 12.5,
        imageUrl: "https://media.istockphoto.com/id/1496792112/fr/photo/pizza-au-pepperoni-en-bo%C3%AEte-avec-saucisse-de-salami-%C3%A9pic%C3%A9e-fromage-mozzarella-sauce-tomate.jpg?s=2048x2048&w=is&k=20&c=cYlkjy6M_WJDYaHm8D1ZOr98b0vamR1ZaK-EYx2Ovrk=",
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
        id: "item7",
        menuCategoryId: "menu_cat_2",
        restaurantCategoryId: "resto_cat_2",
        name: "Hamburger et frites",
        description: "Hamburger et frites",
        price: 8.5,
        imageUrl: "https://media.istockphoto.com/id/182686537/fr/photo/hamburger-et-frites.jpg?s=1024x1024&w=is&k=20&c=kMoj12eFVPV4bccVvFKUtpZG9Dv6h-hGuQkQxVSywYU=",
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
        id: "item8",
        menuCategoryId: "menu_cat_3",
        restaurantCategoryId: "resto_cat_3",
        name: "Jus de  pastèque frais",
        description: "JCocktail rouge de pastèque dans le verre",
        price: 3.0,
        imageUrl: "https://media.istockphoto.com/id/1172671275/fr/photo/cocktail-rouge-de-past%C3%A8que-dans-le-verre.jpg?s=1024x1024&w=is&k=20&c=QiK8CyELYlQSiP2oXFBt_kTeoZ8LlV-2HSJjlOEXzUM=",
        isAvailable: true
      },
      {
        id: "item9",
        menuCategoryId: "menu_cat_4",
        restaurantCategoryId: "resto_cat_4",
        name: "Glace a la menthe",
        imageUrl: "https://media.istockphoto.com/id/187332918/fr/photo/couleur-de-la-cr%C3%A8me-glac%C3%A9e.jpg?s=1024x1024&w=is&k=20&c=nav0XQVcvG9n1ItwtFOf2euvdtg-1gobeU8dFil0wiI=",
        description: "Couleur de la crème glacéer",
        price: 4.5,
        isAvailable: true
      },
    ]
  },

  


]
