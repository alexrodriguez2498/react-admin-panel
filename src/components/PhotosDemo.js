import React, { useState, useEffect, useRef } from 'react'
import { DataView } from 'primereact/dataview';
import { Button } from "primereact/button"
import { SplitButton } from 'primereact/splitbutton'
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card'
import ProductService from '../service/ProductService' 

export const PhotosDemo = () => {
    const [ dataViewValue, setDataViewValue ] = useState(null)
    const [ layout, setLayout ] = useState('grid')
    const  toast = useRef()

    useEffect(() => {
        const planService = new ProductService();
        planService.getProducts().then((data) => setDataViewValue(data));
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

    const cardHeader = (data) => {
        return(
            <img src="https://random.imagecdn.app/150/150" alt={data.name} />
        )
    }

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
                {/* <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} /> */}
            </div>
        </div>
    );

    
    const dataViewGridItem = (data) => {
        return (
            <div className="p-grid p-d-flex p-flex-wrap">
                    <Card style={{minWidth: '150px', margin:"32px", padding:"10px", minHeight: '150px'}} header={cardHeader(data)} />
                </div>
        )
    }
    
    const dataViewListItem = (data) => {
        return (
            <div className="p-col-12">
                 {data.name}
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
                        <DataView value={dataViewValue} layout={"grid"} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
                </div>
            </div>
        </>
    )
}
