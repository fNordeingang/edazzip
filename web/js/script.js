document.addEventListener('DOMContentLoaded', () => {
    function isVeg(veg) {
        return veg ? ' 🌱' : '';
    }

    /*function formatList(ids, data, type) {
        if (!ids || ids.length === 0) {
            return 'Keine';  // wnn die Liste leer ist
        }

        const lookup = data[type];
        return ids.map(id => lookup[id]).join(', ');
            }*/
    
    function additives(add, data){
        var erg = "Dieses Produkt enthält ";
        for (let j = 0; j < add.length; j++) {
            erg = erg+data.additives[add[j]];
            if (j == add.length-1) {
                erg = erg+".";
            }else if(j == add.length-2) {
                erg = erg+" und ";
            }else if(j < add.length-2) {
                erg = erg+", ";
            }
        } 
        return erg;
    }

    function allergens(alg, data){
        var erg = "Dieses Produkt enthält ";
        for (let j = 0; j < alg.length; j++) {
            erg = erg+data.allergens[alg[j]];
            if (j == alg.length-1) {
                erg = erg+".";
            }else if(j == alg.length-2) {
                erg = erg+" und ";
            }else if(j < alg.length-2) {
                erg = erg+", ";
            }
        } 
        return erg;
    }
    
    function meat(met, data){
        var erg = " Dieses Produkt enthält ";
        for (let j = 0; j < met.length; j++) {
            erg = erg+data.meat[met[j]];
            if (j == met.length-1) {
                erg = erg+".";
            }else if(j == met.length-2) {
                erg = erg+" und ";
            }else if(j < met.length-2) {
                erg = erg+", ";
            }
        } 
        return erg;
    }

    fetch("./menu.json")
    .then(res => res.json())
    .then(data => {
        const pizzaContainer = document.querySelector(".category-pizza");
        const fragment = document.createDocumentFragment();

        data.product.pizza.forEach(piz => {
            const prod = document.createElement('div');
            prod.className = 'pizza-product';
            prod.id = `pizza-${piz.name.toLowerCase()}`;
            prod.innerHTML = `
            <p class="pizza-product-name">${piz.name}${isVeg(piz.veg)}</p>
            <table class="pizza-product-price">
                <tr class="pizza-product-price-header">${piz.price.map((p, index) => `
                    <td>
                        ${p.name}
                    </td>
                `).join('')}</tr>
                <tr class="pizza-product-price-size">${piz.price.map(p => `<td>${p.size}</td>`).join('')}</tr>
                <tr class="pizza-product-price-tag">${piz.price.map(p => `<td>${p.price}€</td>`).join('')}</tr>
            </table>
            <p class="pizza-product-info">${piz.description}</p>
            <button class="pizza-product-info-button">i</button>
            <button class="pizza-product-add-button">Hinzufügen</button>
            <div class="pizza-product-info-popup" style="visibility:hidden;">
                <button class="pizza-product-info-close-button">X</button>
                <p class="pizza-product-info-popup-header">Zusatzstoffe</p>
                <p class="pizza-product-info-popup-text">${additives(piz.additives, data)}</p>
                <p class="pizza-product-info-popup-header">Allergene</p>
                <p class="pizza-product-info-popup-text">${allergens(piz.allergens, data)} ${piz.veg ? '' : meat(piz.meat, data)}</p>
            </div>
            <div class="pizza-product-add-popup">
                <button class="pizza-product-add-close-button">X</button>
                <label for="pizza-size" classe="pizza-product-add-size-label">Größe</label>
                <select name="pizza-product-add-popup-size" class="pizza-product-add-size" id="pizza-size">
                    <option value="normal">Normal</option>
                    <option value="jumbo">Jumbo</option>
                    <option value="family">Family</option>
                </select>
                <label for="pizza-garlic" class="pizza-product-add-garlic-label">Knoblauch</label>
                <input type="checkbox" class="pizza-product-add-popup-garlic" id="pizza-garlic">
                <label for="pizza-spicy" class="pizza-product-add-spicy-label">Scharf</label>
                <input type="checkbox" class="pizza-product-add-popup-spicy" id="pizza-spicy">

                <button class="pizza-product-add">In den Einkaufswagen</button>
            </div>
            `;
            fragment.appendChild(prod);
        });
            
        pizzaContainer.appendChild(fragment);

        /*// Event listener um ein Produkt hinzuzufügen
        document.querySelectorAll('.pizza-product-add-button').forEach(button => {
            button.addEventListener('click', event => {
                const product = event.target.closest('.pizza-product');
                const selectedPrice = product.querySelector('input[name^="price-"]:checked');

                if (selectedPrice) {
                    // Hintergrundfarbe aller priceSections resetten
                    product.querySelectorAll('.pizza-product-price td').forEach(td => {
                        td.style.backgroundColor = ''; // Reset to default
                    });

                    // Hintergrundfarbe zur gewählten priceSection hinzufügen
                    const priceSection = selectedPrice.closest('td');
                    priceSection.style.backgroundColor = '#FFA500'; // andereFarbe evt? :D

                    // *** AUSWAHL IN COOKIE SPEICHERN ***
                    const pizzaId = product.id;
                    const selectedValue = selectedPrice.value;
                    document.cookie = `${pizzaId}=${selectedValue}; path=/`;
                } else {
                    alert('Bitte wählen Sie eine Größe.');
            }
            });
        });

        // event listener um eine Produktauswahl wieder zu löschen
        document.querySelectorAll('.pizza-product-delete-button').forEach(button => {
            button.addEventListener('click', event => {
                const product = event.target.closest('.pizza-product');
                const pizzaId = product.id;
            
                // radio button zurücksetzen
                const selectedPrice = product.querySelector('input[name^="price-"]:checked');
                if (selectedPrice) {
                    selectedPrice.checked = false;
        }

                // Hintergrundfarbe aller priceSections resetten
                product.querySelectorAll('.pizza-product-price td').forEach(td => {
                    td.style.backgroundColor = ''; // Reset to default
});

                // *** COOKIE LÖSCHEN, wegen Änderung der Auswahl
                // TODO Nur Teile des Cookies ändern
                document.cookie = `${pizzaId}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

                alert('Ihre Auswahl wurde gelöscht.');
            });
        });*/

        // event listener für das Info popup
        document.querySelectorAll('.pizza-product-info-button').forEach(button => {
            button.addEventListener('click', event => {
                const product = event.target.closest('.pizza-product');
                const popup = product.querySelector('.pizza-product-info-popup');
                popup.style.visibility = 'visible';
            });
        });

        // event listenetr um das Info Popup wieder zu schliessen
        document.querySelectorAll('.pizza-product-info-close-button').forEach(button => {
            button.addEventListener('click', event => {
                const popup = event.target.closest('.pizza-product-info-popup');
                popup.style.visibility = 'hidden';
            });
        });

        //event listener für das Add Popup
        document.querySelectorAll('.pizza-product-add-button').forEach(button => {
            button.addEventListener('click', event => {
                const product = event.target.closest('.pizza-product');
                const popup = product.querySelector('.pizza-product-add-popup');
                popup.style.visibility = 'visible';
            });
        });

        document.querySelectorAll('.pizza-product-add-close-button').forEach(button => {
            button.addEventListener('click', event => {
                const popup = event.target.closest('.pizza-product-add-popup');
                popup.style.visibility = 'hidden';
            });
        });
        /*<div class="pizza-product-add-popup">
                <p>Größe</p>
                <select name="pizza-product-add-popup-size" id="pizza-size">
                    <option value="normal">Normal</option>
                    <option value="jumbo">Jumbo</option>
                    <option value="family">Family</option>
                </select>
                <p>Knoblauch</p>
                <input type="checkbox" class="pizza-product-add-popup-garlic" id="pizza-garlic">
                <p>Scharf</p>
                <input type="checkbox" class="pizza-product-add-popup-spicy" id="pizza-spicy">

                <button>In den Einkaufswagen</button>
            </div>
            
            */



        /*// event listener für die radio buttons um die Farbe bei Auswahlwechsel zurückzusetzen
        document.querySelectorAll('input[name^="price-"]').forEach(radio => {
            radio.addEventListener('change', event => {
                const product = event.target.closest('.pizza-product');
                product.querySelectorAll('.pizza-product-price td').forEach(td => {
                    td.style.backgroundColor = ''; // Setze ALL DIE FARBEN zurück :)
                });
                const selectedPriceSection = event.target.closest('td');
                selectedPriceSection.style.backgroundColor = '#FFA500'; // gewählte Option hervorheben
            });
        });*/
    });
});
// TODO: Sonderzutaten einbinden: Knoblauch, Schaaf, Orgigami ;)
// TODO: Anzahl der gewählten Produkte ermöglichen, Ändern erlauben
// TODO: Cookie zum Ausdruck der Bestellung auswerten
// TODO: Sidebar erstellen
// TODO: so, jetzt Schlaf, ja <müde-Smiley>
