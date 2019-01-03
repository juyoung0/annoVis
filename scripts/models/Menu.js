export default class Menu{
	constructor () {
        this.columns = [];        
    }

    insertColumn (column){
    	this.columns.push(column);
    }

    getColumns (){
    	return this.columns;
    }

    getColumn(columName){
    	for (const column of this.columns){
    		if (column.getNameInTable() === columName)
    		{
    			return column;
    		}
    	}    	
    }

    sortAllColumnItems(){
        this.columns.forEach(column => {
            if (column.hasFilter()){
                column.sortItems();
            }
        })
    }
}