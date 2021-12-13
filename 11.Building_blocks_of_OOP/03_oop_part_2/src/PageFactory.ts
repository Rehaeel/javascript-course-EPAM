import { Page } from './page';

enum PackageForm {
    book = 'book',
    comics = 'comics',
    magazine = 'magazine',
}

export class PageFacotry {
    build(numberOfPages: number, packageForm: 'book' | 'comics' | 'magazine'): Array<Page> {
        const pageArray: Array<Page> = [];

        for (let i = 0; i < numberOfPages; i++) {
            if (packageForm === PackageForm.book) {
                pageArray.push(new Page(i + 1, 'with text', 'simple paper'));
            } else if (packageForm === PackageForm.comics) {
                pageArray.push(new Page(i + 1, 'with images', 'glossy paper'));
            } else if (packageForm === PackageForm.magazine) {
                pageArray.push(new Page(i + 1, 'with article', 'glossy paper'));
            }
        }
        return pageArray;
    }
}
