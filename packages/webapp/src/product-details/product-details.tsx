import "./product-details.css";
import { Button, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { useListSingleProductMutation } from "../services/api";
import { Link, useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
    const [product] = useListSingleProductMutation();
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState<any>([]);
    const params = useParams();
    
    useEffect(() => {
        product({ id: Number(params.id)})
            .unwrap()
            .then(
                ({ data }) => {
                    setIsLoaded(true);
                    setItem(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
       
       
        <div className="description-container">

           
            
            <div className="picture-container">
                <Image className="description-picture"
                    src={item.thumbnail}
                />
                
            </div>

           
            

           
            <div className="section-container" >

                
               
                <div className="mini-section-container">
                    
                   
                    <h2 className="title-description">{item.title}</h2>
                   
                    
                    
                </div>
                
                <Descriptions className="description-list">
                    <Descriptions.Item className="description-item"><span className="bold-title">Brand: </span>{item.brand}</Descriptions.Item>
                    <Descriptions.Item className="description-item"><span className="bold-title">Category: </span>{item.category}</Descriptions.Item>
                    <Descriptions.Item className="description-item" ><span className="bold-title">In Stock: </span> {item.stock}</Descriptions.Item>
                    <Descriptions.Item className="description-item"><span className="bold-title">Description: </span>{item.description}</Descriptions.Item>
                </Descriptions>


                <div className="description-price" >
                 <p className="bold-red"><span className="bold-title">Price:</span>${item.price}</p>
                 
                </div>


       
                    <Link className="edit-button" to={`/edit/${params.id}`}><Button>Edit</Button></Link>
            


                
               
            </div>
       
          
           
        </div>
        
    )
  
};

export default ProductDetails;





