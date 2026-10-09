import { doc, writeBatch } from 'firebase/firestore';
import { products } from '../features/products/data/products';
import { stores } from '../features/stores/data/stores';
import { db } from './firebase';

export async function seedDatabase() {
    const batch = writeBatch(db);

    stores.forEach((store) => {
        batch.set(doc(db, 'stores', store.id), store);
    });

    products.forEach(({ image, ...product }) => {
        batch.set(doc(db, 'products', product.id), {
            ...product,
            imageKey: product.category.toLowerCase().replace(' ', '-'),
        });
    });

    await batch.commit();
}