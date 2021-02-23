import React, { useRef, useEffect, useState } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from "primereact/button"
import { SplitButton } from 'primereact/splitbutton'
import { Toast } from 'primereact/toast';
import ProductService from '../service/ProductService' 


export const InputDemo = () => {
    const [ dataViewValue, setDataViewValue ] = useState(null)
    const [ layout, setLayout ] = useState('grid')
    const  toast = useRef()

    useEffect(() => {
        const productService = new ProductService();
        productService.getPlans().then((data) => setDataViewValue(data));
    }, [])

    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: (e) => {
                toast.current.show({severity:'success', summary:'Updated', detail:'Data Updated'});
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: (e) => {
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command:(e) => {
                window.location.href = 'https://facebook.github.io/react/'
            }
        },
        {   label: 'Upload',
            icon: 'pi pi-upload',
            disabled: true
        }
    ]

    const dataViewHeader = (
        <div className="p-grid p-nogutter">
            <div className="p-col-12 p-md-6" style={{ textAlign: 'left' }}>
                <Button label="New task" icon="pi pi-plus" className="p-button-text p-mr-2" />
                <Button label="Important Tasks" icon="pi pi-plus" className="p-button-text p-button-plain p-mr-2" />
                <Button label="Generate Reports" icon="pi pi-print" className="p-button-text p-button-plain p-mr-2" />
                <SplitButton label="Actions" model={items} className="p-button-warning"></SplitButton>
            </div>
            <div className="p-col-12 p-md-6 p-d-flex p-jc-end p-ai-center"   style={{ textAlign: 'right' }}>
                <Button label="Sort Tasks" icon="pi pi-sort-alpha-down" className="p-button-plain  p-button-text p-mr-2" />
                <Button label="Filter Tasks" icon="pi pi-filter" className="p-button-plain  p-button-text p-mr-2" />
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );

    const dataViewListItem = (/*data*/) => {
        return (
            <div className="p-col-12">
                {/* <Panel header={data.name} toggleable>
                    {
                        data.entries.map(entry => (
                            <Panel key={entry.id}>
                                <p>{entry.title} <span>- {entry.subtitle}</span></p>
                            </Panel>
                        ))
                    }
                </Panel> */}
                view 1
            </div>
        )
    } 

    const dataViewGridItem = (data) => {
        return (
            <div className="p-col-12">
                view 2
                    {/* <div className="p-d-flex p-ai-center">
                        <i className="pi pi-folder p-mr-2"></i>
                        <h6>{data.name}</h6>
                    </div>
                    <div className="p-d-flex p-ai-center p-jc-start p-flex-wrap">
                        {
                            data.entries.map(entry => (
                                <PlanDemo header={entry.img} title={entry.title} subtitle={entry.subtitle} />
                            ))
                        }
                    </div> */}
            </div>
        )
    }

    const list = () => {
        return (
            <div>
                this is the list 
            </div>
        )
    }

    const card = () => {
        return (
            <div>
                this is a card
            </div>
        )
    }

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataViewListItem(data);
        }
        else if (layout === 'grid') {
            return dataViewGridItem(data);
        }
    };


    return (
        <>
        <Toast ref={toast}></Toast>
            <div className="p-grid">
                <div className="p-col-12">
                        <DataView value={dataViewValue} layout={layout} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
                </div>
            </div>
        </>
    )
}
