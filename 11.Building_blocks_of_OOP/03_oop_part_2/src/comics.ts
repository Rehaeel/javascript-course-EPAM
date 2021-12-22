import { Item } from './item';
import { Pages } from './pages';
import PagesIterable from './PagesIterable_mixin';

export class Comics extends PagesIterable(Item) {
    constructor(title: string, author: string, artist: string, pages: Pages) {
        super();
        this._title = title;
        this._author = author;
        this._artist = artist;
        this._pages = pages;
    }

    toString(): string {
        return `Comics: ${this._title} by ${this._author}, the artist is ${this.artist}, number of pages: ${this._pages.length}`;
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

    set artist(artist) {
        this._artist = artist;
    }
    get artist(): string {
        return this._artist;
    }
}
