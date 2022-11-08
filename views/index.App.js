app.post('/addproducts',(req,res)=>{


    const { title,imageUrl, price, description } = req.body;    
    
        Product.create({
          title,
          imageUrl,
          price,
          description
        
        })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.json(err);
          });  
        
    
    });