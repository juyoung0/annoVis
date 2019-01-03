export default class Data{
	constructor (inputData = []) {
        this.data = inputData;        
    }

    getData (){
        return this.data;
    }

    setData (inputData) {
        return this.data = inputData;
    }
}