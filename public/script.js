


function homeProducts(){
    let idBtn='?page=0';
    axios.get(`http://localhost:2100/products${idBtn}`)
    .then((data)=>{   
        console.log(data.data);     
        displayProducts(data.data.result)        
    })
    .catch(err=>{console.log(err)});
}
homeProducts();
//


// <<<<<<<<<<<<<   Domloaded  >>>>>>>>>>>>>
// 
window.addEventListener('DOMContentLoaded',()=>{
    // // const objurl=new URLSearchParams(window.location.search);
    // // page = objurl.get('page') || 1;
    // const page= 1;
    // axios.get(`http://localhost:2100/products?page=${page}`)
    // .then((data)=>{   
    //     // console.log(data);     
    //     if(data.request.status===200){
    //         displayProducts(data.data.product);
    //         // showPagination(data.data);
    //     }      
   
    // })
    // .catch(err=>{console.log(err)});


// 
// All cart items fetching to cart list
// 
    axios.get('http://localhost:2100/cart')
    .then((data)=>{
        // console.log(data);
        if(data.request.status===200){
            const cartwrap=document.querySelector('.cart-items');
            const cartNo=document.querySelector('.cart-no');
            let totalAmmount=document.getElementById('total-value');
            const cartData=data.data.products;  
            let totalPrice=0.00;
            let quantityNo=0;  
            // console.log(cartData);
            cartData.forEach(productE=>{                 
                const productDetails=` <div class='cart-row' id="in-cart-${productE.id}"><span class=" cart-item cart-colomn"><img src="${productE.imageUrl}"> ${productE.title}</span>
                <span class=" cart-price cart-colomn">${productE.price}</span>
                <span class=" cart-qunatity cart-colomn"><input type="text" value="${productE.cartItem.quantity}"> <button  onClick="removeCartItem(${productE.id})" class="cartItm-removeBtn">Remove</button></span></div>`;
                
                cartwrap.innerHTML += productDetails;
                quantityNo=quantityNo+productE.cartItem.quantity;
                
                totalPrice = parseFloat(parseFloat(totalPrice)+productE.price*productE.cartItem.quantity).toFixed(2);
                // console.log( typeof productE.price);      

            })
            totalAmmount.innerText=totalPrice; 
            cartNo.innerText=quantityNo;                
        }         
    })
    .catch(err=>console.log(err));
});



// <<<<<<<<<<<<<<<<<      Fetching products and display in frontend     >>>>>>>>>>>>
// 
function displayProducts(productData){
    let productwrap=document.querySelector('.wrap-products'); 
    let innerFormate=`<div></div>`;
//     console.log(productData);                       
            productData.forEach(productE=>{                
                   innerFormate += ` <div id="${productE.id}" class="each-product">
                                    <h3>${productE.title}</h3>
                                    <div class="image"><img src="${productE.imageUrl}" alt="${productE.title}"></div>
                                    <div>
                                        <span class="span">
                                            $
                                            <span class="ammount">${productE.price}</span>
                                        </span>
                                        <button onClick="addCart(${productE.id})" id="product-${productE.id}" class="addCrt-btn">Add to cart</button>
                                    </div>
                                </div>`
                               
                                productwrap.innerHTML = innerFormate;
                
            });           

}
// >>>>>>>>>>>>>>>>>>>>>>>>     End of display product      <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// 
// Pagination function
// 
const pag=document.querySelector('.pagination');
function getButtons(){
    axios.get('http://localhost:2100/getAllProduct')
    .then(result=>{
        let prodts_perpage = 2;
        let c=0,cc=1;      
        if(result.data.result.length%2==0){
            let j = Math.trunc((result.data.result.length / prodts_perpage));            

            for (let i = 0; i < j; i++) {
                pag.innerHTML += `<button class="allbtns" id="?page=${c++}">${cc++}</button> `;
            }
        }else{
            let j = Math.trunc((result.data.result.length / prodts_perpage)+1);                

            for (let i = 0; i < j; i++) {
                pag.innerHTML += `<button class="allbtns" id="?page=${c++}">${cc++}</button> `;
            }
        }
    })
    .catch(err=>console.log(err))
}
getButtons();


