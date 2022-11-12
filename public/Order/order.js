// 
// Orders fetching
// 
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:2100/orders')
    .then(data=>{
        // console.log(data);
        if(data.status===200){
            const orders=data.data.orders;
            const orderWrap=document.querySelector('.wrap-orders');                        
                orders.forEach(orderE=>{
                    // console.log(productE);
                    const heading=`<h2>Order No:- ${orderE.id}  </h2>
                    <div  class="each-order">`;
                    orderWrap.innerHTML += heading;
                    const productsIn=orderE.products;
                    productsIn.forEach(product=>{
                        const innerFormate=`                                         
                                        <div class=each-product>
                                        <div class="image"><img src="${product.imageUrl}" alt="${product.title}"></div>
                                        <div>
                                            <span class="span">
                                                $
                                                <span class="ammount">${product.price}</span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>`

                                    orderWrap.innerHTML += innerFormate;
                    });                 
 
                });
        }else{
          
                throw new Error(data.data.message);
            
        }
         
    })
    .catch(err=>{
        notification(err)
    });
});

const carter=document.querySelector('.cart-items');
function notification(message){
    const notify=document.createElement('div');
    notify.classList.add('toast');        
    notify.innerHTML=message;
    container.appendChild(notify);
    setTimeout(()=>{notify.remove()},2000)
}