import { Item } from './item';
import { Pages } from './pages';
import PagesIterable from './PagesIterable_mixin';

export class Book extends PagesIterable(Item) {
    constructor(title: string, author: string, pages: Pages) {
        super();
        this._pages = pages;
        this._title = title;
        this._author = author;
    }

    toString(): string {
        return `Book: ${this._title} by ${this._author} with number of pages: ${this._pages.length}`;
    }

    set title(title: string) {
        this._title = title;
    }
    get title(): string {
        return this._title;
    }

    set author(author: string) {
        this._author = author;
    }
    get author(): string {
        return this._author;
    }
}
