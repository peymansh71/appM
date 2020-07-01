import React from 'react';
import $ from 'jquery';


/**
 * Find items by ids related to mapping config 
 * 
 * @param {Array} list 
 * @param {Array} ids 
 * @param {Object} mapping 
 */
export function findItemsByIds(arr, ids, mapping){
      if (ids === undefined || ids === null) return [];


    return arr.filter (o => ids.indexOf(Number(o[mapping.value])) !== -1)
}

/**
 * Find item by id related to mapping config 
 * 
 * @param {Array} list 
 * @param {Any} id 
 * @param {Object} mapping 
 */
export function findItemById (list, id, mapping) {
     if (id === undefined || id === null) return null;

    
    const result = list.filter(o => {
        return String(o[mapping.value]) === String(id)
    });
    
    return result.length ? result[0] : null
}

/**
 * Get position of clicked element
 * @param {Dom Object} elementDom
 */
export function getClickedPosition (elementDom) {

}



/**
 * Handle element position when advance from page area
 * @param {Dom Object} elementDom
 */
export function handlePosition (elementDom) {
    
        if (!elementDom) return ;

        let boxDom = elementDom;
        
        //reset befor any calculate
        $(boxDom).css('top','100%')

        //let pageWidth = window.innerWidth + window.pageXOffset;
        let pageHeight = window.innerHeight ;
        //let itemWidth =  $(boxDom).width();
        let itemHeight =  $(boxDom).height();
        //let itemLeft =  $(boxDom).offset().left ;
        //let itemRight = itemLeft + itemWidth;
        let itemTop =  $(boxDom).offset().top - window.pageYOffset;
        let itemBottom = itemTop + itemHeight;
        
        // if (itemLeft < 0) {
        //     $(boxDom).css('left', 0)
        // }
        // else if (itemRight > pageWidth) {
        //     $(boxDom).css('right', 0)
        // }
    
        if (itemTop < 0) {
            $(boxDom).css('top', '100%')
        }
        else if (itemBottom > pageHeight && itemHeight < (pageHeight - (pageHeight - itemTop))) {
            $(boxDom).css('top',`-${itemHeight}px`)
        }

    

}

/**
 * Convert object to class name
 * 
 * @param {Object} obj 
 * @returns {String}
 * sample : {
 *  rtl : true,
 *  disbaled : false
 * }
 */
export function mapObjectToClassName (obj){
    let str = '';

    for (var prop in obj) {
        if (obj[prop]) {
            str += ` ${prop}`
        }
    }

    return str
}

export function createUID (){
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export function createIcon (icon){
    if(icon === null) return ;
    if (icon.type === 'svg'){
        return icon;
    }
    else {
        return <span className={icon}></span>
    }
}

export function getValueByProp(arr, field) {
    if(!arr) return '';

    let obj =!Array.isArray(arr) || arr.length === 0 ? arr: arr[0] ;
    if (Array.isArray(field)) { field = field[obj.level]; }
    field = field.split('.');
    var value = obj[field[0]];
    for (var i = 1; i < field.length; i++) {
      if (!value) { return '' }
      value = value[field[i]];
    }
    return value;
}


export function getValueById (arr, id, mappingName){
    return arr.filter(item => String(item[mappingName]) === String(id))[0]
}
