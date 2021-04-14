import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {logout} from "./api/data.js";
import {registerPage} from "./views/register.js";
import {catalogPage} from "./views/catalog.js";
import {createPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {detailsPage} from "./views/details.js";
import {dashboardPage} from "./views/dashboard.js";
import {searchPage} from "./views/search.js";

const main = document.getElementById('site-content');

document.getElementById('logout-button').addEventListener('click', async () => {
    await logout();
    page.redirect('/');
    setUserNav();
});

page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/details/:id', decorateContext, detailsPage);
page('/dashboard', decorateContext, dashboardPage);
page('/search', decorateContext, searchPage);

setUserNav();

page.start();

function setUserNav() {
    const username = sessionStorage.getItem('username');

    if (username !== null) {
        document.getElementById('welcome-msg').textContent = `Welcome ${username}`;
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = '';
    } else {
        document.getElementById('guest').style.display = '';
        document.getElementById('profile').style.display = 'none';
    }
}

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}