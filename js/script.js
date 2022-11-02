  const x = document.querySelectorAll(".trendproductimg");
    x.forEach((trendproductimg) =>{

     trendproductimg.addEventListener("click",()=>{
          removeAnimationClass();
         trendproductimg.classList.add("trendactive")
        })

    }) 


function removeAnimationClass()
{
    x.forEach((trendproductimg) =>{

        trendproductimg.classList.remove("trendactive");

    })
}
function FetchData()
{
    var div = document.getElementById("productlist")
    var div2 = document.getElementById("swiper-list")
    let write = "";
    let write2 = "";
    fetch("Data.json")
    .then((response) => response.json())
    .then((Data) => {
      for(var item of Data.products)
     {
        write += ` 
        <div class="new-product-item">
        <img src="${item.thumbnail}">
        <p>${item.title}</p>
        <p><i class="fas fa-star"></i> <span style="color:gray;">(${item.rating})</span></p>
        <p>${item.price} $</p>
        <div class="new-product-item-bottom">
        <button type="button" onclick="AddBasket('${item.id}','${item.price}','${item.title}','${1}','${item.thumbnail}')" class="add-basket">Sepete ekle</button>
        <button type="button" class="add-favorite"><i class="fal fa-heart"></i></button>    
        </div>
        </div>`;
        write2 += ` 
        <div class="swiper-slide">
        <div class="new-product-item">
        <img src="${item.thumbnail}">
        <p>${item.title}</p>
        <p><i class="fas fa-star"></i> <span style="color:gray;">(${item.rating})</span></p>
        <p>${item.price} $</p>
        <div class="new-product-item-bottom">
        <button type="button" onclick="AddBasket('${item.id}','${item.price}','${item.title}','${1}','${item.thumbnail}')" class="add-basket">Sepete ekle</button>
        <button type="button" class="add-favorite"><i class="fal fa-heart"></i></button>    
        </div>
        </div>
        </div>`;
     }
     div.innerHTML = write;
     div2.innerHTML = write2;     
    })
}


cart = [];  
 $(function () {

    FetchData();

    if (localStorage.cart)
    {


        cart = JSON.parse(localStorage.cart);  
        showCart(); 

    }

    var totalprice =document.getElementById("totalprice")
    var total = 0;
    for(var p of cart)
    {
       total += parseInt(p.Price);       
       
    }
    totalprice.textContent = total;

    
});

function AddBasket(Id,price,name,qty,img) {

    

    var price = price; 
    var name = name;
    var qty = qty;
    var ProductID = Id;
    var Productimg = img;

    for (var i in cart) {
        if(cart[i].Product == name)
        {
            cart[i].Qty = qty;  
            showCart();
            saveCart();
            return;
        }
    }

    var item = {Id:ProductID, Product: name,  Price: price, Qty: qty,İmg:Productimg };
    cart.push(item);
    saveCart();
    showCart();
    BasketPopup();
}
function saveCart() {
    if (window.localStorage)
    {
        localStorage.cart = JSON.stringify(cart);
    }
}

function showCart() {
    if (cart.length == 0) {
        $("#sepet").css("visibility", "hidden"); 
        $("#noitem").css("visibility", "visible"); 
        $("#noitem").css("display", "block"); 


        return;
    }

    $("#sepet").css("visibility", "visible");
    $("#noitem").css("visibility", "hidden"); 
    $("#noitem").css("display", "none"); 


    $("#sepetbody").empty();  
    for (var i in cart) {
        var item = cart[i];
        var row = 
 `
  <tr>
    <td><img src="${item.İmg}" width="100" height="100"></td>
    <td>${item.Product}</td>
    <td><input type="number" value="${item.Qty}"></td>
    <td>${item.Price} $</td>
    <td><button type="button" onclick='deleteItem("${i}")' class="basket-delete"><i class="fal fa-times"></i></button></td>
  </tr>`;




        $("#sepetbody").append(row);
    }

    const count = document.getElementById('basketcount');

    count.textContent = '';

    var itemcount = Object.keys(JSON.parse(localStorage.getItem('cart'))).length
    $("#basketcount").append(itemcount);

}
function deleteItem(i)
{
    if (localStorage.cart)
    {
        cart.splice(i,1)
        saveCart();
        location.reload();
    }
}
function Usercontrol()
{
    if(localStorage.user == null)
    {
        alert('Lütfen giriş yapınız')
    }
}
function BasketPopup() {
    var x = document.getElementById("popup");
    x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

/*function ShowSepet()
{
    var x1 = document.getElementById("x1");
    var x2 = document.getElementById("x2");
    var x3 = document.getElementById("x3");
    var x4 = document.getElementById("x4");
    var x5 = document.getElementById("x5");
    var sepet = document.getElementById("sepet");

    x1.style.display = "none"
    x2.style.display = "none"
    x3.style.display = "none"
    x4.style.display = "none"
    x5.style.display = "none"
    sepet.style.display = "block";
}*/