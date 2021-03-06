import React, { useState, useEffect, useRef } from 'react'
import TaskService from '../service/TaskService'
import { Toast } from 'primereact/toast';
import { DataView } from 'primereact/dataview'
import { Button } from 'primereact/button'
import { SplitButton } from 'primereact/splitbutton'

export const TasksDemo = () => {
    const [ dataViewValue, setDataViewValue ] = useState()
    const [ display, setDisplay ] = useState('board')
    const  toast = useRef()

    useEffect(() => {
        const service = new TaskService()
        service.getTasks().then(data => setDataViewValue(data))
    },[])

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
                <Button icon="pi pi-table" onClick={() => setDisplay('board')}/>
                <Button icon="pi pi-calendar"  onClick={() => setDisplay('calendar')} />
                <Button icon="pi pi-bars"  onClick={() => setDisplay('bars')} />
                <Button icon="pi pi-chart-line"  onClick={() => setDisplay('chart')} />
                {/* <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} /> */}
            </div>
        </div>
    );

    const BoardView = (data) => {
        return (
            <div>
                <p>board</p>
            </div>
        )
    }
    const CalendarView = (data) => {
        return (
            <div>
                <p>calendar</p>
            </div>
        )
    }
    const BarsView = (data) => {
        return (
            <div>
                <p>bars</p>
            </div>
        )
    }
    const ChartView = (data) => {
        return (
            <div>
                <p>chart</p>
            </div>
        )
    }

    const itemTemplate = (data, display) => {
        if (!data) {
            return;
        }

        if (display === 'board') {
            return BoardView(data);
        }
        else if (display === 'calendar') {
            return CalendarView(data);
        }
        else if (display === 'bars') {
            return BarsView(data);
        }
        else if (display === 'chart') {
            return ChartView(data);
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
