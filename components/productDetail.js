import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import ImageSlider from "./imageSlider";

export default function ProductDetail({productID}) {

    const [product, setProduct] = useState({
        "id": 1,
        "name": "Sessel",
        "description": "Holzsessel aus Holz",
        "published": true,
        "price": 1799.99,
        "images": [
            "https://www.gizzwood.de/wp-content/uploads/2019/12/Tisch-Max-1-1024x683.jpg",
            "https://image.schoener-wohnen.de/12607432/t/s7/v7/w960/r1.5/-/sw-kollektion-extend-tisch-moebel-jpg--64243-.jpg",
            "https://image.jimcdn.com/app/cms/image/transf/none/path/s43d0339aefb6d29d/image/iff44e33ff43151a7/version/1575049939/m%C3%B6belloft-massive-tischplatte-aus-nussbaum-auf-wei%C3%9Fem-gestell.jpg"
        ]
    })

    const products = [
        {
            "id": 1,
            "name": "Sessel",
            "description": "Holzsessel aus Holz",
            "published": true,
            "price": 1799.99,
            "images": [
                "https://www.gizzwood.de/wp-content/uploads/2019/12/Tisch-Max-1-1024x683.jpg",
                "https://image.schoener-wohnen.de/12607432/t/s7/v7/w960/r1.5/-/sw-kollektion-extend-tisch-moebel-jpg--64243-.jpg",
                "https://image.jimcdn.com/app/cms/image/transf/none/path/s43d0339aefb6d29d/image/iff44e33ff43151a7/version/1575049939/m%C3%B6belloft-massive-tischplatte-aus-nussbaum-auf-wei%C3%9Fem-gestell.jpg"
            ]
        },
        {
            "id": 2,
            "name": "Tisch",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            "published": true,
            "price": 123,
            "images": [
                "https://www.gizzwood.de/wp-content/uploads/2019/12/Tisch-Max-1-1024x683.jpg",
                "https://image.schoener-wohnen.de/12607432/t/s7/v7/w960/r1.5/-/sw-kollektion-extend-tisch-moebel-jpg--64243-.jpg",
                "https://image.jimcdn.com/app/cms/image/transf/none/path/s43d0339aefb6d29d/image/iff44e33ff43151a7/version/1575049939/m%C3%B6belloft-massive-tischplatte-aus-nussbaum-auf-wei%C3%9Fem-gestell.jpg"
            ]
        },
        {
            "id": 3,
            "name": "Sessel",
            "description": "Holzsessel aus Holz sdfs",
            "published": true,
            "price": 10.0,
            "images": [
                "https://www.einrichten-design.at/media/c8/53/33/1599490339/Tische_Erlebniswelt001.jpg"
            ]
        },
        {
            "id": 4,
            "name": "Tisch",
            "description": "HolzTisch aus Holz",
            "published": true,
            "price": 123.0,
            "images": [
                "https://www.einrichten-design.at/media/db/99/97/1599490339/Tische_Erlebniswelt012.jpg"
            ]
        },
        {
            "id": 5,
            "name": "Sessel",
            "description": "Holzsessel aus Holz",
            "published": true,
            "price": 10.0,
            "images": [
                "https://www.dkmoebelschmiede.de/wp-content/uploads/2020/07/DKMoebelschmiede-KleinesLoft-2.jpg"
            ]
        },
        {
            "id": 6,
            "name": "Tisch",
            "description": "HolzTisch aus Holz",
            "published": true,
            "price": 123.0,
            "images": [
                "https://image.jimcdn.com/app/cms/image/transf/dimension=769x1024:format=jpg/path/s43d0339aefb6d29d/image/ic252faea632553eb/version/1575115670/konfigurierter-m%C3%B6belloft-esstisch-aus-eiche-wildeiche-und-stahl-mit-passenden-st%C3%BChlen-als-essgruppe.jpg"
            ]
        },
        {
            "id": 7,
            "name": "Sessel",
            "description": "Holzsessel aus Holz",
            "published": true,
            "price": 10.0,
            "images": [
                "https://www.gizzwood.de/wp-content/uploads/2019/12/Tisch-Max-1-1024x683.jpg"
            ]
        },
        {
            "id": 8,
            "name": "Tisch",
            "description": "HolzTisch aus Holz",
            "published": true,
            "price": 123.0,
            "images": [
                "https://image.jimcdn.com/app/cms/image/transf/dimension=769x1024:format=jpg/path/s43d0339aefb6d29d/image/ic252faea632553eb/version/1575115670/konfigurierter-m%C3%B6belloft-esstisch-aus-eiche-wildeiche-und-stahl-mit-passenden-st%C3%BChlen-als-essgruppe.jpg"
            ]
        },
        {
            "id": 9,
            "name": "Sessel",
            "description": "Holzsessel aus Holz",
            "published": true,
            "price": 10.0,
            "images": [
                "https://www.gizzwood.de/wp-content/uploads/2019/12/Tisch-Max-1-1024x683.jpg"
            ]
        },
        {
            "id": 10,
            "name": "Tisch",
            "description": "HolzTisch aus Holz",
            "published": true,
            "price": 123.0,
            "images": [
                "https://image.jimcdn.com/app/cms/image/transf/dimension=769x1024:format=jpg/path/s43d0339aefb6d29d/image/ic252faea632553eb/version/1575115670/konfigurierter-m%C3%B6belloft-esstisch-aus-eiche-wildeiche-und-stahl-mit-passenden-st%C3%BChlen-als-essgruppe.jpg"
            ]
        },

    ]

    useEffect(() => {
        setProduct(products[productID - 1]);
    }, []);

    return <div className="productDetailBox">
        <div className="productDetailImages">
            <ImageSlider images={product.images} className="productDetailImages"/>
        </div>
        <div className="productDetailContent">
            <h1 className="productDetailHeader">{product.name}</h1>
            <p className="productDetailDescription">{product.description}</p>
        </div>

        <div className="d-flex justify-content-between productDetailBottomBox">
            <Container className="productDetailBottomContainer ps-4">
                <h1 className="productDetailBottomPrice m-0">{product.price.toFixed(2)} €</h1>
                <Button variant={"outline-dark"} className="productDetailBottomButton">in den Warenkorb</Button>
            </Container>
        </div>
    </div>
}