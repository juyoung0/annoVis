export default class Column{
	constructor (nameToShow, nameInTable, selected = false, filter = false, sortable = false) {
        this.nameToShow = nameToShow;      
        this.nameInTable = nameInTable;        
        this.selected = selected;
        this.filter = filter;
        this.sortable = sortable;
        this.columnItems = []
    }

    isSelected (){
    	return this.selected;
    }

    setSelected (value){
    	this.selected = value;
    }

    getNameToShow (){
    	return this.nameToShow;
    }

    hasFilter (){
    	return this.filter;
    }

    getNameInTable (){
    	return this.nameInTable;
    }

    getColumnItems (){
        return this.columnItems;
    }

    sortItems () {
        this.columnItems.sort(this.compare);   
    }

    compare (a,b) {
      if (a.itemName < b.itemName)
        return -1;
      if (a.itemName > b.itemName)
        return 1;
      return 0;
    }

    insertColumnItem (item, checked = true){

        //check, if the item is already inserted
        for (const columnItem of this.columnItems){
            if (columnItem.itemName === item) return;
        }

        //if it is not, then insert it
        this.columnItems.push({'itemName': item, 'checked': checked});
    }

    clearColumnItems (){
        this.columnItems = [];
    }

    isItemChecked (name) {
        
        for (const item of this.columnItems){
            if (item.itemName === name)
            {
                return item.checked;
            }
        }

        return false;
    }

    setAllItemsChecked(){
        this.columnItems.forEach(item => item.checked = true);
    }

    isFilterApplied(){
        for (const item of this.columnItems){
            if (item.checked === false)
            {
                return true;
            }
        }

        return false;
    }
}