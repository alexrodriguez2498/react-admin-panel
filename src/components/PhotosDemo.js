import React, { useState, useEffect, useRef } from 'react'
import { DataView } from 'primereact/dataview';
import { Button } from "primereact/button"
import { SplitButton } from 'primereact/splitbutton'
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox'
import PhotosService from '../service/PhotosService' 

import '../styles/photos.css'

export const PhotosDemo = () => {
    const [ dataViewValue, setDataViewValue ] = useState(null)
    // const [ layout, setLayout ] = useState('grid')
    const [ checked, setChecked ] = useState(false)
    const  toast = useRef()

    useEffect(() => {
        const photosService = new PhotosService();
        photosService.getPhotos().then((data) => setDataViewValue(data));
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

    // const cardHeader = (data) => {
    //     return(
    //         <img src="https://random.imagecdn.app/150/150" alt={data.name} />
    //     )
    // }

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

    
    const PhotosDemoComponent = (data) => {
        return (
                <div className="container">
                    <img className="image" src={data.src} alt={data.alt}/>
                    <div className="overlay overlayFade">
                        <Checkbox onChange={e => setChecked(e.checked)} checked={checked} className="checkbox"></Checkbox>
                        <i className="pi pi-download icon"></i>
                        <p className="text">10/ 02 / 2021</p>
                    </div>
                </div>
        )
    }
    return (
        <>
        <Toast ref={toast}></Toast>
            <div className="p-grid">
                <div className="p-col-12">
                        <DataView value={dataViewValue} layout={"grid"} itemTemplate={PhotosDemoComponent} header={dataViewHeader}></DataView>
                </div>
            </div>
        </>
    )
}
