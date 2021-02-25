import React, { useRef, useEffect, useState } from 'react';
import { PlanDemo } from './PlanDemo'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from "primereact/button"
import { SplitButton } from 'primereact/splitbutton'
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import PlanService from '../service/PlanService' 


export const PlansDemo = () => {
    const [ dataViewValue, setDataViewValue ] = useState(null)
    const [ layout, setLayout ] = useState('grid')
    const  toast = useRef()

    useEffect(() => {
        const planService = new PlanService();
        planService.getPlans().then((data) => setDataViewValue(data));
    }, [])

    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getProducts().then(data => setDataViewValue(data));
    // }, []);

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
                <Button label="New Plan" icon="pi pi-plus" className="p-button-text p-mr-2" />
                <Button label="New Folder" icon="pi pi-plus" className="p-button-text p-button-plain p-mr-2" />
                <SplitButton label="Actions" model={items} className="p-button-warning"></SplitButton>
            </div>
            <div className="p-col-12 p-md-6 p-d-flex p-jc-end p-ai-center"   style={{ textAlign: 'right' }}>
                <Button label="Filter Plans" icon="pi pi-filter" className="p-button-plain  p-button-text p-mr-2" />
                <Button label="Version Control" className="p-button-plain p-button-text p-mr-2" />
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );

    const dataViewListItem = (data) => {
        return (
            <div className="p-col-12">
                <Panel header={data.name} toggleable>
                    {
                        data.entries.map(entry => (
                            <Panel key={entry.id}>
                                {/* <PlanDemo header={entry.img} title={entry.title} subtitle={entry.subtitle} key={entry.id} /> */}
                                <p>{entry.title} <span>- {entry.subtitle}</span></p>
                            </Panel>
                        ))
                    }
                </Panel>
            </div>
        )
    } 

    const dataViewGridItem = (data) => {
        return (
            <div className="p-col-12">
                    <div className="p-d-flex p-ai-center">
                        <i className="pi pi-folder p-mr-2"></i>
                        <h6>{data.name}</h6>
                    </div>
                    <div className="p-d-flex p-ai-center p-jc-start p-flex-wrap">
                        {
                            data.entries.map(entry => (
                                <PlanDemo key={entry.id}  header={entry.img} title={entry.title} subtitle={entry.subtitle} />
                            ))
                        }
                    </div>
                </div>
                            // <>
                            // {
                            //     data.map(dataItem => (
                            //         <div className="p-col-12">
                            //         <div className="p-d-flex p-ai-center">
                            //             <i className="pi pi-folder p-mr-2"></i>
                            //             <h6>{dataItem.name}</h6>
                            //         </div>
                            //         <div className="p-d-flex p-ai-center p-jc-start p-flex-wrap">
                            //             {
                            //                 dataItem.entries.map(entry => (
                            //                     <PlanDemo header={entry.img} title={entry.title} subtitle={entry.subtitle} />
                            //                 ))
                            //             }
                            //         </div>
                            //     </div>
                            //     ))
                            // }
                            // </>
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
