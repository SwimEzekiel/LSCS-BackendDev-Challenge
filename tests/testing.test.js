import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Products API', () => {

    test('POST /api/products - creates a Macky Pin product', async () => {
        const newProduct = {
            productName: "Macky Pin",
            price: 50,
            stock: 10,
            size: "Medium",
            weight: 0.01,
            category: "Accessories",
            description: "A cute pin with Macky in it!"
        };

        const response = await request(app)
            .post('/api/products')
            .send(newProduct);

        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.productName).toBe("Macky Pin");
        expect(response.body.price).toBe(50);
        expect(response.body.stock).toBe(10);
    });


    test('GET /api/products - returns all available products', async () => {
        const response = await request(app)
            .get('/api/products');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });


    test('PUT /api/products/:id - updates Macky TShirt price and stock', async () => {
        const newProduct = {
            productName: "Macky TShirt",
            price: 750,
            stock: 23,
            size: "Large",
            weight: 1,
            category: "Clothing",
            description: "Aesthetic TShirt with a print of our favorite Macky!"
        };

        const created = await request(app)
            .post('/api/products')
            .send(newProduct);
        const productId = created.body.id;

        const response = await request(app)
            .put(`/api/products/${productId}`)
            .send({
                price: 700,
                stock: 20
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(productId);
        expect(response.body.price).toBe(700);
        expect(response.body.stock).toBe(20);
    });

});