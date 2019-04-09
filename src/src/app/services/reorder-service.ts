import { Injectable } from "@angular/core";
import { QGlobalIndex } from "src/app/services/models/question/qGlobalIndex";
import { renderEmbeddedTemplate } from '@angular/core/src/render3/instructions';

@Injectable()
export class ReorderService {
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

    reorderColumns(inputColumns: QGlobalIndex[][], unassigned: QGlobalIndex[], sort: boolean = false) {
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

    shouldDisplay(questionCount: number, order: number, column: number) {
        let result: boolean = false;

        let remainder = questionCount % 3;
        let solidColumnLenght = (questionCount - remainder) / 3;
        let columnOneHasOneExtra = remainder >= 1;
        let columnTwoHasOneExtra = remainder >= 2;
        let columnOneLenght = solidColumnLenght + (columnOneHasOneExtra ? 1 : 0);
        if (column === 1) {
            if (order >= 0 && order < columnOneLenght) {
                result = true;
            } else {
                result = false;
            }
        }
        let columnTwoLenght = solidColumnLenght + (columnTwoHasOneExtra ? 1 : 0);
        if (column === 2) {
            if (order >= columnOneLenght && order < (columnOneLenght + columnTwoLenght)) {
                result = true;
            } else {
                result = false;
            }
        }
        if (column === 3) {
            if (order >= (columnOneLenght + columnTwoLenght)) {
                result = true;
            } else {
                result = false;
            }
        }

        // console.log(questionCount, order, column, result);
        return result;

    }

    reorderSameContainer(array, oldIndex, newIndex) {
        console.log("REORDERER_INPUTS_", { array, oldIndex, newIndex });
        if (newIndex >= array.length) {
            var k = newIndex - array.length + 1;
            while (k--) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        return array;
    };

    generateOrdering(questionCount: number, currInd: number, prevIndex: number, currCol: number, prevCol: number) {
        console.log("QUESTION_COUNT_", questionCount);
        
        let remainder = questionCount % 3;
        let solidColumnLenght = (questionCount - remainder) / 3;
        let columnOneHasOneExtra = remainder >= 1;
        let columnTwoHasOneExtra = remainder >= 2;
        let columnOneLenght = solidColumnLenght + (columnOneHasOneExtra ? 1 : 0);
        let columnTwoLenght = solidColumnLenght + (columnTwoHasOneExtra ? 1 : 0);

        let prevOrder: number;
        let currOrder: number;

        switch (prevCol) {
            case 1:
                prevOrder = prevIndex;
                break;
            case 2:
                prevOrder = columnOneLenght + prevIndex;
                break;
            case 3:
                prevOrder = columnOneLenght + columnTwoLenght + prevIndex;
                break;
        }

        switch (currCol) {
            case 1:
                currOrder = currInd;
                break;
            case 2:
                currOrder = columnOneLenght + currInd;
                break;
            case 3:
                currOrder = columnOneLenght + columnTwoLenght + currInd;
                break;
        }

        if (currCol > prevCol) {
            currOrder--;
        }

        let initialOrders = [];
        for (let i = 0; i < questionCount; i++) {
            initialOrders.push(i);
        }

        let newOrders = this.reorderSameContainer(initialOrders.slice(0), prevOrder, currOrder);

        return newOrders;
    }
}