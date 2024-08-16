/*---Popups---*/

function closeinfo(event) {
    event.target.closest('.pizza-product-info-popup').style.visibility = 'hidden';
}

function popupinfo(event) {
    const popup = event.target.closest('.pizza-product').querySelector('.pizza-product-info-popup');
    popup.style.visibility = 'visible';
    popup.style.zIndex = 1000;
}
