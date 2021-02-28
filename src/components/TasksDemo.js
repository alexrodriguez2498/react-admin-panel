// import React, { useRef, useEffect, useState } from 'react';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Button } from "primereact/button"
// import { SplitButton } from 'primereact/splitbutton'
// import { Toast } from 'primereact/toast';
// import TaskService from '../service/TaskService' 


// export const TasksDemo = () => {
//     const [ dataViewValue, setDataViewValue ] = useState(null)
//     const [ layout, setLayout ] = useState('grid')
//     // const [ data, SetData ] = useState([])
//     const  toast = useRef()

//     useEffect(() => {
//         const taskService = new TaskService();
//         taskService.getTasks().then(({data}) => setDataViewValue(data));
//     }, [])

//     const items = [
//         {
//             label: 'Update',
//             icon: 'pi pi-refresh',
//             command: (e) => {
//                 toast.current.show({severity:'success', summary:'Updated', detail:'Data Updated'});
//             }
//         },
//         {
//             label: 'Delete',
//             icon: 'pi pi-times',
//             command: (e) => {
//                 toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
//             }
//         },
//         {
//             label: 'React Website',
//             icon: 'pi pi-external-link',
//             command:(e) => {
//                 window.location.href = 'https://facebook.github.io/react/'
//             }
//         },
//         {   label: 'Upload',
//             icon: 'pi pi-upload',
//             disabled: true
//         }
//     ]

//     const dataViewHeader = (
//         <div className="p-grid p-nogutter">
//             <div className="p-col-12 p-md-6" style={{ textAlign: 'left' }}>
//                 <Button label="New task" icon="pi pi-plus" className="p-button-text p-mr-2" />
//                 <Button label="Important Tasks" icon="pi pi-plus" className="p-button-text p-button-plain p-mr-2" />
//                 <Button label="Generate Reports" icon="pi pi-print" className="p-button-text p-button-plain p-mr-2" />
//                 <SplitButton label="Actions" model={items} className="p-button-warning"></SplitButton>
//             </div>
//             <div className="p-col-12 p-md-6 p-d-flex p-jc-end p-ai-center"   style={{ textAlign: 'right' }}>
//                 <Button label="Sort Tasks" icon="pi pi-sort-alpha-down" className="p-button-plain  p-button-text p-mr-2" />
//                 <Button label="Filter Tasks" icon="pi pi-filter" className="p-button-plain  p-button-text p-mr-2" />
//                 <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//             </div>
//         </div>
//     );

//     const dataViewListItem = () => {
//         return (
//             <div>
//                 list
//             </div>
//         )
//     } 

//     const dataViewGridItem = () => {
//         return (
//             <div>
//                 Grid
//         </div>
//         )
//     }
    
//     const Example  = (data) => {
//     return (
//             <div>
//                 {
//                     data.map(item => (
//                         <div key={item.id}>
//                             {item.title}
//                             {
//                                 item.cards.map(card => (
//                                     <p key={card.id ``}>
//                                         {card.text}
//                                     </p>
//                                 ))
//                             }
//                         </div>
//                     ))
//                 }
//             </div>
//         )
//     } 

//     const itemTemplate = (data, layout) => {
//         if (!data) {
//             return;
//         }

//         if (layout === 'list') {
//             return dataViewListItem(data);
//         }
//         else if (layout === 'grid') {
//             return dataViewGridItem(data);
//         }
//     };


//     return (
//         <>
//         <Toast ref={toast}></Toast>
//             <div className="p-grid">
//                 <div className="p-col-12">
//                         <DataView value={dataViewValue} layout={layout} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
//                 </div>
//             </div>
//         </>
//     )
// }


import React, { useState, useEffect } from 'react'
import TaskService from '../service/TaskService'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'

const CardContainerWrapper = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`
const Title = styled.h3`
    padding: 8px;
`
const TaskList = styled.div`
    padding: 8px;
`

const CardWrapper = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
`


export const TasksDemo = () => {
    const [exampleData, setExampleData] = useState([])

    const dragEnd = result => {
        console.log("draggind and dropping")
    }

    useEffect(() => {
        const service = new TaskService()
        service.getTasks().then(data => setExampleData(data))
    },[])

    const CardContainer = ({ title, children, id}) => {
        return (
            <CardContainerWrapper>
                <Title>{title}</Title>
                <Droppable droppableId={id}>
                    {
                        (provided) => (
                            <TaskList {...provided.droppableProps} innerRef={provided.innerRef}>
                                {children}
                                {provided.placeholder}
                            </TaskList>
                        )
                    }
                </Droppable>
            </CardContainerWrapper>
        )
    }

    const Card = ({ children, id, index }) => {
        return (
            <Draggable draggableId={id} index={index}>
                {
                    (provided) => (
                        <CardWrapper {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>
                            {children}
                        </CardWrapper>
                    )
                }
            </Draggable>
        )
    } 

    

    return (
        <DragDropContext  onDragEnd={dragEnd}>
            {
                exampleData.map(data => (
                    <CardContainer key={data.id} id={data.id} title={data.title}>
                        {
                            data.cards.map((card, index) => (
                                <Card key={card.id} id={card.id} index={index}>
                                    {card.text}
                                </Card>
                            ))
                        }
                    </CardContainer>
                ))
            }
        </DragDropContext>
    )
}
