// src/utils/seedDatabase.js
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc,
  writeBatch 
} from 'firebase/firestore';
import {
  users,
  restaurants,
  menus,
  deliveryPartners,
  orders,
  notifications
} from '../data/seedData';

export const seedDatabase = async (db:any) => {
  try {
    const batch = writeBatch(db);

    // Seed Users
    for (const user of users) {
      const userRef = doc(db, 'users', user.id);
      batch.set(userRef, user);
    }

    // Seed Restaurants
    for (const restaurant of restaurants) {
      const restaurantRef = doc(db, 'restaurants', restaurant.id);
      batch.set(restaurantRef, restaurant);
    }

    // Seed Menus
    for (const [restaurantId, menuData] of Object.entries(menus)) {
      const menuRef = doc(db, 'menus', restaurantId);
      batch.set(menuRef, menuData);
    }

    // Seed Delivery Partners
    for (const partner of deliveryPartners) {
      const partnerRef = doc(db, 'deliveryPartners', partner.id);
      batch.set(partnerRef, partner);
    }

    // Seed Orders
    for (const order of orders) {
      const orderRef = doc(db, 'orders', order.id);
      batch.set(orderRef, order);
    }

    // Seed Notifications
    for (const notification of notifications) {
      const notificationRef = doc(db, 'notifications', notification.id);
      batch.set(notificationRef, notification);
    }

    await batch.commit();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};