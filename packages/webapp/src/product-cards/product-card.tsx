import { CloseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import "./product-card.css";
import { Link } from "react-router-dom";
import { useDeleteProductsMutation } from '../services/api';

const { Meta } = Card;
const ProductCard: React.FC = (props: any) => {
    const [deleteProduct] = useDeleteProductsMutation();
    const confirmDelete = () => {
        if(confirm(`Are you sure you want to delete ${props.item.title}?`)) {
            //Logic to delete the item
            deleteProduct([props.item.id])
                .then(() => props.updateProducts())
        }
    }
    return (
        <div className="card-container">
            <Card
                cover={
                    <img
                        alt="example"
                        src={props.item.thumbnail}
                    />
                }
                actions={[
                    <Link to={`/details/${props.item.id}`}><EyeOutlined key="setting" /></Link>,
                    <Link to={`/edit/${props.item.id}`}><EditOutlined key="edit" /></Link>,
                    <CloseOutlined key="ellipsis" onClick={confirmDelete} />,
                ]}
            >
                <Meta

                    title={props.item.title}
                    description={`$${props.item.price}`}
                />
            </Card>
        </div>
    )
}

export default ProductCard;