import {html} from '../../node_modules/lit-html/lit-html.js';
import {createData} from "../api/data.js";

const createTemplate = (onSubmit) => html`
    <section id="create-listing">
        <div class="container">
            <form @submit="${onSubmit}" id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const brand = formData.get('brand');
        const model = formData.get('model');
        const price = formData.get('price');
        const year = formData.get('year');
        const imageUrl = formData.get('imageUrl');
        const description = formData.get('description');

        const car = { brand, model, description, year, imageUrl, price };

        for (const carKey in car) {
            if (car[carKey] === '') {
                return alert('All fields are required!');
            }
        }

        car.price = Number(car.price);
        car.year = Number(car.year);

        if (car.price <= 0 || car.year <= 0) {
            return alert('Price and year must be positive numbers.');
        }

        await createData(car);
        ctx.page.redirect('/catalog');
    }
}