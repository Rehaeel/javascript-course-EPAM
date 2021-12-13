import { Item } from './item';
import { Pages } from './pages';
import PagesIterable from './PagesIterable_mixin';

export class Magazine extends PagesIterable(Item) {
    constructor(title: string, pages: Pages) {
        super();
        this._title = title;
        this._pages = pages;
    }

    toString() {
        return `Magazine: ${this._title} with number of pages: ${this._pages.length}`;
    }

    set title(title: string) {
        this._title = title;
    }
    get title(): string {
        return this._title;
    }
}
