import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
/* import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form'; */
import { Loading } from './LoadingComponent';
import CommentForm from "./CommentFormComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
            </div>   
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments, postComment, dishId}){
    if (comments == null) {
        return (<div></div>)
    }
    const cmnts = comments.map(comment => {
        return (

            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                &nbsp;
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(comment.date))}
                </p>
            </li>

        )
    })
    return (
        <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                <Stagger in>
                    <Fade in>
                        {cmnts}
                    </Fade>
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
}


const DishDetail = (props) => {
    const dish = props.dish

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if (dish == null) {
        return (<div></div>);
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        { props.dish.name }
                    </BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                    <h3> {props.dish.menu}</h3>
                    <hr />
                </div>
            </div>

            <div className='row'>
                <RenderDish dish={ props.dish } />
                <RenderComments comments={ props.comments }
                    postComment={props.postComment}
                    dishId={props.dish.id} />
            </div>


        </div>
    )
}



export default DishDetail; 

/*
------------------------------BEFORE FEEDBACK FORM-------------------------------
import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}){
    if (dish != null){
        return(
            <div className="col-12 col-md-5 m-1"> 
                <Card >
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name} </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            </div>    
        );
    }else{
        return (<div></div>);
    }
}

function RenderComments({comments}){
    if (comments != null){
        return(
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <div className="container">
                <ul className="list-unstyled">
                        {
                            comments.map((comment)=>{
                                return(
                                    <li className="row" key={comment.id}><p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>    
                                );
                            })
                        }
                </ul>  
                </div>      
            </div>
        );
    }else{
        return (<div></div>);
    }
}

const DishDetail = (props) => { 
    console.log("DishDetail Component render invoked")
    if(props.dish == null){
        return(
            <div></div>
        );
    }else{
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
    }
};

export default DishDetail;

*/