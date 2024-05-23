import { Button, Placeholder, Table } from "react-bootstrap"
import EditableField from "./EditableField"
// import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align"
import { BiTrash } from "react-icons/bi"


const InvoiceItem = (props) => {

    if (!props.items) {
        return <div>Loading...</div>; 
    }

    let itemTable = props.items.map(item => (<ItemRow onItemizedItemEdit={props.onItemizedItemEdit} item={item} handleDelete={props.onRowDel} key={item.id} currency={props.currency}/>))



    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price/Rate</th>
                        <th className="text-center">Action</th>
                    </tr>

                </thead>
                <tbody>
                    {itemTable}
                </tbody>

            </Table>
            <Button className="fw-bold " style={{width:"100px"}} onClick={props.onRowAdd}>Add Item</Button>
        </>
    )
}

let ItemRow = (props) => {
    let handleDelete = () => {
        props.handleDelete(props.item)
    }
    return (
        <tr>
            <td style={{ width: '100%' }}>
                <EditableField onItemizedItemEdit={props.onItemizedItemEdit} cellData={{
                    type: "text",
                    name: "name",
                    placeholder: "Item Name",
                    value: props.item.name,
                    id: props.item.id
                }}
                />
                <EditableField onItemizedItemEdit={props.onItemizedItemEdit} cellData={{
                    type: "text",
                    name: "description",
                    placeholder: "Item Description",
                    value: props.item.description,
                    id: props.item.id
                }}
                />
            </td>
            <td style={{ minWidth: '70px' }}>
                <EditableField onItemizedItemEdit={props.onItemizedItemEdit} cellData={{
                    // leading: props.currency,
                    type: "number",
                    name: "quantity",
                    min: 1,
                    step: '1',
                    value: props.item.quantity,
                    id: props.item.id
                }}
                />
            </td>
            <td style={{ minWidth: '130px' }}>
                <EditableField onItemizedItemEdit={props.onItemizedItemEdit} cellData={{
                    leading: props.currency,
                    type: "number",
                    name: "price",
                    min: 1,
                    step: '0.01',
                    textAlign: 'text-end',
                    value: props.item.price,
                    id: props.item.id
                }}
                />
            </td>
            <td className="text-center" style={{ minWidth: 50 }}>
                <BiTrash
                    onClick={handleDelete}
                    style={{ height: '33px', width: '33px', padding: '7.5px' }}
                    className="text-white mt-1 btn btn-danger"

                />
            </td>

        </tr>
    )

}

export default InvoiceItem