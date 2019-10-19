

/**Completes with default values the missing configuration attributes provided by the user.*/
export const getConfig = (customConfig) => { 
    let fieldsT =    getFieldTypes(customConfig.fieldTypes, customConfig.fields)
    let defaultConfigProps = {                  
            fieldsToDisplay: [],
            fieldsToHide: [],
            fieldsToDisplayNames:getDisplayNames(customConfig, fieldsT),       
            labelsConfig:{
                caseType: 'capital'
            },
            fieldsTypes:fieldsT,
            tableConfig:{
                className: 'table table-striped table-bordered',
                deleteActionClassName: 'btn btn-danger',
                editActionClassName: "btn btn-warning",
                viewActionClassName: 'btn btn-info',
                deleteActionCallBack: null,
                editActionCallBack: null,
                viewActionCallBack: null,            
            },
            labels:{
                listView:{
                    searchBoxPlaceholder: "Search {entity}",
                    showRowsPerPages: "Show {select} {entity} per page",
                    showingRows: "Showing from {start} to {end} of {rows} {entity} (Page {page} of {pages})",
                    noRows: "No {entity} found",
                    actionsHeader: "Actions",
                    deleteAction:"delete",
                    editAction:"edit",
                    viewAction:"view",
                    deleteConfirmMessage:'Are you sure?'
                },
                editView:{
                    saveButton:'save',
                    backButton:'back',
                }
            },
            actions:['edit', 'view', 'delete', 'create'],
            actionsCallbacks:{
                edit:null,
                delete:null,
                create:null
            }
        }
    

    return {
        ...defaultConfigProps, 
        ...customConfig,
        labels: {
            ...defaultConfigProps.labels,
            ...customConfig.labels,
            listView:{
            ...defaultConfigProps.labels.listView,                
            ...customConfig.labels.listView
            }
        }
    }

}
let getFieldTypes = (fieldTypes, fields) => {
    return fields.map(e=>{
        if(fieldTypes && fieldTypes.length > 0){
            for(let f in fieldTypes){
                if(f.fieldName === e)
                    return {...f}                 
            }
        }
        return {
            fieldName:e,
            fieldDisplayName:e,
            type:null
        }
    })
}

let getDisplayNames = (config, fieldsTypes) => {
    let headerNames = []               
    if(config.fieldsToDisplay && config.fieldsToDisplay.length > 0)
        headerNames = config.fieldsToDisplay
    else if(config.fieldsToHide && config.fieldsToHide.length > 0){
        headerNames = config.fields.filter(e=> !config.fieldsToHide.includes(e) )
     } else {
        headerNames = config.fields
    }                                
    return fieldsTypes.filter(f=> headerNames.includes(f.fieldDisplayName)).map(e=>e.fieldDisplayName)   
}

/**Completes and auto-generate some data values that will be used througout the screens. */
export const getData = (data) => {
    return Object.assign(data, {
        fields: getFields(data.entities)
    })
}
/**Gets the first level fields names based in the entities data provided. */
let getFields = (entities) => {
    if(entities.length <= 0) return []
    let firstLevel = Object.keys(entities[0])
    return firstLevel
}