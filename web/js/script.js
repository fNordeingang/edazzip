/*---Inhalte erstellen---*/
fetch("./menu.json")
    .then((res) => res.json())
    .then((data) => {
        var pizza = document.getElementsByClassName("category-pizza")[0];

        for (let i = 0; i < data.product.pizza.length; i++) {
            var piz = data.product.pizza[i];
            var prod = document.createElement("div");
            prod.className = 'pizza-product';
            prod.id=("pizza "+piz.name+" "+piz.id).toLowerCase();
            pizza.appendChild(prod);

            var name = document.createElement("p");
            name.className="pizza-product-name";
            name.innerHTML=(piz.name+isVeg(piz.veg));
            prod.appendChild(name);

            var price = document.createElement("table");
            price.className = "pizza-product-price";
            
            var head = document.createElement("tr");
            head.className = "pizza-product-price-header";
            price.appendChild(head);

            var size = document.createElement("tr");
            size.className = "pizza-product-price-size";
            price.appendChild(size);

            var tag = document.createElement("tr");
            tag.className = "pizza-product-price-tag";
            price.appendChild(tag);
            
            for (let j = 0; j < piz.price.length; j++) {
                var head_ = document.createElement("td");
                head_.innerHTML = piz.price[j].name;
                head.appendChild(head_);

                var size_ = document.createElement("td");
                size_.innerHTML = piz.price[j].size;
                size.appendChild(size_);

                var tag_ = document.createElement("td");
                tag_.innerHTML = piz.price[j].price+"€";
                tag.appendChild(tag_);
            }

            prod.appendChild(price);

            var info = document.createElement("p");
            info.className = "pizza-product-info";
            info.innerHTML = piz.description;
            prod.appendChild(info);

            var info_btn = document.createElement("button");
            info_btn.className = "pizza-product-info-button";
            info_btn.setAttribute("onclick", "popupinfo(this)");
            info_btn.innerHTML = "i";
            prod.appendChild(info_btn);

            var add_btn = document.createElement("button");
            add_btn.className = "pizza-product-add-button";
            add_btn.setAttribute("onclick","popupadd(this)");
            add_btn.innerHTML = "Hinzufügen";
            prod.appendChild(add_btn);

            var info_popup = document.createElement("div");
            info_popup.className = "pizza-product-info-popup";
            
            var info_popup_close = document.createElement("button");
            info_popup_close.className = "pizza-product-info-close-button";
            info_popup_close.setAttribute("onclick","closeinfo(this)");
            info_popup_close.innerHTML = "X";
            info_popup.appendChild(info_popup_close);

            var info_popup_add_head = document.createElement("p");
            info_popup_add_head.className = "pizza-product-info-popup-header";
            info_popup_add_head.innerHTML = "Zusatzstoffe";
            info_popup.appendChild(info_popup_add_head);

            var info_popup_add_text = document.createElement("p");
            info_popup_add_text.className = "pizza-product-info-popup-text";
            info_popup_add_text.innerHTML = additives(piz.additives, data);
            info_popup.appendChild(info_popup_add_text);

            var info_popup_alg_head = document.createElement("p");
            info_popup_alg_head.className = "pizza-product-info-popup-header";
            info_popup_alg_head.innerHTML = "Allergene";
            info_popup.appendChild(info_popup_alg_head);

            var info_popup_alg_text = document.createElement("p");
            info_popup_alg_text.className = "pizza-product-info-popup-text";
            info_popup_alg_text.innerHTML = allergens(piz.allergens, data);
            if(!piz.veg){
                info_popup_alg_text.innerHTML += meat(piz.meat, data);
            }
            info_popup.appendChild(info_popup_alg_text);
            prod.appendChild(info_popup);

            //TODO add this \/
            /*
            
            <div class="pizza-product-add-popup">
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
            
        }
});

function isVeg(veg){
    if (veg) {
        return " 🌿";
    }else{
        return "";
    }
}

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


