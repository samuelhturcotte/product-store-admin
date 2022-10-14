import "./edit-store.css";
import { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
} from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { useListSingleProductMutation, useUpsertProductsMutation } from "../services/api";


const { TextArea } = Input;


const EditDetails = () => {
    const [product] = useListSingleProductMutation();
    const [upsertProducts] = useUpsertProductsMutation();
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState<any>([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        product({ id: Number(params.id) })
            .unwrap()
            .then(
                ({ data }: any) => {
                    setIsLoaded(true);
                    setItem(data);
                },
                (error: any) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const onFinish = (values: any) => {
        upsertProducts([values])
            .unwrap()
            .then(({ data }) => {
                const [newItem]: any = data;
                navigate(`/details/${newItem.id}`)
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    }; 
    if (isLoaded) {
        return (
            <div className="description-container">

                <div className="picture-container">
                    <div className="description-picture" >
                        <img src={item.thumbnail} />
                    </div>
                </div>

            <div className="section-container" >
                <Form
                    layout="vertical"
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        id: params.id,
                        title: item.title,
                        price: item.price,
                        thumbnail: item.thumbnail,
                        brand: item.brand,
                        category: item.category,
                        stock: item.stock,
                        description: item.description
                    }}
                >
                    <Form.Item  label="id" name="id" hidden>
                        <Input name="id"/>
                    </Form.Item>

                    <Form.Item className="bold-title"  label="Title" name="title">
                        <Input name="title" />
                    </Form.Item>
                    
                    <Form.Item className="bold-title" label="Main Picture" name="thumbnail">
                        <Input name="thumbnail" />
                    </Form.Item>
                
                    <Form.Item className="bold-title" label="Brand" name="brand">
                        <Input name="brand" />
                    </Form.Item>
                
                    <Form.Item className="bold-title" label="Category" name="category">
                        <Input name="category" />
                    </Form.Item>

                    <Form.Item className="bold-title" label="In Stock" name="stock">
                        <Input name="stock" />
                    </Form.Item>

                    <Form.Item className="bold-title" label="Description" name="description">
                        <TextArea rows={4} name="description" />
                    </Form.Item>

                    <Form.Item className="bold-title" label="Price" name="price">
                        <Input name="price" />
                    </Form.Item>

                    <div className="save-button-container">
                        <Button className="save-button" htmlType="submit">Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    )} else {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    }
};

export default () => <EditDetails />;
