import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Form, Card, Col, Button, InputGroup } from "react-bootstrap"
import InvoiceItem from "./InvoiceItem";
import InvoiceModel from "./InvoiceModel";

const InvoiceForm = () => {
    let [state, setState] = useState({
        isOpen: false,
        currency: "₹",
        currentDate: "",
        invoiceno: 1,
        billTo: "",
        billToAddress: "",
        billToEmail: "",
        billFrom: "Dmart",
        billFromEmail: "dmartgroups12@gmail.com",
        billFromAddress: "TamilNadu,India",
        notes: "",
        subTotal: "0.00",
        taxRate: 0,
        taxAmount: "0.00",
        discountRate: 0,
        discountAmount: "0.00"
    })

    let [total, setTotal] = useState(0.00);
    let [items, setItems] = useState([{
        id: "0",
        name: "",
        description: "",
        price: 1.0,
        quantity: 1,
    }])

    let handleInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    let onItemizedItemEdit = (e) => {
        let individualItem = {
            id: e.target.id,
            name: e.target.name,
            value: e.target.value
        }
        let newItems = items.map((item) => {
            for (let key in item) {
                if (key === individualItem.name && item.id === individualItem.id) {
                    item[key] = individualItem.value
                }
            }
            return item
        })
        setItems(newItems)

    }

    let handleAddEvent = (e) => {
        let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let item = {
            id,
            name: "",
            price: 1.0,
            description: "",
            quantity: 1,
        };
        setItems((items) => [...items, item])
    }

    let handleDelEvent = (item) => {
        if (items.length > 1) {
            setItems((items) => items.filter((data) => data.id != item.id))

        } else {
            setItems([{
                id: "0",
                name: "",
                description: "",
                price: 1.0,
                quantity: 1,
            }])
        }

    }

    let onCurrencyChange = (selectedOption) => {
        setState(state => ({ ...state, selectedOption }))
    }

    let handleTaxRateChange = (e) => {
        setState({ ...state, taxRate: e.target.value });
    };

    let handleDiscountRateChange = (e) => {
        setState({ ...state, discountRate: e.target.value });
    };

    let handleSubmit = (e) => {
        e.preventDefault();
        setState((state) => ({ ...state, isOpen: true }))
    }
    
    let handleCalculateTotal = (items) => {
        let subTotal = 0;
         items.map((item) =>{
             subTotal+=parseFloat(item.price).toFixed(2)*parseInt(item.quantity);
               
             })[0];
        let discountAmount=parseFloat(parseFloat(subTotal)*parseFloat(state.discountRate/100)).toFixed(2);
        let taxAmount=parseFloat(parseFloat(subTotal)*parseFloat(state.taxRate/100)).toFixed(2);

        let total=parseFloat(subTotal)+parseFloat(taxAmount)-parseFloat(discountAmount)

        setTotal(total)

        setState(state=>({
            ...state,
            subTotal,
            taxAmount,
            discountAmount
        }))
    }

    useEffect(() => {
        handleCalculateTotal(items)
    }, [items, state.taxRate, state.discountRate])
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={8} lg={9}>
                        <Card className="d-flex  p-4 p-xl-5 my-3 my-xl-4">
                            <div className="d-flex flex-row justify-content-between">
                                <div className="d-flex flex-row  mb-3">
                                    <div className="mb-2">
                                        <span className="fw-bold">Current&nbsp;Date &nbsp;</span>
                                        <span className="current-date">
                                            {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row  mb-3">
                                    <div className="mb-2">
                                        <span className="fw-bold">Invoice&nbsp;Number&nbsp;</span>
                                        <span className="current-date">{state.invoiceno}</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <Row className="mb-5">
                                <Col>
                                    <Form.Label className="fw-bold">Customer Name:</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Name"
                                        value={state.billTo}
                                        type="text"
                                        name="billTo"
                                        className="my-2"
                                        autoComplete="name"
                                        required={true}
                                        onChange={handleInput}
                                    />
                                    <Form.Label className="fw-bold">Customer Email:</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Email"
                                        value={state.billToEmail}
                                        type="text"
                                        name="billToEmail"
                                        className="my-2"
                                        autoComplete="email"

                                        onChange={handleInput}
                                    />
                                    <Form.Label className="fw-bold">Customer Address:</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Address"
                                        value={state.billToAddress}
                                        type="text"
                                        name="billToAddress"
                                        className="my-2"
                                        onChange={handleInput}
                                        required={true}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className="fw-bold">Bill From:</Form.Label>
                                    <Form.Control className="my-2" value={state.billFrom} disabled={true} />
                                    <Form.Control className="my-2" value={state.billFromEmail} disabled={true} />
                                    <Form.Control className="my-2" value={state.billFromAddress} disabled={true} />
                                </Col>
                            </Row>
                            <InvoiceItem items={items} onItemizedItemEdit={onItemizedItemEdit} onRowAdd={handleAddEvent} onRowDel={handleDelEvent} currency={state.currency} />
                            <Row className="mt-4 justify-content-end">
                                <Col lg={6}>
                                    <div className="d-flex flex-row align-items-start justify-content-between">
                                        <span className="fw-bold">SubTotal:</span>
                                        <span>{state.currency}{state.subTotal}</span>
                                    </div>
                                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                        <span className="fw-bold">Discount:</span>
                                        <span>{state.discountRate}%--{state.currency}{state.discountAmount}</span>
                                    </div>
                                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                        <span className="fw-bold">Tax:</span>
                                        <span>{state.taxRate}%--{state.currency}{state.taxAmount}</span>
                                    </div>
                                    <div className="d-flex flex-row align-items-start justify-content-between mt-2" style={{fontSize:"1.125rem"}}>
                                        <span className="fw-bold">Total:</span>
                                        <span>{state.currency}{total}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col md={4} lg={3}>
                        <div className="sticky-top pt-md-3 pt-xl-4">
                            <Button variant="primary" type="submit" className="d-block w-100 mb-3" onClick={() => setState(state({ ...state, isOpen: true }))}>
                                Revivew Invoice
                            </Button>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Currency:</Form.Label>
                                <Form.Select onChange={(e) => onCurrencyChange({ currency: e.target.value })} className="btn btn-light my-1">
                                    <option value="₹">INR</option>
                                    {/* <option value="$">USD</option> */}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="my-3 ">
                                <Form.Label className="fw-bold">Tax Rate:</Form.Label>
                                <InputGroup className="my-1 flex-nowrap">
                                    <Form.Control
                                        name="taxRate"
                                        type="number"
                                        value={state.taxRate}
                                        onChange={handleTaxRateChange}
                                        className="bg-white-border"
                                        placeholder="0.00"
                                        min="0.00"
                                        step="0.01"
                                        max="100.00"
                                    />
                                    <InputGroup.Text className="bg-light fw-boldtext-secondary small">%</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="my-3 ">
                                <Form.Label className="fw-bold">Discount Rate:</Form.Label>
                                <InputGroup className="my-1 flex-nowrap">
                                    <Form.Control
                                        name="discountRate"
                                        type="number"
                                        value={state.discountRate}
                                        onChange={handleDiscountRateChange}
                                        className="bg-white-border"
                                        placeholder="0.00"
                                        min="0.00"
                                        step="0.01"
                                        max="100.00"
                                    />
                                    <InputGroup.Text className="bg-light fw-boldtext-secondary small">%</InputGroup.Text>

                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
                <InvoiceModel
                    showModal={state.isOpen}
                    closeModal={() => setState(state => (
                        { ...state, isOpen: false }))
                    }
                    info={state}
                    items={items}
                    total={total}
                />
            </Form>
        </>
    )

}

export default InvoiceForm;