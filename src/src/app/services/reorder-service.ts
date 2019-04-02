import { Injectable } from "@angular/core";
import { QGlobalIndex } from "src/app/services/models/question/qGlobalIndex";

@Injectable()
export class ReorderService{
    reorderTwoContainers(
        oldArray: any[],
        newArray: any[],
        oldIndex: number,
        newIndex: number) {
        let element = oldArray[oldIndex];
        oldArray = [...oldArray.slice(0, oldIndex), ...oldArray.slice(oldIndex + 1)];
        newArray = [...newArray.slice(0, newIndex), element, ...newArray.slice(newIndex)];
        return { old: oldArray, new: newArray };
    };
 
    reorderSameContainer(array, oldIndex, newIndex) {
        if (newIndex >= array.length) {
            var k = newIndex - array.length + 1;
            while (k--) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        return array; // for testing
    };

    reorderColumns(inputColumns: QGlobalIndex[][], unassigned: QGlobalIndex[], sort:boolean = false) {
        let col1 = inputColumns[0];
        let col2 = inputColumns[1];
        let col3 = inputColumns[2];

        if (sort) {
            col1 = col1.sort((a, b) => a.order - b.order);
            col2 = col2.sort((a, b) => a.order - b.order);
            col3 = col3.sort((a, b) => a.order - b.order);
        }

        let all = [...col1, ...col2, ...col3, ...unassigned];
        col1 = col2 = col3 = [];
        let allLenght = all.length;
        let remainder = allLenght % 3;
        let solidColumnLenght = (allLenght - remainder) / 3;
        let columnOneHasOneExtra = remainder >= 1;
        let columnTwoHasOneExtra = remainder >= 2;
        let columnOneLenght = solidColumnLenght + (columnOneHasOneExtra ? 1 : 0);
        col1 = all.slice(0, columnOneLenght);
        let columnThoLenght = solidColumnLenght + (columnTwoHasOneExtra ? 1 : 0);
        col2 = all.slice(columnOneLenght, columnOneLenght + columnThoLenght);
        col3 = all.slice(columnOneLenght + columnThoLenght);
        let columns = [col1, col2, col3];
        return columns;
    }
}

// reorderColumns2<T>(col1: T[],col2: T[],col3: T[], unassigned: T[]) {
//     let all = [...col1, ...col2, ...col3, ...unassigned];
//     col1 = col2 = col3 = [];
//     let allLenght = all.length;
//     let remainder = allLenght % 3;
//     let solidColumnLenght = (allLenght - remainder) / 3;
//     let columnOneHasOneExtra = remainder >= 1;
//     let columnTwoHasOneExtra = remainder >= 2;
//     let columnOneLenght = solidColumnLenght + (columnOneHasOneExtra ? 1 : 0);
//     col1 = all.slice(0, columnOneLenght);
//     let columnThoLenght = solidColumnLenght + (columnTwoHasOneExtra ? 1 : 0);
//     col2 = all.slice(columnOneLenght, columnOneLenght + columnThoLenght);
//     col3 = all.slice(columnOneLenght + columnThoLenght);
//     let columns = [col1, col2, col3];
//     return columns;
// }