pag.addEventListener('click',(e)=>{
    let idBtn=e.target.id;
    axios.get(`http://localhost:2100/products${idBtn}`)
    .then((data)=>{   
        console.log(data.data.result);     
        displayProducts(data.data.result)      
   
    })
    .catch(err=>{console.log(err)});
});

// const pagination=document.querySelector('.pagination');
// function showPagination({
//     currentPage,
//     hasNextPage,
//     hasPreviousPage,
//     lastPage,
//     nextPage,
//     previousPage,
// }){
//     pagination.innerHTML='';
//     if(hasPreviousPage){
//         const btn2=document.createElement('button');
//         btn2.innerHTML=previousPage;
//         btn2.addEventListener('click',()=>getProducts(previousPage));
//         pagination.appendChild(btn2)
//     }
//     const btn1=document.createElement('button');
//     btn1.innerHTML=`<h3>${currentPage}</h3>`;
//     btn1.addEventListener('click',()=>getProducts(currentPage));
//     btn1.style.margin='10px';
//     pagination.appendChild(btn1);
//     if(hasNextPage){
//         const btn3=document.createElement('button');
//         btn3.innerHTML=nextPage;
//         btn3.addEventListener('click',()=>getProducts(nextPage));
//         pagination.appendChild(btn3);
//     }
// }

// function getProducts(page){
   
//     axios.get(`http://localhost:2100/products?page=${page}`)
//     .then((data)=>{   
//         console.log(data);     
//         if(data.request.status===200){
//             displayProducts(data.data.product);
//             // showPagination(data.data);
//         }      
   
//     })
//     .catch(err=>{console.log(err)});
// }


// 
// cart Button work
// 
const popCart=document.querySelectorAll('.popCartBtn');
const popUpCart=document.querySelector('.popUp-cart');
const closePop=document.querySelector('.close');


function addCart(productId){
    axios.post('http://localhost:2100/cart',{productId:productId})
    .then(response=>{
        // console.log(response);
        if(response.status===200){
           notification(response.data.message);
        }else{
            throw new Error(response.data.message);
        }
        
    })
    .catch((errMsg)=>{
        notification(errMsg);
    });
};

// 
// short Notification for cart
// 
const carter=document.querySelector('.cart-items');
function notification(message){
    const notify=document.createElement('div');
    notify.classList.add('toast');        
    notify.innerHTML=message;
    container.appendChild(notify);
    setTimeout(()=>{notify.remove()},2000)
}



// 
// open cart pop up function
// 
popCart.forEach(function(cartBtn){
    cartBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        popUpCart.style.display='block';
       
});
});


// 
// close cart pop up function
// 
closePop.addEventListener('click',(e)=>{
    e.preventDefault();
    popUpCart.style.display='none';
});




// 
// Add to cart button
// 

// console.log(carter);
// const mainDiv=document.getElementById('main-Container');
// mainDiv.addEventListener('click',(e)=>{ 


// //    
// // cart item removed function
// // 
//    if(e.target.className=='cartItm-removeBtn'){
function removeCartItem(productId){
    axios.post('http://localhost:2100/cart-delete-item',{productId:productId})
    .then((response)=>{
        // console.log(response);
        if(response.status===200){
        notification(response.data.message);
        }else{
            throw new Error(response.data.message);
        }
    })
    .catch(errMsg=>{
        notification(errMsg)
    })   

};


// 
// 
// 
const paymentBtn=document.querySelector('.payment-btn');
paymentBtn.addEventListener('click',()=>{
    axios.post('http://localhost:2100/create-order')
    .then(data=>{
        if(data.status===200){
            notification("Succefully ordered")
        }
        else{
            throw new Error(data.data.message)
        }
        // console.log(data);
    })
    .catch(err=>{
        notification(err)
    })
})