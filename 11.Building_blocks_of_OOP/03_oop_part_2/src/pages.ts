import { Book } from './book';
import { Comics } from './comics';
import { Magazine } from './magazine';
import { Page } from './page';

interface PageToStringObj {
    page: Page;
    toString(): string;
}

export class Pages {
    pageArray: Array<Page>;
    length: number;
    constructor(pageArray: Array<Page>) {
        this.pageArray = pageArray;
        this.length = this.pageArray.length;
    }

    currPageToString(coveringType: Book | Magazine | Comics, iteration: number): PageToStringObj {
        const currPage = this.pageArray[iteration];

        return {
            page: currPage,
            toString(): string {
                return `${coveringType.toString()}, ${currPage}`;
            },
        };
    }
}
